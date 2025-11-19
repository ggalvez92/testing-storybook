const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build storybook to default directory
console.log('Building Storybook...');
execSync('storybook build', { stdio: 'inherit' });

// Copy storybook-static to public/storybook
const source = path.join(__dirname, '..', 'storybook-static');
const dest = path.join(__dirname, '..', 'public', 'storybook');

console.log('Copying to public/storybook...');

// Remove destination if exists
if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}

// Copy recursively
function copyRecursive(src, dst) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory does not exist: ${src}`);
  }

  fs.mkdirSync(dst, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

copyRecursive(source, dest);

// Clean up storybook-static
console.log('Cleaning up...');
fs.rmSync(source, { recursive: true, force: true });

console.log('Storybook built successfully to public/storybook');
