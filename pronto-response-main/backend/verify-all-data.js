// Script to verify all collections in MongoDB Atlas
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sdhanush1009_db_user:Dhanush%402005@cluster0.9f0wcxu.mongodb.net/Disaster-Management";

async function verifyAllData() {
  try {
    console.log("🔍 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}\n`);

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Collections found:");
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await mongoose.connection.db.collection(collectionName).countDocuments();
      console.log(`  • ${collectionName}: ${count} document(s)`);
      
      // Show sample data from each collection (first 2 documents)
      if (count > 0) {
        const samples = await mongoose.connection.db.collection(collectionName)
          .find({})
          .limit(2)
          .toArray();
        
        console.log(`    Sample data from ${collectionName}:`);
        samples.forEach((doc, idx) => {
          console.log(`    [${idx + 1}]`, {
            id: doc._id,
            ...Object.keys(doc).slice(0, 5).reduce((obj, key) => {
              if (key !== '_id' && key !== 'password' && key !== '__v') {
                obj[key] = doc[key];
              }
              return obj;
            }, {})
          });
        });
        console.log();
      }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 SUMMARY:");
    console.log("=".repeat(50));
    const totalDocs = await Promise.all(
      collections.map(c => mongoose.connection.db.collection(c.name).countDocuments())
    );
    const sum = totalDocs.reduce((a, b) => a + b, 0);
    console.log(`✅ Total collections: ${collections.length}`);
    console.log(`✅ Total documents: ${sum}`);
    console.log(`✅ All data is being stored in MongoDB Atlas!`);
    console.log("=".repeat(50));

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB Atlas");
  }
}

verifyAllData();
