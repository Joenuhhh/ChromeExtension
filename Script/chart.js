// Retrieve the buckets data from local storage
chrome.storage.local.get(['bucketData'], function (result) {
    const bucketData = result.bucketData;

    // Check if bucketData exists and has data
    if (bucketData && Object.keys(bucketData).length > 0) {
        // Create a container div to display the competency-to-bucket mappings
        const container = document.createElement('div');
        container.className = 'container mt-3';

        // Create a header to describe the content
        const header = document.createElement('h2');
        header.textContent = 'Competency to Bucket Mapping';
        container.appendChild(header);

        // Create a list to display mappings
        const list = document.createElement('ul');

        // Reverse mapping from buckets to competencies
        const competencyToBucket = {};
        for (const bucketName in bucketData) {
            bucketData[bucketName].forEach(value => {
                const [competency, bucket] = value.split('-');
                competencyToBucket[`Competency ${competency}`] = `Bucket ${bucket}`;
            });
        }

        // Count the number of unique buckets
        const uniqueBuckets = new Set(Object.values(competencyToBucket)).size;
        console.log('Number of Buckets:', uniqueBuckets);

        // Create buckets object to store competencies
        const buckets = {};
        for (let i = 1; i <= uniqueBuckets; i++) {
            buckets[`Bucket ${i}`] = [];
        }

        // Loop through the reversed mapping and put each competency in its bucket
        for (const competency in competencyToBucket) {
            const bucketNumber = competencyToBucket[competency];
            buckets[bucketNumber].push(competency);
        }

        // Display competencies in their respective buckets
        for (const bucketName in buckets) {
            const bucketCompetencies = buckets[bucketName];
            const bucketHeader = document.createElement('h3');
            bucketHeader.textContent = `${bucketName}`;
            container.appendChild(bucketHeader);

            const competencyList = document.createElement('ul');
            bucketCompetencies.forEach(competency => {
                const listItem = document.createElement('li');
                listItem.textContent = competency;
                competencyList.appendChild(listItem);
            });
            container.appendChild(competencyList);
        }

        // Save the competencyToBucket mapping to Chrome Storage
        chrome.storage.local.set({ competencyToBucket }, function () {
            console.log('Competency to Bucket mapping saved to Chrome Storage.');
            console.log('competencyToBucket:', competencyToBucket); // Log it here
        });

        // Append the container to the body
        document.body.appendChild(container);
    } else {
        // Display a message if no mappings are found
        const noMappingsMessage = document.createElement('p');
        noMappingsMessage.textContent = 'No competency-to-bucket mappings found.';
        document.body.appendChild(noMappingsMessage);
    }
});

// Retrieve studentList data from Chrome local storage
chrome.storage.local.get(['studentList', 'competencyToBucket', 'bucketData'], function (result) {
    const studentList = result.studentList;
    const bucketData = result.bucketData;
            // Reverse mapping from buckets to competencies
            const competencyToBucket = {};
            for (const bucketName in bucketData) {
                bucketData[bucketName].forEach(value => {
                    const [competency, bucket] = value.split('-');
                    competencyToBucket[`Competency ${competency}`] = `Bucket ${bucket}`;
                });
            }
    // Check if studentList exists and has data
    if (studentList && studentList.length > 0) {
        // Create a container div to display student data
        const container = document.createElement('div');
        container.className = 'container mt-3';

        // Iterate through each student in studentList
        studentList.forEach(function (student, studentIndex) {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student';

            // Create a header for the student with Name and ID
            const studentHeader = document.createElement('h3');
            studentHeader.textContent = `${student['First Name'][0]} ${student['Last Name'][0]}, ID: ${student['ID'][0]}`;
            studentDiv.appendChild(studentHeader);

            // Create an unordered list for displaying competencies and grades
            const competencyList = document.createElement('ul');

            // Iterate through each competency in the student
            for (const competencyName in student) {
                if (competencyName !== 'First Name' && competencyName !== 'Last Name' && competencyName !== 'ID') {
                    const competencyGrades = student[competencyName];
                    const competencyItem = document.createElement('li');
                    competencyItem.textContent = `${competencyName}: ${competencyGrades.join(', ')} (Average: ${calculateAverage(competencyGrades)})`;
                    competencyList.appendChild(competencyItem);
                }
            }
            const uniqueBuckets = new Set(Object.values(competencyToBucket)).size;
            console.log('Number of Buckets:', uniqueBuckets);
            // Add the "Bucket Grade" item
            for (let i = 0; i < uniqueBuckets; i++){
            const bucketGradeItem = document.createElement('li');
            bucketGradeItem.textContent = 'Bucket N' +': [Calculate the bucket grade here]';
            competencyList.appendChild(bucketGradeItem);
            }
            studentDiv.appendChild(competencyList);
            container.appendChild(studentDiv);
        });

        // Append the container to the body
        document.body.appendChild(container);
    } else {
        // Display a message if no student data is found
        const noStudentDataMessage = document.createElement('p');
        noStudentDataMessage.textContent = 'No student data found.';
        document.body.appendChild(noStudentDataMessage);
    }
});


















function calculateAverage(grades) {
    if (grades.length === 0) {
        return 'N/A';
    }
    
    const sum = grades.reduce((total, grade) => total + parseFloat(grade), 0);
    return (sum / grades.length).toFixed(2);
}