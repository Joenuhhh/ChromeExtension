document.addEventListener("DOMContentLoaded", function() {
    // Retrieve student info from Chrome Storage using fullStudentList
    chrome.storage.local.get('fullStudentList', function(data) {
        var fullStudentList = data.fullStudentList;
        var studentId = localStorage.getItem('searchedStudentId');
        console.log(data.fullStudentList);
        if (fullStudentList && studentId !== null) {
            var student = fullStudentList[studentId];
            if (student) {
                displayStudentDetails(student);
            } else {
                displayErrorMessage("Student not found.");
            }
        } else {
            displayErrorMessage("Full student list not found in Chrome Storage.");
        }
    });

    // Function to display student details on the page
    function displayStudentDetails(student) {
        var studentInfoDiv = document.getElementById('studentInfo');
        if (studentInfoDiv) {
            // Clear previous content
            studentInfoDiv.innerHTML = '';
    
            // Set student name as card header
            var cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            var studentName = document.createElement('h4');
            studentName.textContent = student['First Name'][0] + ' ' + student['Last Name'][0];
            cardHeader.appendChild(studentName);
            studentInfoDiv.appendChild(cardHeader);
    
            // Display student information in card body
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            for (var key in student) {
                if (student.hasOwnProperty(key) && key !== 'bucketScores') { // Skip bucketScores for now
                    var value = student[key][0]; // Assuming each value is stored as an array with a single value
                    var infoElement = document.createElement('p');
                    infoElement.textContent = key + ": " + value;
                    cardBody.appendChild(infoElement);
                }
            }
            studentInfoDiv.appendChild(cardBody);

           // Display Bucket Scores separately
if (student.hasOwnProperty('bucketScores')) {
    var bucketScores = student['bucketScores'];
    bucketScores.forEach(bucket => {
        var scoresText = bucket.scores.join(', '); // Join all scores with a comma
        var averageScore = bucket.scores.reduce((acc, score) => acc + parseFloat(score), 0) / bucket.scores.length;
        var bucketInfoElement = document.createElement('p');
        // Display all scores and the average
        bucketInfoElement.textContent = `${bucket.bucketName}: Scores = [${scoresText}], Average = ${averageScore.toFixed(2)}`;
        cardBody.appendChild(bucketInfoElement);
    });
}

        } else {
            displayErrorMessage("Element 'studentInfo' not found.");
        }
    }

    // Function to display error message on the page
    function displayErrorMessage(message) {
        var errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.textContent = message;
        } else {
            // If error element doesn't exist, log the error
            console.error("Error: " + message);
        }
    }

    // Function to navigate back to studentList.html
    function goBack() {
        window.location.href = "studentList.html";
    }
});
