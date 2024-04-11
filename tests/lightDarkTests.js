// Function to apply the current mode to the extension UI
function applyMode(mode) {
    // Apply styles or other changes based on the mode
    if (mode === 'dark') {
        document.body.classList.add('dark-mode'); // Add a class for dark mode
    } else {
        document.body.classList.remove('dark-mode'); // Remove the class for light mode
    }
}



// Function to save the current mode (light/dark) to Chrome storage
function saveModeToStorage(mode) {
    chrome.storage.sync.set({ mode: mode });
}


// Function to toggle between light and dark mode
function toggleMode() {
    chrome.storage.sync.get('mode', function(data) {
        var currentMode = data.mode || 'light'; // Default mode is light
        var newMode = currentMode === 'light' ? 'dark' : 'light'; // Toggle mode

        saveModeToStorage(newMode); // Save the new mode to storage

        // Apply the new mode to the extension UI
        applyMode(newMode);
    });
}

// Initialize the extension UI with the saved mode (or default to light mode)
chrome.storage.sync.get('mode', function(data) {
    var mode = data.mode || 'light';
    applyMode(mode);
});

// Function to initialize the extension UI with the saved mode
function initializeUI() {
    chrome.storage.sync.get('mode', function(data) {
        var mode = data.mode || 'light';
        applyMode(mode);
    });
}

// Call initializeUI to set the UI based on the saved mode
initializeUI();

// Export other functions if needed
module.exports = {
    applyMode: applyMode,
    saveModeToStorage: saveModeToStorage,
    toggleMode: toggleMode,
    initializeUI: initializeUI
};
