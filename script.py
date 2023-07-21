# Import Libraries
import pandas as pd
import sqlite3
import numpy as np
from flask import Flask, jsonify, send_file
from flask_cors import CORS

# Load the Dataframe
df = pd.read_csv('project_data.csv')

# Dataset Cleaning
# Code to drop duplicates in the DataFrame
df = df.drop_duplicates()

# Code to fill missing values with the mean of numeric columns only
numeric_columns = df.select_dtypes(include=np.number).columns
df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

# Dataset Analysis
# Select only numeric columns for correlation matrix calculation
df_numeric = df.select_dtypes(include=np.number)
correlation_matrix = df_numeric.corr()

# Calculate summary statistics
summary_stats = df.describe().to_dict()

# Database Integration
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Drop the existing table if it exists
cursor.execute("DROP TABLE IF EXISTS my_table")

# Create the table with real column headers from the dataset
table_columns = df.columns.tolist()
table_columns_str = ', '.join([f"`{col}` TEXT" for col in table_columns if col != "Index"])
cursor.execute(f"CREATE TABLE IF NOT EXISTS my_table ({table_columns_str})")

# Insert data into the table
data_tuples = [tuple(row[1:]) for row in df.itertuples(index=False)]
columns_for_query = ', '.join([f"`{col}`" for col in df.columns if col != "Index"])
placeholders = ', '.join(['?'] * (len(df.columns) - 1))
insert_query = f"INSERT INTO my_table ({columns_for_query}) VALUES ({placeholders})"
cursor.executemany(insert_query, data_tuples)

conn.commit()
conn.close()

# Python Flask-powered API
app = Flask(__name__)

# Set Content Security Policy
@app.after_request
def set_content_security_policy(response):
    response.headers['Content-Security-Policy'] = "default-src 'none'; font-src 'self' http://127.0.0.1:5500;"
    return response

# Serve CSS file
@app.route('/styles.css')
def serve_css():
    return send_file('styles.css', mimetype='text/css')

# Enable CORS
CORS(app)

# Load the dataset for the API
@app.route('/api/data', methods=['GET'])
def get_data():
    df_api = pd.read_csv('project_data.csv')
    data = df_api.to_dict(orient='records')
    
    # Calculate summary statistics
    summary_stats = df_api.describe().reset_index()
    summary_stats = summary_stats.rename(columns={'index': 'Statistic'})
    summary_stats = summary_stats.melt(id_vars=['Statistic'], var_name='Column', value_name='Value')
    summary_stats = summary_stats.to_dict(orient='records')

    # Calculate correlation matrix
    df_numeric = df_api.select_dtypes(include=np.number)
    correlation_matrix = df_numeric.corr()
    correlation_matrix = correlation_matrix.reset_index()
    correlation_matrix = correlation_matrix.rename(columns={'index': 'Column'})
    correlation_matrix = pd.melt(correlation_matrix, id_vars='Column', var_name='Variable', value_name='Value')
    correlation_matrix = correlation_matrix.to_dict(orient='records')

    # Combine data, correlation_matrix, and summary_stats into a single dictionary
    result = {
        "data": data,
        "correlation_matrix": correlation_matrix,
        "summary_stats": summary_stats
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run()