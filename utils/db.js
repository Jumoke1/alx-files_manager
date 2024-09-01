import { MongoClient } from 'mongodb';
// import { promisify } from 'util';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${host}:${port}`;
    this.dbName = database;
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });

    this.client.connect().then(() => {
      this.db = this.client.db(this.dbName);
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
