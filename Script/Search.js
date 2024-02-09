document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('searchBtn').addEventListener('click', function() {
        var searchText = document.getElementById('searchInput').value.trim().toLowerCase();
        scrollToSearchedName(searchText);
    });

    function scrollToSearchedName(searchText) {
        chrome.storage.local.get('studentList', function(data) {
            var studentList = data.studentList;

            if (studentList) {
                for (var i = 0; i < studentList.length; i++) {
                    var student = studentList[i];
                    var fullName = student['First Name'][0] + ' ' + student['Last Name'][0];

                    if (fullName.toLowerCase().includes(searchText)) {
                        localStorage.setItem('searchedStudentId', i);
                        // Redirect to singleStudent.html
                        window.location.href = "singleStudent.html";
                        return; // Stop searching after finding the first match
                    }
                }
                // If no student found, display error message
                alert("No student found with the given name.");
            } else {
                alert("Student list not found in Chrome Storage.");
            }
        });
    }
});
