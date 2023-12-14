document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.getElementById('settingsForm');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from the form
        const competencies = parseInt(document.getElementById('competencies').value, 10);
        const buckets = parseInt(document.getElementById('buckets').value, 10);

        // Validate the values
        if (isNaN(competencies) || isNaN(buckets)) {
            alert('Please enter valid numbers for competencies and buckets.');
            return;
        }

        // Check if values are within the allowed range (1 to 15)
        if (competencies < 1 || competencies > 15 || buckets < 1 || buckets > 15) {
            alert('The number of competencies and buckets must be between 1 and 15.');
            return;
        }

        // Store the values in Chrome storage
        chrome.storage.local.set({ competencies, buckets }, function () {
            console.log('Competencies and buckets saved to Chrome storage.');
        });

        // Redirect to TeacherSettings.html
        window.location.href = 'TeacherSettings.html';
    });
});