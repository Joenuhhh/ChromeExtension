
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

function calculateAverage(grades) {
    if (grades.length === 0) {
        return 'N/A';
    }

    const sum = grades.reduce((total, grade) => total + parseFloat(grade), 0);
    return (sum / grades.length).toFixed(2);
}

module.exports = {
    convertStudentListToCSV: convertStudentListToCSV,
    calculateAverage: calculateAverage,
    exportStudentsToCSV: exportStudentsToCSV
};

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



