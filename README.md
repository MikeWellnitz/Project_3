# Project 3 - Utility Consumption

Team members: Navyasri Pusuluri, Kirsten Rain, Crystal Rosenbrook, Mark Waananen, Mike Wellnitz  

# Project Requirements:

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

# Table of Contents

- [Inspiration](#inspiration)
- [Project Description](#project-description)
- [Dataset Overview](#dataset-overview)
- [Data Cleaning and Storage](#data-cleaning-and-storage)
- [Software, Languages, and Libraries](#software-languages-and-libraries)


# Inspiration

The launching point of this project was inspired by taking an actual project proposed to a group member's employer and seeing if we could present the data interactively and visually. The data provided to us was meant to only be dissected _____________________, and we wanted to show that it could be presented in a much better way.

# Project Description

The application is a data visualization tool for energy usage data. It fetches data from a backend API and displays the information using different types of charts, such as line charts, bar charts, and a scatter plot. The data can be filtered by year (2021, 2022, 2023, all), location, and utility types (Water, Gas, and Electric) using dropdown menus. The goal is for a user to be able to visually find trends in the data so that areas of concern can be addressed, like high costs and where to focus conservation efforts. 

# Dataset Overview

Our dataset was derived from an MS Excel file (project_data_with_locations.xlsx) containing the monthly costs and utility usage of ______________________ (apartments/homes/residences/dwellings/apartments/multifamily housing units). The actual names of the residences were substituted with a randomly assigned named to keep the data anonymous. All data gathered is from the years 2021-2023 and is listed as the monthly utility charges and usage for each multifamily building. 

# Data Cleaning and Storage

The Excel file was loaded and cleaned using Jupyter Notebook. This cleaned dataframe was then loaded into MongoDB so that it could then be imported into Flask to be used interactively in conjunction with GitHub Pages. 

# Software, Languages, and Libraries

* Excel
* Jupyter Notebook
*
*
* MongoDB
* PyMongo
* BSON
* MongoDB
* D3.js
* HTML
* JavaScript
* jQuery
* Plotly
* Chart.js







