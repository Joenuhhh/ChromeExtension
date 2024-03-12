document.addEventListener('DOMContentLoaded', function () {
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

    // Function to apply the current mode to the extension UI
    function applyMode(mode) {
        // Apply styles or other changes based on the mode
        if (mode === 'dark') {
            document.body.classList.add('dark-mode'); // Add a class for dark mode
   
        } else {
            document.body.classList.remove('dark-mode'); // Remove the class for light mode

   
        }
        
    }

    // Initialize the extension UI with the saved mode (or default to light mode)
    chrome.storage.sync.get('mode', function(data) {
        var mode = data.mode || 'light';
        applyMode(mode);
    });

    // Event listener for toggle switch if it exists
    var toggleSwitch = document.getElementById('toggle-mode');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            var mode = toggleSwitch.checked ? 'dark' : 'light';
            // Save the mode to storage
            saveModeToStorage(mode);
            // Apply the new mode to the extension UI
            applyMode(mode);
            console.log('Mode toggled to:', mode);
        });
    }

    // Set default mode to light mode if not already set
    chrome.storage.sync.get('mode', function(data) {
        var mode = data.mode || 'light';
        // Apply the mode to the body
        document.body.classList.add(mode + '-mode');
        // Update the toggle switch based on the mode
        if (toggleSwitch) {
            toggleSwitch.checked = mode === 'dark'; // Check the switch if the mode is dark
        }
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
});
