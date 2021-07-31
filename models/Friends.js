const mongoose = require('mongoose');

// define Data table types 
const FriendSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }

});

// 
const FriendModel = mongoose.model('friends', FriendSchema);

module.exports = FriendModel;