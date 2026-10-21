import { isScriptedEdit, isDestructive, isSecretPath } from '../../.agents/hooks/lib/policy.mjs';

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
  });
}

async function main() {
  try {
    const rawInput = await readStdin();
    if (!rawInput.trim()) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'allow'
        }
      }));
      process.exit(0);
    }

    const payload = JSON.parse(rawInput);
    const toolName = (payload?.tool_name || '').toLowerCase();
    const toolInput = payload?.tool_input || {};

    // Check terminal / command execution tools
    const command = toolInput.command || toolInput.CommandLine || '';
    if (command) {
      if (isScriptedEdit(command)) {
        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: 'Scripted file modification blocked (sed, perl, redirects, codemods). Modifying files is restricted to native editor tools.'
          }
        }));
        process.exit(2);
      }

      if (isDestructive(command)) {
        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'ask',
            permissionDecisionReason: 'Potentially destructive terminal command or deployment detected. Explicit user approval required.'
          }
        }));
        process.exit(0);
      }
    }

    // Check file access tools
    const targetFile = toolInput.path || toolInput.TargetFile || toolInput.AbsolutePath || toolInput.filePath || '';
    if (targetFile && isSecretPath(targetFile)) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: `Access to secret or environment file blocked: ${targetFile}`
        }
      }));
      process.exit(2);
    }

    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'allow'
      }
    }));
    process.exit(0);
  } catch (err) {
    // Fail closed on error
    console.error(`VS Code guard error: ${err.message}`);
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `VS Code guard failed closed: ${err.message}`
      }
    }));
    process.exit(2);
  }
}

main();
