// MongoDB initialization script
db = db.getSiblingDB('tracksys');

// Create collections
db.createCollection('sessions');


// Insert sample data if needed
db.production_data.insertOne({
    timestamp: new Date(),
    type: 'initialization',
    message: 'Database initialized successfully'
});

print('MongoDB initialization completed'); 