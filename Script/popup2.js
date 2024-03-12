// Clear existing studentList data in Chrome local storage
chrome.storage.local.remove(['studentList'], function() {
    console.log('Existing studentList data cleared.');

    var studentList = []; // Create an empty array to store student data
    var columnNames = []; // Create an empty array to store column names

    // Get the table header row from the document
    var tableHeaderRow = document.querySelector('table thead tr');
    console.log('Table header row:', tableHeaderRow);

    // Get the column names from the "th" elements in the header row
    var headerColumns = tableHeaderRow.querySelectorAll('th');
    headerColumns.forEach(function(headerColumn) {
        var columnName = headerColumn.textContent.trim();
        columnNames.push(columnName);
    });
    console.log('Column names:', columnNames);

    // Get the table data rows from the document
    var tableDataRows = document.querySelectorAll('table tbody tr');
    console.log('Table data rows:', tableDataRows);

    // Iterate through each table data row
    tableDataRows.forEach(function(dataRow) {
        var columns = dataRow.querySelectorAll('td'); // Get all columns in the row
        var student = {};

        // Extract data from each column and create a student object
        columns.forEach(function(column, columnIndex) {
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

    // Print the student list to the console
    console.log('Student list:', studentList);

    // Save the studentList to Chrome storage
    chrome.storage.local.set({ studentList }, function() {
        console.log('Student data saved to Chrome local storage:', studentList);
    });
});
