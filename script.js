const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

ipcRenderer.on('update-progress', (event, progressValue) => {
  const progressBar = document.getElementById('progressBar');
  progressBar.value = progressValue;
});

document.getElementById('createModButton').addEventListener('click', function() {
  const modName = document.getElementById('modName').value;
  const authorName = document.getElementById('authorName').value;
  const textureFile = document.getElementById('textureFile').files[0];
  const includeUniform = document.querySelector('input[name="uniform"]').checked;
  const includeWeapons = document.querySelector('input[name="weapons"]').checked;
  const includeVehicle = document.querySelector('input[name="vehicle"]').checked;
  const blendedNormals = document.querySelector('input[name="blendUniform"]').checked;

  // Check for missing inputs
  if (!modName) {
    alert('Please provide a Mod Name.');
    return;
  }
  if (!authorName) {
    alert('Please provide an Author Name.');
    return;
  }
  if (!textureFile) {
    alert('Please upload a texture file.');
    return;
  }

  // Show loading bar
  document.getElementById('progressBar').style.display = 'block';

  // Copy the image file to the texture folder
  const destinationPath = path.join(__dirname, 'texture/texture.png');
  fs.copyFileSync(textureFile.path, destinationPath);

  ipcRenderer.send('create-mod', { className: modName, author: authorName, options: { blendedNormals } });

  ipcRenderer.on('create-mod-reply', (event, response) => {
    if (response === 'success') {
      alert('Mod created successfully!');
    } else {
      // Handle error
      alert(`Error creating mod: \n\n${response}`);
      console.error(response);
    }
    // Hide loading bar
    document.getElementById('progressBar').style.display = 'none';
  });
});
