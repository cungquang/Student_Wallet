const {asnSchema} = require('../models/asn.model');
const {getDB} = require('../../db');
const { ObjectId } = require('mongodb');


const getAsnAll = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('assignments').find().toArray();
        res.status(200).json({result: result, message: "got all asssignments"});
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving assignments: ", error.message)
        })
    }
}
const getUserAsnAll = async (req, res) => {
    try {
        const db = getDB();
        const uid = req.params.uid; 
        const result = await db.collection('assignments').find({ uid }).toArray();

        if (result.length === 0) {
            const sampleData = [];
            res.status(200).json({ result: sampleData }); 
        } else {
            res.status(200).json({ result });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error while retrieving assignments: " + error.message
        });
    }
};


const createAsn = async (req, res) =>{
    try{
        const db = getDB();
        const newData = {...req.body};
        newData._id = new ObjectId().toHexString();
        newData.uid =req.params.uid;
        await db.collection('assignments').insertOne(newData);
        res.status(201).json({message: "Insert success"});
    } catch (error){
        console.log(error.message);
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
        const updated = req.body.item;
        await db.collection('assignments').updateOne({_id: updated._id}, {$set: {
        title: updated.title,
        done: updated.done,
        subject: updated.subject,
        dueDate: updated.dueDate,
        tag: updated.tag,
            }});
        res.status(201).json({message: ("Assignment updated: "+ req.body.item.title)});
    }
    catch (error){
        console.log(error.message)
        res.status(400).json({
            message: ("Error while updating the assignment: "+ error.message)
        })
}}

module.exports = {
    getAsnAll,
    getUserAsnAll,
    createAsn,
    deleteAsn,
    updateAsn
}