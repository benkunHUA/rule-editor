const fs = require('fs');
const path = require('path');
const runScript = require('runscript');


const relativePath = path.join(__dirname, '../packages');
const packageDirs = fs.readdirSync(relativePath);

for (const dir of packageDirs) {
  console.log(path.resolve(relativePath, dir))
  runScript('npm publish', { 
    cwd: path.resolve(relativePath, dir)
  })
  .catch(err => {
    console.error(err.toString());
  });
}