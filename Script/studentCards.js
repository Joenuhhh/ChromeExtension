 // Iterate through each student in studentListData
 studentListData.forEach(function(student) {
    // Create a card element for the student
    const card = document.createElement('div');
    card.className = 'card mb-3';

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create card title with student name and ID
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${student['First Name'][0]} ${student['Last Name'][0]}, ID: ${student['ID'][0]}`;

    // Create an unordered list for displaying competencies and grades
    const competencyList = document.createElement('ul');
    competencyList.className = 'card-text';

    // Iterate through each competency in the student
    for (const competencyName in student) {
        if (competencyName !== 'First Name' && competencyName !== 'Last Name' && competencyName !== 'ID') {
            const competencyGrades = student[competencyName];
            var avg = calculateAverage(competencyGrades);

            // Create list item for each competency
            const listItem = document.createElement('li');
            listItem.textContent = `${competencyName}: ${competencyGrades.join(', ')} (Average: ${avg})`;

            competencyList.appendChild(listItem);
        }
    }

    // Append card title and competency list to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(competencyList);

    // Append card body to card
    card.appendChild(cardBody);

    // Append card to studentList container
    const studentListContainer = document.getElementById('studentList');
    studentListContainer.appendChild(card);
});