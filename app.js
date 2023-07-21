document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:5500/api/data')
        .then(response => response.json())
        .then(data => {
            // Call functions to create charts, heatmap, and table using Chart.js, Plotly.js, and Tabulator
            createChart('chart1', data.labels, data.values1, 'Chart 1');
            createChart('chart2', data.labels, data.values2, 'Chart 2');
            createHeatmap(data.correlationMatrix);
            createTable(data.summaryStats);
        })
        .catch(error => console.log(error));
});

function createChart(id, labels, data, title) {
    // Your existing chart creation code here...
}

function updateChart(id, data) {
    // Your existing chart update code here...
}

function createHeatmap(correlationMatrix) {
    // Plotly heatmap configuration
    const heatmapData = [{
        z: correlationMatrix,
        x: Object.keys(correlationMatrix),
        y: Object.keys(correlationMatrix),
        type: 'heatmap',
        colorscale: 'Viridis'
    }];

    const layout = {
        title: 'Correlation Matrix Heatmap',
        height: 500,
        width: 600
    };

    Plotly.newPlot('heatmap', heatmapData, layout);
}

function createTable(summaryStats) {
    // Tabulator configuration to create the table
    var table = new Tabulator("#summaryTable", {
        data: summaryStats,
        layout: "fitColumns",
        columns: [
            { title: "Column Name", field: "Column Name" },
            { title: "Mean", field: "Mean" },
            { title: "Standard Deviation", field: "Standard Deviation" }
            // Add more columns if needed
        ]
    });
}
