// Fetch data and create the bar chart on page load
document.addEventListener("DOMContentLoaded", () => {
  d3.json("project_data.json")
    .then(data => {
      // Perform data manipulation to get total cost per location and major type
      var locationMajorTypeSum = {};
      data.forEach(d => {
        var location = d.Location;
        var majorType = d.MajorType;
        var cost = d.Cost;
        if (majorType === "Water" || majorType === "Electric" || majorType === "Gas") {
          if (!locationMajorTypeSum[location]) {
            locationMajorTypeSum[location] = { Water: 0, Electric: 0, Gas: 0 };
          }
          locationMajorTypeSum[location][majorType] += cost;
        }
      });

      // Function to update the bar chart based on the selected year
      function updateChart(selectedYear) {
        var filteredData = data;
        if (selectedYear !== "all") {
          // Filter the data for the selected year
          filteredData = data.filter(d => d.RYear === parseInt(selectedYear));
        }

        //  Get total cost per location and major type
        var locationMajorTypeSumFiltered = {};
        filteredData.forEach(d => {
          var location = d.Location;
          var majorType = d.MajorType;
          var cost = d.Cost;
          if (majorType === "Water" || majorType === "Electric" || majorType === "Gas") {
            if (!locationMajorTypeSumFiltered[location]) {
              locationMajorTypeSumFiltered[location] = { Water: 0, Electric: 0, Gas: 0 };
            }
            locationMajorTypeSumFiltered[location][majorType] += cost;
          }
        });

        // Convert the aggregated data to arrays for Plotly.js
        var locations = Object.keys(locationMajorTypeSumFiltered);
        var majorTypes = ["Water", "Electric", "Gas"];

        // Sort the locations by total cost in descending order
        locations.sort((a, b) => {
          var totalCostA = majorTypes.reduce((acc, majorType) => acc + locationMajorTypeSumFiltered[a][majorType], 0);
          var totalCostB = majorTypes.reduce((acc, majorType) => acc + locationMajorTypeSumFiltered[b][majorType], 0);
          return totalCostB - totalCostA;
        });

        // Take only the top 20 locations
        var top20Locations = locations.slice(0, 20);

        // Filter the dataPlot array to only include the top 20 locations
        var dataPlot = majorTypes.map(majorType => ({
          x: top20Locations,
          y: top20Locations.map(location => locationMajorTypeSumFiltered[location][majorType]),
          type: "bar",
          name: majorType,
          marker: { color: majorType === 'Water' ? 'navyblue' : majorType === 'Electric' ? 'palegreen' : majorType === 'Gas' ? 'darkgray' : 'gray' }
        }));

        // Create the bar chart using Plotly.js
        var layout = {
          title: "Total Cost per Location and Utility Type",
          xaxis: { title: "Location" },
          yaxis: { title: "Total Cost" },
          barmode: "stack"
        };

        Plotly.react("barChart", dataPlot, layout);
      }

      // Function to update the line chart based on the selected Location and MajorType
      function updateLineChart(selectedLocation, selectedMajorType) {
        var filteredData = data;

        // Filter the data based on the selected Location and MajorType
        if (selectedLocation !== "all") {
          filteredData = filteredData.filter(d => d.Location === selectedLocation);
        }
        if (selectedMajorType !== "all") {
          filteredData = filteredData.filter(d => d.MajorType === selectedMajorType);
        }

        // Group the filtered data by year and month and calculate the sum of Units for each combination
        var groupedData = d3.group(filteredData, d => d.RYear, d => d.RMonth);
        var lineData = Array.from(groupedData, ([year, monthData]) => {
          return {
            x: Array.from(monthData, ([month, unitData]) => month),
            y: Array.from(monthData, ([month, unitData]) => unitData.reduce((sum, d) => sum + d.Units, 0)),
            name: year,
            line: { color: year === 2021 ? 'purple' : year === 2022 ? 'crimson' : 'black' }
          };
        });

        // Create the line chart using Plotly.js
        var layout = {
          title: "Year-over-Year Consumption",
          xaxis: { title: "Month" },
          yaxis: { title: "Units" },
        };

        Plotly.react("lineChart", lineData, layout);
      }

      // Initial chart rendering for both bar and line charts
      updateChart("all");
      updateLineChart("all", "all");

      // Add event listener to the dropdown menu for year selection
      var yearDropdown = document.getElementById("yearDropdown");
      yearDropdown.addEventListener("change", function () {
        var selectedYear = yearDropdown.value;
        updateChart(selectedYear);
      });

      // Add event listeners to the dropdown menus for Location and MajorType selection
      var locations = ["all"].concat(Object.keys(locationMajorTypeSum));
      var majorTypes = ["all", "Water", "Electric", "Gas"];
      var locationDropdown = document.getElementById("locationDropdown");
      locations.forEach(location => {
        var option = document.createElement("option");
        option.value = location;
        option.text = location;
        locationDropdown.appendChild(option);
      });

      var majorTypeDropdown = document.getElementById("majorTypeDropdown");
      majorTypeDropdown.addEventListener("change", function () {
        var selectedLocation = locationDropdown.value;
        var selectedMajorType = majorTypeDropdown.value;
        updateLineChart(selectedLocation, selectedMajorType);
      });
    });
});

// Load data from "project_data.json"
d3.json("project_data.json").then(data => {
  // Filter data based on the specified criteria
  var filteredData = data.filter(d => {
    return (
      d.RYear === 2023 &&
      d.RMonth === 4 &&
      d.MajorType === "Water" &&
      d.Units > 100 && d.Units < 2000 &&
      d["unit rate"] > 4 && d["unit rate"] < 20
    );
  });

  // Extract required data for the scatter plot
  var unitRateData = filteredData.map(d => d["unit rate"]);
  var consumptionData = filteredData.map(d => d.Units);
  var locationData = filteredData.map(d => d.Location);

  // Create the scatter plot using Chart.js
  var ctx = document.getElementById("scatterPlot").getContext("2d");
  var scatterChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Water Consumption",
        data: unitRateData.map((unitRate, index) => ({ x: unitRate, y: consumptionData[index], location: locationData[index] })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set color here
        borderColor: 'rgba(75, 192, 192, 1)', // Set color here
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: "Scatter Plot of Unit Rate vs. Consumption (Water)"
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Unit Rate"
          },
          min: 0,
          max: 20
        },
        y: {
          title: {
            display: true,
            text: "Consumption (T-gals)"
          },
          min: 0,
          max: 2000
        }
      },

                
          
      maintainAspectRatio: false,
      responsive: true,
      width: 2000,
      height: 100
      
      plugins: {
        tooltip: {
          callbacks: {
            title: () => "", // Empty title to remove default tooltip title
            label: (tooltipItem) => {
              const dataPoint = tooltipItem.raw;
              const unitRate = dataPoint.x;
              const consumption = dataPoint.y;
              const location = dataPoint.location;
              return `Location: ${location}, Unit Rate: ${unitRate}, Consumption: ${consumption}`;
            }
          }
        }
      }
    }
  });
});
