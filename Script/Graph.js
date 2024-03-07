


const data = [{
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 3, 4, 5],
  type: 'scatter'
}];

const layout = {
  title: 'Simple Line Chart'
};

Plotly.newPlot('chart-container', data, layout);
