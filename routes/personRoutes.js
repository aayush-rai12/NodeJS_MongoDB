const express =  require('express');
const router = express.Router();
const Person = require("./../models/Person");
const { json } = require('body-parser');

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    // the request body contains the person data
    const data = req.body;
    // Create a new Person document using the mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get a person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get data with param (if you want to find any specific data)
router.get('/:workType', async(req, res)=>{
  try {
    const workType = req.params.workType;
    if(workType =='chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log('response fateched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid work type'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server error'});
    
  }
});

// Update method (Update person details)
router.put('/:id', async (req, res)=>{
  try {
    const person_id = req.params.id; //Extract the id from the URL perammeter
    const updatedPersonData = req.body; //Updated data for the person

    const response = await Person.findByIdAndUpdate(person_id, updatedPersonData,{
      new: true, // return the updated document
      runValidators:true, // run mongoose validation 

    });
    if(!response){
     return res.status(404).json({error: 'Person Not Found'});
    }
    console.log('data updated');
    res.status(200).json(response);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server error'});
     
  }
});

// delete method
router.delete('/:id', async (req, res)=>{
 
 try{
  const person_Id = req.params.id;
  const response = await Person.findByIdAndDelete(person_Id);
  if(!response){
    return res.status(404).json({error: 'Person nnot found'});
  }
  console.log('data deleted');
  res.status(200).json({message:'Person field successfully delated'});
  
 }catch(error){
  console.log(error);
  res.status(500).json({error: 'Internal server error'});
 } 
})

module.exports = router;