// Retrieve the buckets data from local storage
chrome.storage.local.get(['bucketData'], function (result) {
    const bucketData = result.bucketData;

    // Check if bucketData exists and has data
    if (bucketData && Object.keys(bucketData).length > 0) {
        // Create a container div to display the competency-to-bucket mappings
        const container = document.createElement('div');
        container.className = 'container mt-3';

        // Create a big card to contain all buckets
        const bigCard = document.createElement('div');
        bigCard.className = 'card';

        // Create a card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        const header = document.createElement('h3');
        header.textContent = 'Competency to Bucket Mapping';
        header.classList.add('lighter-font');
        cardHeader.appendChild(header);
        bigCard.appendChild(cardHeader);

        const bigCardBody = document.createElement('div');
        bigCardBody.className = 'card-body';

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

            // Create a sub-card for each bucket
            const subCard = document.createElement('div');
            subCard.className = 'card mb-3';
            const subCardBody = document.createElement('div');
            subCardBody.className = 'card';

            // Create a header for the bucket
            const bucketHeader = document.createElement('h5');
            bucketHeader.className = 'card-header';
            bucketHeader.textContent = `${bucketName}`;
            subCardBody.appendChild(bucketHeader);

            // Create a list for competencies in the bucket
            const competencyList = document.createElement('ul');
            //competencyList.className = 'list-group list-group-flush';

            // Add each competency to the list
            bucketCompetencies.forEach(competency => {
                const listItem = document.createElement('li');
                listItem.textContent = competency;
                listItem.className = 'list-group list-group-flush';
                competencyList.appendChild(listItem);
            });

            // Append the list to the sub-card body
            subCardBody.appendChild(competencyList);
            subCard.appendChild(subCardBody);

            // Append the sub-card to the big card body
            bigCardBody.appendChild(subCard);
        }

        // Append the big card body to the big card
        bigCard.appendChild(bigCardBody);

        // Append the big card to the container
        container.appendChild(bigCard);

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

        container.className = 'card-container';

        //make each student a card
        container.classList.add('student');


        // Iterate through each student in studentList
        studentList.forEach(function (student, studentIndex) {
            // Create a card for each student
            const studentCard = document.createElement('div');
            studentCard.className = 'card mb-3'; // Add margin-bottom for spacing between cards

            // Create a header for the student card with Name and ID
            const studentHeader = document.createElement('h5');
            studentHeader.className = 'card-header';
            studentHeader.textContent = `${student['First Name'][0]} ${student['Last Name'][0]}, ID: ${student['ID'][0]}`;
            studentCard.appendChild(studentHeader);

            // Create a body for the student card
            const studentCardBody = document.createElement('div');
            studentCardBody.className = 'card-body';

            // Create an unordered list for displaying competencies and grades
            const competencyList = document.createElement('ul');
            var bucketScores = [];

            // Iterate through each competency in the student
            for (const competencyName in student) {
                if (competencyName !== 'First Name' && competencyName !== 'Last Name' && competencyName !== 'ID') {
                    const competencyGrades = student[competencyName];
                    var bucket = competencyToBucket[competencyName];
                    const competencyItem = document.createElement('li');
                    competencyItem.className = 'list-group list-group-flush';
                    var avg = calculateAverage(competencyGrades);

                    if (bucket !== undefined) {
                        var currentBucket = bucketScores.find(m => m.bucketName == bucket);
                        if (currentBucket === null || currentBucket === undefined) {
                            bucketScores.push({
                                bucketName: bucket,
                                scores: [avg],
                            });
                        } else {
                            currentBucket.scores.push(avg);
                        }
                    }

                    competencyItem.textContent = `${competencyName}: ${competencyGrades.join(', ')} (Average: ${avg})`;
                    competencyList.appendChild(competencyItem);
                }
            }

            const uniqueBuckets = new Set(Object.values(competencyToBucket)).size;

            // Add the "Bucket Grade" item
            for (let i = 0; i < uniqueBuckets; i++) {
                const bucketGradeItem = document.createElement('li');
                bucketGradeItem.className = 'list-group list-group-flush';
                var currentName = `Bucket ${i + 1}`;
                var currentBuckett = bucketScores.find(m => m.bucketName === currentName);

                if (currentBuckett === undefined) {
                    bucketGradeItem.textContent = `Bucket ${i + 1} = ${0}`;
                } else {
                    var scores = currentBuckett.scores;
                    var scoreCount = scores.length;
                    var scoreTotal = scores.reduce((pv, cv) => parseFloat(pv) + parseFloat(cv), 0);
                    var scoreAVG = (scoreTotal ?? 0) / (scoreCount ?? 1);
                    bucketGradeItem.textContent = `Bucket ${i + 1} = ${scoreAVG}`;
                }

                competencyList.appendChild(bucketGradeItem);

            }

            // Append the competency list to the student card body
            studentCardBody.appendChild(competencyList);

            // Append the student card body to the student card
            studentCard.appendChild(studentCardBody);

            // Append the student card to the container
            container.appendChild(studentCard);

           // Create a button for viewing student details
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View Details';
    viewButton.className = 'btn btn-primary btn-block'; 
    viewButton.addEventListener('click', function () {
        // Use studentIndex as the identifier to store in localStorage
        localStorage.setItem('searchedStudentId', studentIndex.toString());
        window.location.href = "singleStudent.html";
    });

    // Append the button to the student card body
    studentCardBody.appendChild(viewButton);
            // Update the student object with bucket scores
            student.bucketScores = bucketScores; // Add bucketScores to the student object
            document.body.appendChild(container);

        });

        // Save the updated student list to Chrome storage
        chrome.storage.local.set({ 'fullStudentList': studentList }, function () {
            console.log('The full student list with bucket scores has been saved to Chrome storage.');
        });
        chrome.storage.local.get(['fullStudentList'], function (result) {
            const fullStudentList = result.fullStudentList;
            if (fullStudentList && fullStudentList.length > 0) {
                console.log('Full Student List with Bucket Scores:');
                fullStudentList.forEach(function (student, index) {
                    console.log(`Student ${index + 1}:`, student);
                });
            } else {
                console.log('The full student list is empty or not found.');
            }
        });


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




function convertStudentListToCSV(studentList) {
    // Start with the header row, which includes ID, First Name, Last Name, dynamic competency headers, and bucket headers
    let headers = ['ID', 'First Name', 'Last Name'];
    // Assuming all students have the same competencies and buckets, use the first student to extract the competency names and bucket names
    if (studentList.length > 0) {
        for (const key in studentList[0]) {
            if (key.startsWith('Competency')) {
                headers.push(key);
            }
        }
    }

    // Add bucket headers
    let uniqueBucketNames = new Set();
    studentList.forEach(student => {
        if (student.bucketScores) {
            student.bucketScores.forEach(score => {
                uniqueBucketNames.add(score.bucketName);
            });
        }
    });
    let bucketHeaders = Array.from(uniqueBucketNames);

    let csvContent = headers.concat(bucketHeaders).join(',') + '\r\n';

    // Iterate through each student to create a row
    studentList.forEach(student => {
        // Extract student information
        const id = student['ID'][0]; // Assuming ID is an array, we take the first element
        const firstName = student['First Name'][0]; // Assuming First Name is an array, we take the first element
        const lastName = student['Last Name'][0]; // Assuming Last Name is an array, we take the first element
        let row = `${id},${firstName},${lastName},`;

        // Extract the competencies grades
        headers.slice(3).forEach(header => {
            if (student.hasOwnProperty(header)) {
                const grades = student[header];
                row += `"${grades.join('|')}",`; // Join all grades for the current competency into a single string
            } else {
                row += ','; // Add an empty cell if the student doesn't have a grade for the competency
            }
        });

        // Calculate and fill the bucket columns with average scores
        bucketHeaders.forEach(bucketName => {
            const bucketScores = student.bucketScores.find(score => score.bucketName === bucketName);
            if (bucketScores) {
                const avgScore = calculateAverage(bucketScores.scores); // Assuming a function calculateAverage calculates the average
                row += `"${avgScore}",`; // Add the average score of the bucket to the row
            } else {
                row += ','; // Add an empty cell if the student doesn't have scores for the bucket
            }
        });

        // Remove the last comma and add a newline character
        csvContent += row.slice(0, -1) + '\r\n';
    });

    return csvContent;
}





function saveDataToChromeStorage(csvData) {
    chrome.storage.local.set({ 'exportedCSV': csvData }, function () {
        console.log('CSV data has been saved to Chrome storage.');

    });

}

// Add this script at the end of your HTML, just before the closing </body> tag.

// Define a function to handle the button click event
function handleExportButtonClick() {
    console.log('Button clicked!');


}













// Define the exportStudentsToCSV function
function exportStudentsToCSV() {
    // Retrieve fullStudentList from Chrome storage
    chrome.storage.local.get(['fullStudentList'], function (result) {
        const fullStudentList = result.fullStudentList;

        // Check if fullStudentList is defined and not empty
        if (fullStudentList && fullStudentList.length > 0) {
            // Use the fullStudentList variable here
            const csvData = convertStudentListToCSV(fullStudentList);
            // Log the generated CSV data
            console.log('Generated CSV data:');
            console.log(csvData);
            downloadCSV(csvData, 'StudentList.csv'); // Trigger the file download
            // Make sure the exportToCSV function from the previous explanation is also included in this file

            // ...
        } else {
            console.error('Full student list not found in Chrome storage.');
        }
    });
}
// Assuming you're using "studentList.html" as your popup HTML
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const exportBtn = document.getElementById('export-csv-btn');

    // Update the event listener to target the button in "studentList.html"
    if (exportBtn) {
        exportBtn.addEventListener('click', exportStudentsToCSV);
    } else {
        console.log('Button element not found'); // Add this line for debugging
    }
});

function downloadCSV(csvContent, fileName) {
    // Create a Blob with the CSV content
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);

    // Set link attributes
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    // Append link to the body
    document.body.appendChild(link);

    // Trigger the download by simulating a click
    link.click();

    // Clean up by removing the link
    document.body.removeChild(link);
}


