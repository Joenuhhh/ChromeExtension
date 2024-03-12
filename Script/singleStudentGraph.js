document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the student ID and the full student list from Chrome storage
    chrome.storage.local.get(['fullStudentList'], function (result) {
        const fullStudentList = result.fullStudentList;
        const studentId = localStorage.getItem('searchedStudentId');

        if (fullStudentList && studentId !== null) {
            const student = fullStudentList[studentId];
            if (student) {
                // Prepare data for competency scores graph
                const competencyScores = [];
                const competencies = [];
                for (const key in student) {
                    if (student.hasOwnProperty(key) && key.startsWith('Competency')) {
                        competencies.push(key);
                        // Calculate the average score for the competency
                        const averageScore = student[key].reduce((sum, score) => sum + parseFloat(score), 0) / student[key].length;
                        competencyScores.push(averageScore); // Push the average score instead of the first item
                    }
                }
                

                // Plot competency scores graph
                const competencyData = [{
                    x: competencies,
                    y: competencyScores,
                    type: 'bar',
                    marker: {
                        color: '#17becf'
                    }
                }];

                const competencyLayout = {
                    title: 'Student Competency Scores',
                    xaxis: {
                        title: 'Competencies'
                    },
                    yaxis: {
                        title: 'Score',
                        range: [0, 5]
                    }
                };

                Plotly.newPlot('competency-chart-container', competencyData, competencyLayout);

                // Prepare data for bucket scores graph
                const bucketNames = student.bucketScores.map(bucket => bucket.bucketName);
                const bucketScores = student.bucketScores.map(bucket => {
                    // Calculate the average score for each bucket
                    const averageScore = bucket.scores.reduce((sum, score) => sum + parseFloat(score), 0) / bucket.scores.length;
                    return averageScore;
                });

                // Plot bucket scores graph
                const bucketData = [{
                    x: bucketNames,
                    y: bucketScores,
                    type: 'bar',
                    marker: {
                        color: '#ff7f0e'
                    }
                }];

                const bucketLayout = {
                    title: 'Student Bucket Scores',
                    xaxis: {
                        title: 'Buckets'
                    },
                    yaxis: {
                        title: 'Score',
                        range: [0, 5]
                    }
                };

                Plotly.newPlot('bucket-chart-container', bucketData, bucketLayout);
            } else {
                console.error('Student not found.');
            }
        } else {
            console.error('Full student list not found in Chrome Storage or searchedStudentId is null.');
        }
    });
});
