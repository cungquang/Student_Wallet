const {asnSchema} = require('../models/asn.model');
const {getDB} = require('../../db');

const getAsnAll = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('assignments').find()
        res.status(201).json(result);
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving assignments: ", error.message)
        })
    }
}
const getUserAsnAll = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('assignments').find({uid: req.uid})
        res.status(201).json(result);
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving assignments: ", error.message)
        })
    }
}

const createAsn = async (req, res) =>{
    try{
        const db = getDB();
        const newAsnData = {...req.body};
        const result = await db.collection('assignments').insertOne(newAsnData);
        res.status(201).json(result.ops[0]);
    } catch (error){
        res.status(400).json({
            message: ("Error while creating the assignment: ", error.message)
        })
    }
}

const deleteAsn = async(req, res) =>{
    try{
        const db = getDB();
        await db.collection('assignments').deleteOne(req.body._id);
        res.status(201).json({message: ("Assignment deleted: ", req.body.title)});
    } catch (error){
        res.status(400).json({
            message: ("Error while deleting the assignment: ", error.message)
        })
}}

const updateAsn = async (req, res)=>{
    try{
        const db = getDB();
        await db.collection('assignments').upodateOne(...req.body);
        res.status(201).json({message: ("Assignment updated: ", req.body.title)});
    } catch (error){
        res.status(400).json({
            message: ("Error while updating the assignment: ", error.message)
        })
}}

module.exports = {
    getAsnAll,
    getUserAsnAll,
    createAsn,
    deleteAsn,
    updateAsn
}