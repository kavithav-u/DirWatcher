const express = require('express');

module.exports = (dirWatcher) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.json({
            directory: dirWatcher.directory,
            magicString: dirWatcher.magicString,
            interval: dirWatcher.interval
        });
    });

    router.put('/', (req, res) => {
        dirWatcher.updateConfig(req.body);
        res.json({ message: 'Configuration updated successfully.' });
    });

    return router;
};
