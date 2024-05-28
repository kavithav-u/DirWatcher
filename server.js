const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const DirWatcher = require('./dirWatcher');
const configRoutes = require('./routes/config');
const taskRoutes = require('./routes/task');
const taskRunsRoutes = require('./routes/taskRuns');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const dirWatcher = new DirWatcher('./watched_directory', 'MAGIC_STRING', '*/1 * * * *');

app.use('/api/config', configRoutes(dirWatcher));
app.use('/api/task', taskRoutes(dirWatcher));
app.use('/api/task/runs', taskRunsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dirWatcher.startWatching();
});
