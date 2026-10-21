import { isScriptedEdit, isDestructive } from '../../.agents/hooks/lib/policy.mjs';

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
      console.log(JSON.stringify({ permission: 'allow' }));
      process.exit(0);
    }

    const payload = JSON.parse(rawInput);
    const command = payload?.command || '';

    if (isScriptedEdit(command)) {
      console.log(JSON.stringify({
        permission: 'deny',
        agentMessage: 'Scripted file modification blocked (sed, perl, redirects, codemods). Modifying files is restricted to native editor tools.'
      }));
      process.exit(2);
    }

    if (isDestructive(command)) {
      console.log(JSON.stringify({
        permission: 'ask',
        userMessage: 'Potentially destructive shell command or deployment detected. Explicit user approval required.'
      }));
      process.exit(0);
    }

    console.log(JSON.stringify({ permission: 'allow' }));
    process.exit(0);
  } catch (err) {
    // Fail closed on error
    console.error(`Cursor guard error: ${err.message}`);
    console.log(JSON.stringify({
      permission: 'deny',
      agentMessage: `Cursor guard failed closed: ${err.message}`
    }));
    process.exit(2);
  }
}

main();
