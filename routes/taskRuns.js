const express = require('express');
const TaskRun = require('../models/taskRun');

const router = express.Router();

router.get('/', async (req, res) => {
    const taskRuns = await TaskRun.find();
    res.json(taskRuns);
});

module.exports = router;
