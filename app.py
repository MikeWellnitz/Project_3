import csv
from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['project_data']
collection = db['project_data']

#with open('project_data_with_locations.csv', 'r') as csvfile:
    #csvreader = csv.DictReader(csvfile)
    #for row in csvreader:
        #collection.insert_one(row)

# Close the MongoDB connection
#client.close()

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(collection.find({}))
    # Convert ObjectId to string in each document
    serialized_data = []
    for doc in data:
        doc['_id'] = str(doc['_id'])
        serialized_data.append(doc)
    return jsonify(serialized_data)

if __name__ == '__main__':
    app.run(debug=True)