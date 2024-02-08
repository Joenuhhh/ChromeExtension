// In your background script or content script
const manifest = chrome.runtime.getManifest();
const version = manifest.version;
console.log(version); // Output the version number to the console

// Display the version number somewhere in your extension
document.getElementById('version').textContent = version;
