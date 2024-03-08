// Retrieve data from Chrome storage
chrome.storage.local.get(['fullStudentList'], function(result) {
  const fullStudentList = result.fullStudentList;

  if (fullStudentList && fullStudentList.length > 0) {
      // Calculate average scores for each competency across all students
      const competencyAverages = {};

      fullStudentList.forEach(function(student) {
          for (const competencyName in student) {
              if (competencyName !== 'First Name' && competencyName !== 'Last Name' && competencyName !== 'ID' && competencyName !== 'bucketScores') {
                  const competencyGrades = student[competencyName];
                  const avg = calculateAverage(competencyGrades);
                  if (!competencyAverages[competencyName]) {
                      competencyAverages[competencyName] = [avg];
                  } else {
                      competencyAverages[competencyName].push(avg);
                  }
              }
          }
      });

      // Calculate the overall average for each competency
      const overallAverages = {};
      for (const competencyName in competencyAverages) {
          const scores = competencyAverages[competencyName];
          const scoreCount = scores.length;
          const scoreTotal = scores.reduce((total, score) => total + score, 0);
          const average = scoreTotal / scoreCount;
          overallAverages[competencyName] = average;
      }

      // Create data for the competency bar chart
      const competencyData = [{
          x: Object.keys(overallAverages),
          y: Object.values(overallAverages),
          type: 'bar',
          name: 'Competencies',
          marker: {
              color: '#17becf' // Set plot background color
          }
      }];

      // Define layout for the competency bar chart
      const competencyLayout = {
          title: 'Average Competency Scores for All Students',
          xaxis: {
              title: 'Competencies'
          },
          yaxis: {
              title: 'Average Score',
              range: [0, 3], // Set y-axis range to 0 to 3
              tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3],
              dtick: 1
          },
          height: 400, // Increase the height of the chart
        
      };

      // Plot the competency bar chart
      Plotly.newPlot('chart-container', competencyData, competencyLayout);

      // Calculate bucket averages
      const bucketAverages = {};

      fullStudentList.forEach(function(student) {
          student.bucketScores.forEach(function(bucket) {
              if (!bucketAverages[bucket.bucketName]) {
                  bucketAverages[bucket.bucketName] = [calculateAverage(bucket.scores)];
              } else {
                  bucketAverages[bucket.bucketName].push(calculateAverage(bucket.scores));
              }
          });
      });

      // Calculate the overall average for each bucket
      const bucketOverallAverages = {};
      for (const bucketName in bucketAverages) {
          const scores = bucketAverages[bucketName];
          const scoreCount = scores.length;
          const scoreTotal = scores.reduce((total, score) => total + score, 0);
          const average = scoreTotal / scoreCount;
          bucketOverallAverages[bucketName] = average;
      }

      // Create data for the bucket bar chart
      const bucketData = [{
          x: Object.keys(bucketOverallAverages),
          y: Object.values(bucketOverallAverages),
          type: 'bar',
          name: 'Buckets',
          marker: {
              color: '#17becf' // Set plot background color
          }
      }];

      // Define layout for the bucket bar chart
      const bucketLayout = {
          title: 'Average Bucket Scores for All Students',
          xaxis: {
              title: 'Buckets'
          },
          yaxis: {
              title: 'Average Score',
              range: [0, 3], // Set y-axis range to 0 to 3
              tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3],
              dtick: 1
          },
          height: 400, // Increase the height of the chart
      
      };

      // Plot the bucket bar chart
      Plotly.newPlot('bucket-chart-container', bucketData, bucketLayout);
  } else {
      console.log('The full student list is empty or not found.');
  }
});

// Function to calculate average
function calculateAverage(scores) {
  if (scores.length === 0) {
      return 0;
  }
  
  const sum = scores.reduce((total, score) => total + parseFloat(score), 0);
  return sum / scores.length;
}
