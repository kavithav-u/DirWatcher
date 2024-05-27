const express = require('express');
const TaskRun = require('../models/taskRun');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const taskRuns = await TaskRun.find();
        res.json({ taskRuns });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching task runs' });
    }
});
module.exports = router;
