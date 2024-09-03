import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${host}:${port}`;
    this.dbName = database;
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });

    this.connected = false;

    this.client.connect().then(() => {
      this.db = this.client.db(this.dbName);
      this.connected = true;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  isAlive() {
    return this.connected && this.client.topology.isConnected();
  }

  async nbUsers() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
