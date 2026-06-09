// Wrapper to launch next dev with correct paths
const { spawn } = require('child_process');
const path = require('path');

const next = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
const child = spawn(process.execPath, [next, 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('exit', (code) => process.exit(code ?? 0));
