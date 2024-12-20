const express =  require('express');
const router = express.Router();
const MenuItems = require("../models/MenuItem");

// POST route to add a person
router.post('/', async (req, res)=>{
  try {
    // request body contains MenuItem data
    const data = req.body;
     // Create a new Person document unsing the mongoose model
     const newMenuItem = new MenuItems(data);
    // save the menu item to the database
    const response = await newMenuItem.save();
    console.log('Menu item saved');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'INTERNAl SERVER ERROR'});
    
  }
});

// get the menu data's
router.get('/', async (req, res)=>{
  try {
    const data = await MenuItems.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// get data with param
router.get('/:tasteType', async(req, res)=>{
  try {
    const tasteType = req.params.tasteType;
    if(tasteType =='sweet' || tasteType == 'Mango' || tasteType == 'Sugar'){
      const response = await MenuItems.find({taste: tasteType});
      console.log('response fateched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid taste type'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server error'});
    
  }
});

// Update the menu_item details 
router.put('/:id', async (req, res) => {
  try {
    const menuItem_id = req.params.id; // Extract the id from the URL perammeter 
    const updatedMenuItemData = req.body; // Updated data for the MenuItem
    const response = await MenuItems.findByIdAndUpdate(menuItem_id, updatedMenuItemData,{
      new: true, // return the updated document
      runValidators:true, // run mongoose validation 
    });
    if(!response){
      return res.status(404).json({error: 'MenuItem Not Found'});
    }
    console.log('data updated');
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server error'});
  }
});

// delete method to delete the menu item
router.delete('/:id', async (req, res)=>{
  try{
  const menuItem_id = req.params.id; //Extract the id from the URL perammeter
  const response =  await MenuItems.findByIdAndDelete(menuItem_id);
  if(!response){
    return res.status(404).json({eoor: 'Invalid menuItem Id'});
  }
  console.log('data deleted');
  res.status(200).json({message:'menuItem field successfully delated'});
  
 }catch(error){
  console.log(error);
  res.status(500).json({error: 'Internal server error'});
 } 
})

module.exports = router;