import { isScriptedEdit, isDestructive } from './lib/policy.mjs';

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
      console.log(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const payload = JSON.parse(rawInput);
    const commandLine = payload?.toolCall?.args?.CommandLine || '';

    if (isScriptedEdit(commandLine)) {
      console.log(JSON.stringify({
        decision: 'deny',
        reason: 'Scripted file modification detected (sed, perl, redirects, or codemods). Modifying files is strictly restricted to native editor tools (write_to_file, replace_file_content).'
      }));
      return;
    }

    if (isDestructive(commandLine)) {
      console.log(JSON.stringify({
        decision: 'force_ask',
        reason: 'Potentially destructive terminal command or deployment detected. Explicit human authorization required.'
      }));
      return;
    }

    console.log(JSON.stringify({ decision: 'allow' }));
  } catch (err) {
    // Fail closed on error
    console.log(JSON.stringify({
      decision: 'deny',
      reason: `Edit guard failed closed: ${err.message}`
    }));
  }
}

main();
