import path from 'path';

/**
 * Checks if a terminal command attempts to script file modifications
 * (violates the non-negotiable editing rule).
 * @param {string} commandLine 
 * @returns {boolean}
 */
export function isScriptedEdit(commandLine) {
  if (!commandLine || typeof commandLine !== 'string') return false;

  const patterns = [
    /\bsed\s+-[^\s]*i/i,
    /\bperl\s+-[^\s]*p?i/i,
    /\bawk\s+.*-i\s+inplace/i,
    /\b(jscodeshift|codemod)\b/i,
    /(>|>>)\s*([a-zA-Z0-9_\-\./\\]+)/,
    /\b(Out-File|Set-Content|Add-Content)\b/i,
    /\|\s*tee\b/i,
    /<<-?\s*['"]?[a-zA-Z0-9_]+/i
  ];

  return patterns.some(pattern => pattern.test(commandLine));
}

/**
 * Checks if a terminal command is destructive and requires human confirmation.
 * @param {string} commandLine 
 * @returns {boolean}
 */
export function isDestructive(commandLine) {
  if (!commandLine || typeof commandLine !== 'string') return false;

  const patterns = [
    /\b(rm\s+-[^\s]*r[^\s]*f|rmdir\s+\/[^\s]*s|del\s+\/[^\s]*s)\b/i,
    /\bgit\s+reset\s+--hard\b/i,
    /\bgit\s+clean\s+-[^\s]*f\b/i,
    /\bgit\s+push\s+.*(--force|-f)\b/i,
    /\b(DROP\s+(TABLE|DATABASE)|TRUNCATE\s+(TABLE)?)\b/i,
    /\b(node\s+deploy\.js|npm\s+run\s+deploy|pnpm\s+run\s+deploy)\b/i
  ];

  return patterns.some(pattern => pattern.test(commandLine));
}

/**
 * Checks if a file path points to a secret or environment file that should not be touched or exposed.
 * @param {string} targetPath 
 * @returns {boolean}
 */
export function isSecretPath(targetPath) {
  if (!targetPath || typeof targetPath !== 'string') return false;

  const normalized = targetPath.replace(/\\/g, '/');
  const base = path.posix.basename(normalized).toLowerCase();

  // Explicit safe templates
  if (base === '.env.example' || base === '.env.sample' || base === '.env.template') {
    return false;
  }

  // Block .env, .env.local, .env.production, etc.
  if (base.startsWith('.env')) {
    return true;
  }

  // Block private keys, certificates, credentials
  if (/\.(pem|key|pfx|pkcs12|id_rsa|id_ed25519)$/i.test(base)) {
    return true;
  }

  return false;
}
