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

       // Add a GET route to return current configuration
       router.get('/', (req, res) => {
        const currentConfig = {
            directory: dirWatcher.directory,
            interval: dirWatcher.interval,
            magicString: dirWatcher.magicString
        };
        console.log('GET /api/config called');
        res.json(currentConfig);
    });
    return router;
};
