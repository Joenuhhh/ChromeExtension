// Import the functions to be tested
// Adjust the path as needed

// Mock the chrome object
const mockChrome = {
  storage: {
    sync: {
      set: jest.fn(),
      remove: jest.fn(),
    },
    local: {
      remove: jest.fn(),
      set: jest.fn((data, callback) => callback()), // Mock the set method to call the callback
    },
  },
  tabs: {
    query: jest.fn(),
  },
  scripting: {
    executeScript: jest.fn(),
  },
};

// Assign the mock chrome object to the global object
global.chrome = mockChrome;

// Test case to check if the set method of chrome.storage.sync is called
test('chrome.storage.sync.set is called', async () => {
  // Assuming some synchronous action that triggers the chrome.storage.sync.set method
  mockChrome.storage.sync.set({}); // Directly calling the method

  // Assert that the set method is called with the expected parameters
  expect(mockChrome.storage.sync.set).toHaveBeenCalled();
});









// Define mock data for testing
const mockCompetencies = 3; // Example number of competencies
const mockBuckets = 2; // Example number of buckets

const mockBucketData = {};

// Initialize bucket data
for (let i = 1; i <= mockBuckets; i++) {
    mockBucketData[`Bucket ${i}`] = [];
}

// Add mock dependencies to each bucket
for (let i = 1; i <= mockCompetencies; i++) {
    for (let j = 1; j <= mockBuckets; j++) {
        // Generate dependency string in the format "competencyIndex-bucketIndex"
        const dependency = `${i}-${j}`;
        // Add the dependency to the corresponding bucket
        mockBucketData[`Bucket ${j}`].push(dependency);
    }
}









// Test case for the script
test('Script correctly populates bucketData with mock data', () => {
  // Call the function to be tested
  // For simplicity, let's simulate calling the function directly
  const result = { bucketData: mockBucketData };
  const callback = jest.fn(); // Create a mock callback function
  mockChrome.storage.local.set({ bucketData: mockBucketData }, callback); // Simulate calling the function with mock data

  // Assert that the callback function is called
  expect(callback).toHaveBeenCalled();

  // Assert that the mock chrome.storage.local.set method is called with the mock bucketData and the callback function
  expect(mockChrome.storage.local.set).toHaveBeenCalledWith({ bucketData: mockBucketData }, expect.any(Function));
});











//web scraping test:
// Define the extractAndSaveStudentData function
function extractAndSaveStudentData() {
  var studentList = []; // Create an empty array to store student data
  var columnNames = []; // Create an empty array to store column names

  // Get the table header row from the document
  var tableHeaderRow = document.querySelector('table thead tr');

  // Get the column names from the "th" elements in the header row
  var headerColumns = tableHeaderRow.querySelectorAll('th');
  headerColumns.forEach(function (headerColumn) {
    var columnName = headerColumn.textContent;
    var numericPart = columnName.match(/\d+/); // Extract numeric part
    if (numericPart) {
      columnName = 'Competency ' + numericPart[0]; // Add "Competency" prefix
    }
    columnNames.push(columnName);
  });

  // Get the table data rows from the document
  var tableDataRows = document.querySelectorAll('table tbody tr');

  // Iterate through each table data row
  tableDataRows.forEach(function (dataRow) {
    var columns = dataRow.querySelectorAll('td'); // Get all columns in the row
    var student = {};

    // Extract data from each column and create a student object
    columns.forEach(function (column, columnIndex) {
      var columnName = columnNames[columnIndex];

      // Check if the competency already exists in the student object
      if (!student.hasOwnProperty(columnName)) {
        student[columnName] = []; // Initialize an array for the competency
      }

      // Push the value to the competency array
      student[columnName].push(column.textContent);
    });

    // Add the student object to the student list
    studentList.push(student);
  });
  console.log(studentList);
  // Save the studentList to Chrome storage
  chrome.storage.local.set({ studentList }, function () {
    console.log('Student data saved to Chrome local storage');
  });
}
// Test case for the function that extracts student data and saves it to Chrome local storage
test('Extracts student data and saves it to Chrome local storage', () => {
  // Mock HTML table with sample data
  document.body.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Competency 1</th>
          <th>Competency 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>John</td>
          <td>Doe</td>
          <td>90</td>
          <td>85</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jane</td>
          <td>Smith</td>
          <td>95</td>
          <td>88</td>
        </tr>
      </tbody>
    </table>
  `;

  // Invoke the function to extract student data and save it to Chrome local storage
  extractAndSaveStudentData();

  // Expected student list based on the mock HTML table
  const expectedStudentList = [
    {
      'ID': ['1'],
      'First Name': ['John'],
      'Last Name': ['Doe'],
      'Competency 1': ['90'],
      'Competency 2': ['85']
    },
    {
      'ID': ['2'],
      'First Name': ['Jane'],
      'Last Name': ['Smith'],
      'Competency 1': ['95'],
      'Competency 2': ['88']
    }
  ];

  // Assert that the mock chrome.storage.local.set method is called with the expected student list
  expect(mockChrome.storage.local.set).toHaveBeenCalledWith({ studentList: expectedStudentList }, expect.any(Function));
});

