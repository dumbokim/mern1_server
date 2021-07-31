const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends')

// must
app.use(cors());
app.use(express.json())


// Database connection
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false", 
  {useNewUrlParser: true}
);

// Sending Data from Front-End 
app.post('/addfriend', async (req, res) => {
  
  // body means data object
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({name: name, age: age});

  // use async to avoid error (wait until const friend rendered)
  await friend.save();
  res.send(friend);

  /*
  // Sending specific Data

  const friend = new FriendModel({name:"Jessica", age:28});

  // use async to avoid error (wait until const friend rendered)
  await friend.save();
  res.send('Inserted Data');
  */
})


// Reading Data
app.get('/read', (req, res) => {
  FriendModel.find({}, (err, result) => {
    if(err) res.send(err);
    else res.send(result);
  });
})


// Update age with getting id and age from Front-End
app.put('/update', async (req, res) => {

  const newAge = req.body.newAge;
  const id = req.body.id;
  
  try {
    await FriendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    })
  } catch(err) {
    console.log(err);
  }

  res.send('updated');

})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await FriendModel.findByIdAndRemove(id).exec()
  res.send('item deleted')
})

// Server Port
app.listen(8000, () => {
  console.log('you are connected');
})