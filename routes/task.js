const express = require('express');

module.exports = (dirWatcher) => {
    const router = express.Router();

    router.post('/start', (req, res) => {
        dirWatcher.startWatching();
        res.json({ message: 'Task started successfully.' });
    });

    router.post('/stop', (req, res) => {
        dirWatcher.stopWatching();
        res.json({ message: 'Task stopped successfully.' });
    });

    return router;
};
