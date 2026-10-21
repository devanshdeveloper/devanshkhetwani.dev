import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

console.log('--- Checking Agent Configuration & Drift ---');

let errors = 0;
let warnings = 0;

function reportError(msg) {
  console.error(`[ERROR] ${msg}`);
  errors++;
}

function reportPass(msg) {
  console.log(`[PASS] ${msg}`);
}

// 1. Verify AGENTS.md exists and is within line limit
const agentsMdPath = path.join(ROOT_DIR, 'AGENTS.md');
if (!fs.existsSync(agentsMdPath)) {
  reportError('Root AGENTS.md is missing');
} else {
  const lines = fs.readFileSync(agentsMdPath, 'utf8').split('\n').length;
  if (lines > 150) {
    reportError(`Root AGENTS.md exceeds 150 lines (currently ${lines} lines)`);
  } else {
    reportPass(`Root AGENTS.md exists (${lines} lines, under target limit)`);
  }
}

// 2. Verify no GEMINI.md or CLAUDE.md exists
['GEMINI.md', 'CLAUDE.md'].forEach(file => {
  if (fs.existsSync(path.join(ROOT_DIR, file))) {
    reportError(`Forbidden file exists: ${file} (overrides or forks AGENTS.md)`);
  } else {
    reportPass(`Forbidden file absent: ${file}`);
  }
});

// 3. Verify .agents/rules/ is strictly flat (no subdirectories)
const rulesDir = path.join(ROOT_DIR, '.agents', 'rules');
if (!fs.existsSync(rulesDir)) {
  reportError('.agents/rules directory is missing');
} else {
  const entries = fs.readdirSync(rulesDir, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory());
  if (subdirs.length > 0) {
    reportError(`.agents/rules contains subdirectories: ${subdirs.map(d => d.name).join(', ')}`);
  } else {
    reportPass('.agents/rules is strictly flat (0 subdirectories)');
  }

  // Check frontmatter trigger on each canonical rule
  entries.filter(e => e.isFile() && e.name.endsWith('.md')).forEach(file => {
    const content = fs.readFileSync(path.join(rulesDir, file.name), 'utf8');
    if (!content.startsWith('---')) {
      reportError(`.agents/rules/${file.name} lacks YAML frontmatter`);
    } else {
      const match = content.match(/trigger:\s*([a-zA-Z0-9_]+)/);
      if (!match) {
        reportError(`.agents/rules/${file.name} missing 'trigger' property in frontmatter`);
      } else {
        const trigger = match[1];
        const validTriggers = ['glob', 'model_decision', 'always_on', 'manual'];
        if (!validTriggers.includes(trigger)) {
          reportError(`.agents/rules/${file.name} has invalid trigger: ${trigger}`);
        } else {
          reportPass(`.agents/rules/${file.name} has valid trigger: ${trigger}`);
        }
      }
    }
  });
}

// 4. Verify .cursor/rules contains only .mdc files
const cursorRulesDir = path.join(ROOT_DIR, '.cursor', 'rules');
if (fs.existsSync(cursorRulesDir)) {
  const cursorEntries = fs.readdirSync(cursorRulesDir, { withFileTypes: true });
  cursorEntries.forEach(entry => {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      reportError(`.cursor/rules contains .md file (ignored by Cursor): ${entry.name}`);
    } else if (entry.isFile() && entry.name.endsWith('.mdc')) {
      reportPass(`.cursor/rules/${entry.name} uses valid .mdc extension`);
    }
  });
}

// 5. Verify Canonical to Adapter mapping
const canonicalRules = [
  { name: 'review-tools-discipline', cursorMdc: true, vsCodeInst: true },
  { name: 'client-review-assets', cursorMdc: true, vsCodeInst: true },
  { name: 'tech-stack-contract', cursorMdc: true, vsCodeInst: true },
  { name: 'safety-discipline', cursorMdc: true, vsCodeInst: true },
];

canonicalRules.forEach(rule => {
  const canonicalPath = path.join(rulesDir, `${rule.name}.md`);
  if (!fs.existsSync(canonicalPath)) {
    reportError(`Canonical rule missing: .agents/rules/${rule.name}.md`);
  }

  if (rule.cursorMdc) {
    const cursorPath = path.join(cursorRulesDir, `${rule.name}.mdc`);
    if (!fs.existsSync(cursorPath)) {
      reportError(`Missing Cursor adapter: .cursor/rules/${rule.name}.mdc`);
    } else {
      reportPass(`Cursor adapter verified for ${rule.name}`);
    }
  }

  if (rule.vsCodeInst) {
    const vsCodePath = path.join(ROOT_DIR, '.github', 'instructions', `${rule.name}.instructions.md`);
    if (!fs.existsSync(vsCodePath)) {
      reportError(`Missing VS Code adapter: .github/instructions/${rule.name}.instructions.md`);
    } else {
      reportPass(`VS Code adapter verified for ${rule.name}`);
    }
  }
});

// 6. Verify Subagents exist across all 4 tools
const subagentPaths = [
  { tool: 'Antigravity', file: '.agents/agents/code-reviewer.md' },
  { tool: 'Cursor', file: '.cursor/agents/code-reviewer.md' },
  { tool: 'Codex', file: '.codex/agents/code-reviewer.toml' },
  { tool: 'VS Code', file: '.github/agents/code-reviewer.agent.md' },
];

subagentPaths.forEach(sa => {
  const fullPath = path.join(ROOT_DIR, sa.file);
  if (!fs.existsSync(fullPath)) {
    reportError(`Subagent for ${sa.tool} missing: ${sa.file}`);
  } else {
    reportPass(`Subagent for ${sa.tool} verified: ${sa.file}`);
  }
});

// 7. Verify JSON and TOML files parse cleanly
const jsonFiles = [
  '.agents/hooks.json',
  '.cursor/hooks.json',
  '.cursor/cli.json',
  '.github/hooks/hooks.json'
];

jsonFiles.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    try {
      JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      reportPass(`Valid JSON: ${relPath}`);
    } catch (e) {
      reportError(`Invalid JSON in ${relPath}: ${e.message}`);
    }
  } else {
    reportError(`Missing JSON file: ${relPath}`);
  }
});

console.log('-------------------------------------------');
if (errors === 0) {
  console.log(`[SUCCESS] Configuration check passed with 0 errors.`);
  process.exit(0);
} else {
  console.error(`[FAILURE] Configuration check failed with ${errors} error(s).`);
  process.exit(1);
}
