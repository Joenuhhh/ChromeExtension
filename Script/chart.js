// chart.js
// Retrieve studentList data from Chrome local storage
chrome.storage.local.get(['studentList'], function(result) {
    const studentData = result.studentList || [];

    // Restructure the data into the desired format
    const studentList = studentData.map(student => {
        const competencies = Object.keys(student)
            .filter(key => key.startsWith('competency'))
            .map(key => ({
                name: key,
                value: student[key]
            }));

        return {
            ID: student.ID,
            firstName: student['First Name'],
            lastName: student['Last Name'],
            competencies
        };
    });

    // Display the restructured student list
    const studentListContainer = document.getElementById('studentList');
    studentListContainer.innerHTML = '';

    studentList.forEach(function(student) {
        const studentInfo = document.createElement('div');
        studentInfo.textContent = `Name: ${student.firstName} ${student.lastName}, Competencies: ${JSON.stringify(student.competencies)}`;
        studentListContainer.appendChild(studentInfo);
    });
});


// Retrieve the buckets data from local storage
chrome.storage.local.get(['bucketData'], function(result) {
    const buckets = result.bucketData;

    // Check if bucketData exists and has data
    if (buckets && Object.keys(buckets).length > 0) {
        // Create a container div to display the bucket selections
        const container = document.createElement('div');
        container.className = 'container mt-3';

        // Create a header to describe the content
        const header = document.createElement('h2');
        header.textContent = 'Bucket Selections';
        container.appendChild(header);

        // Create a list to display bucket selections
        const list = document.createElement('ul');

        // Loop through bucketData and create list items
        for (const bucketName in buckets) {
            const listItem = document.createElement('li');
            listItem.textContent = `${bucketName}: ${buckets[bucketName].join(', ')}`;
            list.appendChild(listItem);
        }

        container.appendChild(list);

        // Append the container to the body
        document.body.appendChild(container);
    } else {
        // Display a message if no bucket selections are found
        const noSelectionsMessage = document.createElement('p');
        noSelectionsMessage.textContent = 'No bucket selections found.';
        document.body.appendChild(noSelectionsMessage);
    }
});



