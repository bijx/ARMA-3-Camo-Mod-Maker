const fs = require('fs').promises;
const { exec: execCallback } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const exec = promisify(execCallback);

async function processImages(directory) {
  try {
    const files = await fs.readdir(directory);

    // Map all file processing promises
    const processingPromises = files
      .filter(file => path.extname(file).toLowerCase() === '.png')
      .map(async file => {
        const baseName = path.basename(file, '.png');
        const command = `.\\vendor\\Pal2PacE "${path.join(directory, baseName)}.png" "${path.join(directory, baseName)}.paa"`;

        try {
          const { stdout, stderr } = await exec(command);
          console.log(`Processed ${file}`);
          if (stdout) console.log(`stdout: ${stdout}`);
          if (stderr) console.error(`stderr: ${stderr}`);
        } catch (error) {
          console.error(`Error executing command for file ${file}:`, error);
          throw error;
        }
      });

    // Wait for all files to be processed
    await Promise.all(processingPromises);
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

module.exports = processImages;
