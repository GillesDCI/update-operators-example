const express = require('express');
const User = require('../models/User');

const router = express.Router();

//List of all the users 
router.get('/', async (req,res) => {

    const users = await User.find({})//.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
});

//creating a new user 
router.post('/add',async (req, res) => {
    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username
        })
        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
});

router.patch('/favorites/add/one/:id', async (req,res) => {

    const {favorite} = req.body;

    try {
        //add value to array at all times
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$push:{ favorites:favorite }}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});

router.patch('/favorites/add/multiple/:id', async (req,res) => {

    let {favorites} = req.body;

    const favoritesArray = favorites.split(',');
    try {
        //add value to array at all times multiple using an array and the $each operator
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$push:{ favorites:{$each:favoritesArray}}}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});

router.patch('/favorites/add/one/unique/:id', async (req,res) => {

    const {favorite} = req.body;

    try {
        //add value to array only if the value does not already exist in the array. 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$addToSet:{ favorites:favorite }}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});

router.patch('/favorites/remove/one/:id', async (req,res) => {

    const {favorite} = req.body;

    try {
        //$pop with -1 removes the first value of the array 
        //$pop with 1 removes the last value of the array
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$pop:{ favorites:1 }}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});

router.patch('/update/:id', async (req,res) => {

    const {username} = req.body;

    try {
        //$sets the item (is already default behaviour)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username:username}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});

router.patch('/update/removefield/:id', async (req,res) => {

    const {username} = req.body;

    try {
        //$unset removes the field from the document
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$unset:{ username:""}}, {new:true})

        if(!updatedUser) return res.status(404).json({message:'User not found'})
         
        return res.status(200).json({message:'User was updated', createdUser:updatedUser})


    } catch (error) {
        console.log("the error is", error)
        return res.status(400).json({message:'Error happened', error})
    }
});



module.exports = router;