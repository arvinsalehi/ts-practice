// MongoDB initialization script
db = db.getSiblingDB('tracksys');

// Create collections
db.createCollection('sessions');
db.createCollection('users');
db.createCollection('production_data');

// Create indexes for better performance
db.sessions.createIndex({ "loginId": 1 });
db.sessions.createIndex({ "startTime": 1 });
db.production_data.createIndex({ "timestamp": 1 });

// Insert sample data if needed
db.production_data.insertOne({
    timestamp: new Date(),
    type: 'initialization',
    message: 'Database initialized successfully'
});

print('MongoDB initialization completed'); 