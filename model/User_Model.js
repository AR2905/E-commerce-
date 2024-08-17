const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default:'user' },
  addresses: { type: [Schema.Types.Mixed] }, 
  // TODO:  We can make a separate Schema for this
  name: { type: String },
  salt: Buffer
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});


const User = new mongoose.model('User', userSchema);
module.exports = User 
