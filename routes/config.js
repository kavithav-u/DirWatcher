const express = require('express');

module.exports = (dirWatcher) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { directory, interval, magicString } = req.body;
        dirWatcher.updateConfig(directory, interval, magicString);
        console.log('POST /api/config called');
        res.json({ message: 'Configuration updated successfully.' });
    });

    router.put('/', (req, res) => {
        dirWatcher.updateConfig(req.body);
        res.json({ message: 'Configuration updated successfully.' });
    });

    return router;
};
