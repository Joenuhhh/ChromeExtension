document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the form
    document.getElementById('settingsForm').addEventListener('submit', function(event) {
        // Get form values
        const username = document.getElementById('username').value;
        const competencies = document.getElementById('competencies').value;
        const buckets = document.getElementById('buckets').value;

        // Store the form values in Chrome Storage
        chrome.storage.local.set({
            username,
            competencies,
            buckets
        }, function() {
            // Data saved, now navigate to TeacherSettings.html
            window.location.href = 'TeacherSettings.html';
        });

        // Prevent the form from submitting normally
        event.preventDefault();
    });

    // Add an event listener to the extension icon click
    chrome.action.onClicked.addListener(function (tab) {
        // Clear the bucketData in Chrome storage
        chrome.storage.local.remove(['bucketData'], function() {
            // Reload the popup.html
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: function () {
                    chrome.tabs.reload();
                }
            });
        });
    });
});
// Clear existing studentList data in Chrome local storage
chrome.storage.local.remove(['studentList'], function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: function () {
                var studentList = []; // Create an empty array to store student data
                var columnNames = []; // Create an empty array to store column names

                // Get the table header row from the first table
                var tableHeaderRow1 = document.querySelectorAll('table.table-container:first-of-type thead tr th');

                // Get the column names from the "th" elements in the header row of the first table
                tableHeaderRow1.forEach(function (headerColumn) {
                    var columnName = headerColumn.textContent.trim();
                    columnNames.push(columnName);
                });

                // Get the table data rows from the first table
                var tableDataRows1 = document.querySelectorAll('table.table-container:first-of-type tbody tr');

                // Iterate through each table data row of the first table
                tableDataRows1.forEach(function (dataRow) {
                    var columns = dataRow.querySelectorAll('td'); // Get all columns in the row
                    var student = {};

                    // Extract data from each column and create a student object
                    columns.forEach(function (column, columnIndex) {
                        var columnName = columnNames[columnIndex];
                        
                        // Check if the competency already exists in the student object
                        if (!student.hasOwnProperty(columnName)) {
                            student[columnName] = []; // Initialize an array for the competency
                        }

                        // Push the value to the competency array
                        student[columnName].push(column.textContent.trim());
                    });

                    // Add the student object to the student list
                    studentList.push(student);
                });

                // Get the table header row from the second table
                var tableHeaderRow2 = document.querySelectorAll('table:last-of-type thead tr th');

                // Get the column names from the "th" elements in the header row of the second table
                tableHeaderRow2.forEach(function (headerColumn) {
                    var columnName = headerColumn.textContent.trim();
                    columnNames.push(columnName);
                });

                // Get the table data rows from the second table
                var tableDataRows2 = document.querySelectorAll('table:last-of-type tbody tr');

                // Iterate through each table data row of the second table
                tableDataRows2.forEach(function (dataRow) {
                    var columns = dataRow.querySelectorAll('td'); // Get all columns in the row
                    var student = {};

                    // Extract data from each column and create a student object
                    columns.forEach(function (column, columnIndex) {
                        var columnName = columnNames[columnIndex];
                        
                        // Check if the competency already exists in the student object
                        if (!student.hasOwnProperty(columnName)) {
                            student[columnName] = []; // Initialize an array for the competency
                        }

                        // Push the value to the competency array
                        student[columnName].push(column.textContent.trim());
                    });

                    // Add the student object to the student list
                    studentList.push(student);
                });

                console.log(studentList); // Log the student list

                // Save the studentList to Chrome storage
                chrome.storage.local.set({ studentList }, function () {
                    console.log('Student data saved to Chrome local storage');
                });
            },
        });
    });
});
