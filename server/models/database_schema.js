// this file will hold and export the schema for our database
const mongoose = require('mongoose');
// Needed to access process.env
require('dotenv').config();

// const uri = process.env.URI;
const uri =
  'mongodb+srv://dbUser:50MAnty72bFlBdsh@skillswap.irepd3l.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwap';

mongoose
  .connect(uri, {
    // sets the name of the db
    dbName: 'skillswap',
  })
  .then(() => console.log('Connected to mongoDB.'))
  .catch((err) => console.log(`Error connecting to mongoDB: ${err}`));

const Schema = mongoose.Schema;

// required for encryption
const WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

// sets a schema for the 'user' collection
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  try {
    // Create salt using work factor
    const salt = await bcrypt.genSalt(WORK_FACTOR);
    // Save password as hashed version
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    console.log('Error in hashing password!');
    return next({ err });
  }
});

userSchema.statics.verifyPassword = async (password, hashedPassword) => {
  try {
    // Check for matching password
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.log(`Error comparing passwords for verification: ${err}`);
  }
};

// creates a model for the 'user' collection
const User = mongoose.model('user', userSchema);

// sets a schema for the 'profile' collection
const profileSchema = new Schema({
  displayName: { type: String, required: true },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'video',
    },
  ],
  points: { type: Number },
  savedSkills: { type: Array },
});

const Profile = mongoose.model('profile', profileSchema);

// sets a schema for the 'video' collection
const videoSchema = new Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  keywords: [{ type: String }],
});

const Video = mongoose.model('video', videoSchema);

// exports all the models
module.exports = {
  User,
  Profile,
  Video,
};
