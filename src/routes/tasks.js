const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 




router.post("/create", async(req, res) => {
    try {
        const task = await Task.create({title: req.body.title});
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "There was a problem trying to create a task" });
    }
});

router.get('/', async(req, res) => {
    try {
        const allTask = await Task.find();
        res.status(200).send(allTask); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to get all tasks'})
    }
});

router.get('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id
        const taskID = await Task.findById(id)
        if (!taskID) {
            res.status(404).send({ message: 'ID not found'})
        } else res.status(200).send(taskID);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to get IDs from the tasks'})
    }    
})

router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const taskComplete = await Task.findById(req.params._id)
        if (!taskComplete) {
            res.status(404).send({ message: 'Task not found'})
        } else {
            taskComplete.completed = true;
            }
        await taskComplete.save();
        res.status(200).send(taskComplete)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem to mark the task as completed'})
    }
})

router.put('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const newTitle = req.body.title;
        const oldTask = await Task.find({title});
        if(oldTask) {
            return res.status(400).send({error: 'This task already exist'});
        }
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json({error: 'Task not found'});
        }
        task.title = newTitle;
        await task.save();
        res.send({data: task, message: 'Title updated'})
    } catch (error) {
            console.error(error);
            res.status(500).json({error:"Error en el servidor"}); 
        }
})

router.delete('/id/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const deletedTask = await Task.findById(id);
        res.send({data:deletedTask, message: 'Task deleted'});
    } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Error en el servidorr'})
    }
})

module.exports = router;