import { isSecretPath } from './lib/policy.mjs';

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
    const args = payload?.toolCall?.args || {};
    const targetPath = args.TargetFile || args.AbsolutePath || '';

    if (targetPath && isSecretPath(targetPath)) {
      console.log(JSON.stringify({
        decision: 'deny',
        reason: `Access to secret or environment file blocked by policy: ${targetPath}`
      }));
      return;
    }

    console.log(JSON.stringify({ decision: 'allow' }));
  } catch (err) {
    // Fail closed on error
    console.log(JSON.stringify({
      decision: 'deny',
      reason: `Secret guard failed closed: ${err.message}`
    }));
  }
}

main();
