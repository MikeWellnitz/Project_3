# Project 3 - Understanding Utility Usage of Multi-Family Housing in the United States

Team members: Navyasri Pusuluri, Kirsten Rain, Crystal Rosenbrook, Mark Waananen, Mike Wellnitz  

## Project Requirements:

1.  Your visualization must include a Python Flask-powered API, HTML/CSS, JavaScript, and at 
    least one database (SQL, MongoDB, SQLite, etc.). 
2.   Your project should fall into one of the below tracks:
      * A combination of web scraping and Leaflet or Plotly
      * A dashboard page with multiple charts that update from the same data
      * A “thick” server that performs multiple manipulations on data in a database prior to 
        visualization (must be approved) 
3.   Your project should include at least one JS library that we did not cover.
4.   Your project must be powered by a dataset with at least 100 records.
5.   Your project must include some level of user-driven interaction, such as menus, dropdowns, 
     and textboxes.
6.   If possible, your final visualization should include at least three views.

## Table of Contents

- [Inspiration](#inspiration)
- [Project Description](#project-description)
- [Dataset Overview](#dataset-overview)
- [Data Cleaning and Storage](#data-cleaning-and-storage)
- [Software, Languages, and Libraries](#software-languages-and-libraries)
- [Final Visualizations](#final-visualizations)
- [Further Tasks, Questions, and Research](#further-tasks-questions-and-research)
- [contributing Team Members](#contributing-team-members)
- [Acknowledgements](#acknowledgements)


## Inspiration

The launching point of this project was inspired by taking an actual project proposed to a group member's employer and seeing if we could replace an outdated platform (what is/was the name of this platform) for less time and money than a million dollar development team. The data provided to us was meant to only be dissected _____________________, and we wanted to show that it could be presented in a much better way. The motivation behind this project was to see if we could  

## Project Description

The application is a data visualization tool for energy usage data. It fetches data from a backend API and displays the information using different types of charts, such as line charts, bar charts, and a scatter plot. The data can be filtered by year (2021, 2022, 2023, all), location, and utility types (Water, Gas, and Electric) using dropdown menus. The goal is for a user to be able to visually find trends in the data so that areas of concern can be addressed, like high costs and where to focus conservation efforts. 

## Dataset Overview

Our dataset was derived from an MS Excel file (project_data_with_locations.xlsx) containing the monthly costs and utility usage of ______________________ (apartments/homes/residences/dwellings/apartments/multifamily housing units). The actual names of the residences were substituted with a randomly assigned named to keep the data anonymous. All data gathered is from the years 2021-2023 and is listed as the monthly utility charges and usage for each multifamily building. 

## Data Cleaning and Storage

The Excel file was loaded and cleaned using Jupyter Notebook. This cleaned dataframe was then loaded into MongoDB so that it could then be imported into Flask to be used interactively in conjunction with GitHub Pages. 

## Software, Languages, and Libraries
This application uses Python, Flask, MongoDB, JavaScript, and HTML/CSS. Python with Flask is used to create an API endpoint to serve the data. MongoDB is used for storing and retrieving the data. JavaScript is used to fetch the data from the API, manipulate it, and render the charts. HTML/CSS is used for the structure and style of the webpage.
The backend uses Python with Flask to create an API. The endpoint "/api/data" responds to GET requests with the data from MongoDB. The data is retrieved from MongoDB, with each document's '_id' field being converted to a string before being sent to the client.
The frontend uses JavaScript along with d3.js, Plotly.js, and Chart.js libraries for data manipulation and visualization. When the page loads, it fetches the data from the API, manipulates it as necessary, and then creates the visualizations.
    Full Listing:
* Excel
* Jupyter Notebook
* Numpy
* Pandas
* MongoDB
* PyMongo
* BSON
* MongoDB
* D3.js
* HTML/CSS
* JavaScript
* jQuery
* Plotly
* Chart.js
* Flask
* GitHub Pages

## Final Visualizations
The Line Chart and Bar Chart interaction can be done by using the dropdown menus at the top of the screen. The year dropdown menu filters the bar chart by the selected year. The location and utility type dropdown menus filter the line chart by the selected location and utility type.
The value in the Scatterplot helps easily show the cost of water vs water consumption. Units with high cost and high consumption can then be addressed. 

## Further Tasks, Questions, and Research
Some additional items that could be addressed:
* Does the unit cost vary by geography? We would have liked to do a map with unit rate as the dot size. Unfortunately when the data was deidentified, we only kept the zipcode for each location and it would require more steps to map it.
* Is each location meeting their consumption per bedroom count benchmark? This is an important question for the client, but for this project it would just be another bar and line graph so we didn’t prioritize it.
* How much is spent on stormwater? Clients pay many tens of thousands of dollars per month on stormwater fees that are based on blacktop square footage and this cost can be mitigated with rain gardens. Unfortunately, due to the unexpected aggravation and complexity of our 150,000 rows of data, storm water was remove. It doesn’t have a unit of measure so it would have really muddied the results. 

## Contributing Team Members
* Navyasri Pusuluri
* Kirsten Rain
* Crystal Rosenbrook
* Mark Waananen
* Mike Wellnitz

## Acknowledgements
Special thanks to our Bootcamp Instructor, TAs, AskBCS, and Tutors for all the guidance and knowledge they passed on to us for this project over the course of the past 17 weeks. A very special thanks to ChatGPT (Chet) for also assisting and recommending fixes to coding discrepancies.









