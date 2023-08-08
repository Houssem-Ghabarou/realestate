#!/bin/bash

# Set variables
DB_NAME="my_database"
DB_FOLDER="C:/data"
DB_DATA_FOLDER="${DB_FOLDER}/db"
SECURITY_KEY_FILE="${DB_FOLDER}/security.key"
CONFIG_FILE="${DB_FOLDER}/mongod.conf"
LOG_FILE="${DB_FOLDER}/mongod.log"

# Create database folder
mkdir -p "${DB_DATA_FOLDER}"

# Generate security key
openssl rand -base64 741 > "${SECURITY_KEY_FILE}"

# Set permissions on security key file
chmod 600 "${SECURITY_KEY_FILE}"

# Create MongoDB configuration file
cat <<EOF > "${CONFIG_FILE}"
# MongoDB Configuration File

# Enable replication
replication:
  replSetName: rs0

# Configure the storage engine
storage:
  dbPath: "${DB_DATA_FOLDER}"
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1
      journalCompressor: snappy
    collectionConfig:
      blockCompressor: snappy
    indexConfig:
      prefixCompression: true

# Bind to all network interfaces
net:
  bindIp: 0.0.0.0
  port: 27017
  ipv6: true



EOF

# Start MongoDB server with the configuration file 
mongod  --replSet rs0 --config "${CONFIG_FILE}" &

# Wait for MongoDB to start up
sleep 5

# Connect to MongoDB and create replica set
mongosh   --port 27017 --eval 'rs.initiate()'

# Wait for replica set initialization to complete
sleep 5

