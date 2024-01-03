const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

ipcRenderer.on('update-progress', (event, progress) => {
  const progressBar = document.getElementById('progressBar');
  const progressStatus = document.getElementById('progressStatus');
  progressBar.value = progress.value;
  progressStatus.innerText = progress.message;
});

document.getElementById('createModButton').addEventListener('click', function() {
  const modName = document.getElementById('modName').value;
  const authorName = document.getElementById('authorName').value;
  const textureFile = document.getElementById('textureFile').files[0];
  const includeBaseUniform = document.querySelector('input[name="baseUniform"]').checked;
  const includeIndepUniform = document.querySelector('input[name="indepUniform"]').checked;
  const includeCoveralls = document.querySelector('input[name="civCoveralls"]').checked;
  const includeAssaultPack = document.querySelector('input[name="assaultPack"]').checked;
  const includeCarrierRig = document.querySelector('input[name="carrierRig"]').checked;
  const includeSpecialCarrierRig = document.querySelector('input[name="carrierRigSpecial"]').checked;
  const includeHelmet = document.querySelector('input[name="helmetBlufor"]').checked;
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
  document.getElementById('progressStatus').style.display = 'block';
  document.getElementById('createModButton').disabled = true;

  // Copy the image file to the texture folder
  const destinationPath = path.join(__dirname, 'texture/texture.png');
  fs.copyFileSync(textureFile.path, destinationPath);

  let addons = [];
  if (includeBaseUniform) addons.push('baseUniform');
  if (includeIndepUniform) addons.push('indepUniform');
  if (includeAssaultPack) addons.push('assaultPack');
  if (includeSpecialCarrierRig) addons.push('carrierRigSpecial');
  if (includeCarrierRig) addons.push('carrierRig');
  if (includeHelmet) addons.push('helmetBlufor');
  if (includeCoveralls) addons.push('civCoveralls');

  ipcRenderer.send('create-mod', { className: modName, author: authorName, options: { blendedNormals, addons } });

  ipcRenderer.on('create-mod-reply', (event, response) => {
    if (response === 'success') {
      alert('Mod created successfully!');
    } else {
      // Handle error
      console.error(response);
      alert(`Error creating mod: \n\n${response}`);
    }
    // Hide loading bar
    document.getElementById('progressBar').style.display = 'none';
    document.getElementById('progressStatus').style.display = 'none';
    document.getElementById('createModButton').disabled = false;
  });
});
