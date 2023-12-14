chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: function () {
          var studentList = []; // Create an empty array to store student data

          // Get the table rows from the document
          var tableRows = document.querySelectorAll('table tbody tr');

          // Iterate through each table row
          tableRows.forEach(function (row) {
              var columns = row.querySelectorAll('td'); // Get all columns in the row

              // Extract data from each column
              var id = columns[0].textContent;
              var firstName = columns[1].textContent;
              var lastName = columns[2].textContent;
              var grade1 = columns[3].textContent;
              var grade2 = columns[4].textContent;
              var grade3 = columns[5].textContent;
              var grade4 = columns[6].textContent;
              var grade5 = columns[7].textContent;

              // Create a student object and add it to the student list
              var student = {
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  grades: [grade1, grade2, grade3, grade4, grade5],
              };

              studentList.push(student);
          });

          // Print the list of students to the console
          console.log(studentList);
      },
  });
});
