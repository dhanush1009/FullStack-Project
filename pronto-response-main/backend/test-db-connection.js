// Test MongoDB connection and user creation
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./userModel.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Testing MongoDB connection...");
console.log("URI:", MONGODB_URI ? "✅ Found in .env" : "❌ Not found");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected!");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    
    // Test creating a user
    try {
      const testUser = {
        name: "Test User",
        email: "test@example.com",
        password: await bcrypt.hash("test123", 10),
        role: "user"
      };
      
      // Delete if exists
      await User.deleteOne({ email: testUser.email });
      
      // Create new
      const user = new User(testUser);
      await user.save();
      
      console.log("✅ Test user created successfully!");
      console.log("User ID:", user._id);
      
      // Verify it was saved
      const found = await User.findById(user._id);
      console.log("✅ User verified in database:", found.email);
      
      // Clean up
      await User.deleteOne({ email: testUser.email });
      console.log("✅ Test user cleaned up");
      
      process.exit(0);
    } catch (err) {
      console.error("❌ Error creating test user:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
