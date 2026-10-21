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
      console.log(JSON.stringify({}));
      return;
    }

    const payload = JSON.parse(rawInput);
    const executionNum = payload?.executionNum || 1;

    // Safety brake: Never allow more than 2 re-entries to prevent infinite loops
    if (executionNum > 2) {
      console.log(JSON.stringify({}));
      return;
    }

    // Default verify gate allows clean completion
    console.log(JSON.stringify({}));
  } catch (err) {
    // On stop hook error, do not trap the agent in an infinite loop
    console.log(JSON.stringify({}));
  }
}

main();
