// Retrieve user selections from Chrome Storage
chrome.storage.sync.get(['competencies', 'buckets'], function(result) {
    const competencies = result.competencies || 0;
    const buckets = result.buckets || 0;

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
        for (let i = 1; i <= buckets; i++) {
            const bucketHeader = document.createElement('th');
            bucketHeader.textContent = `Bucket ${i}`;
            headerRow.appendChild(bucketHeader);
        }
        table.appendChild(headerRow);

        // Create table rows with dependencies and radio buttons
        for (let i = 1; i <= competencies; i++) {
            const row = document.createElement('tr');
            const dependencyCell = document.createElement('td');
            dependencyCell.textContent = `Dependency ${i}`;
            row.appendChild(dependencyCell);

            for (let j = 1; j <= buckets; j++) {
                const radioCell = document.createElement('td');
                const radioButton = document.createElement('input');
                radioButton.type = 'radio';
                radioButton.name = `radioGroup_${i}`; // Use a unique name for each group
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
});
