// Initialize an object to represent buckets and their competencies
let bucketData = {};

// Clear the bucketData at the beginning
chrome.storage.local.set({ bucketData }, function() {
    // Retrieve user selections from Chrome Storage
    chrome.storage.sync.get(['competencies', 'buckets'], function(result) {
        const competencies = result.competencies || 0;
        const buckets = result.buckets || 0;

        try {
            // Create a function to generate the dynamic table
            function generateTable() {
                const tableContainer = document.getElementById('tableContainer');
                const table = document.createElement('table');
                table.className = 'table';

                // Create table header row with bucket names
                const headerRow = document.createElement('tr');
                const bucketsHeader = document.createElement('th');
                bucketsHeader.textContent = 'Buckets';
                headerRow.appendChild(bucketsHeader);

                // Initialize bucket data
                for (let i = 1; i <= buckets; i++) {
                    bucketData[`Bucket ${i}`] = [];
                    const bucketHeader = document.createElement('th');
                    bucketHeader.textContent = `Bucket ${i}`;
                    headerRow.appendChild(bucketHeader);
                }
                table.appendChild(headerRow);

                // Create table rows with dependencies and radio buttons
                for (let i = 1; i <= competencies; i++) {
                    const row = document.createElement('tr');
                    const dependencyCell = document.createElement('td');
                    dependencyCell.textContent = `Competency ${i}`;
                    row.appendChild(dependencyCell);

                    for (let j = 1; j <= buckets; j++) {
                        const radioCell = document.createElement('td');
                        const radioButton = document.createElement('input');
                        radioButton.type = 'radio';
                        radioButton.name = `radioGroup_${i}`;
                        radioButton.value = `Value ${i}-${j}`;

                        radioCell.appendChild(radioButton);
                        row.appendChild(radioCell);
                    }
                    table.appendChild(row);
                }

                // Append the table to the container
                tableContainer.appendChild(table);
            }

            // Generate the dynamic table
            generateTable();

            // Add event listener to the form button
            document.getElementById('showCompetenciesButton').addEventListener('click', function (event) {
                // Prevent the default form submission
                event.preventDefault();

                // Get all checked radio buttons
                const checkedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');

                // Add competency values to the bucketData when the button is clicked
                checkedRadioButtons.forEach(function(radioButton) {
                    const selectedValue = radioButton.value;
                    const bucketName = `Bucket ${radioButton.name.split('_')[1]}`;
                    
                    if (bucketData[bucketName]) {
                        bucketData[bucketName].push(selectedValue);
                    } else {
                        // Initialize the bucket array if it's undefined
                        bucketData[bucketName] = [selectedValue];
                    }
                });

                // Log competencies in each bucket to the console
                console.log('Competencies in Buckets:', bucketData);

                // Store the updated data in Chrome storage
                chrome.storage.local.set({ bucketData }, function() {
                    // Submit the form to navigate to chart.html after storage is updated
                    document.getElementById('settingsForm').submit();
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
