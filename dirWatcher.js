const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const TaskRun = require('./models/taskRun');

class DirWatcher {
    constructor(directory, magicString, interval) {
        this.directory = directory;
        this.magicString = magicString;
        this.interval = interval;
        this.currentTask = null;
        this.prevFiles = new Set();
    }

    startWatching() {
        this.currentTask = schedule.scheduleJob(this.interval, () => this.runTask());
    }

    stopWatching() {
        if (this.currentTask) {
            this.currentTask.cancel();
            this.currentTask = null;
        }
    }

    async runTask() {
        const startTime = new Date();
        let magicStringCount = 0;
        let newFiles = [];
        let deletedFiles = [];
        
        const currentFiles = new Set(fs.readdirSync(this.directory));
        
        for (let file of currentFiles) {
            if (!this.prevFiles.has(file)) newFiles.push(file);
        }
        for (let file of this.prevFiles) {
            if (!currentFiles.has(file)) deletedFiles.push(file);
        }
        
        for (let file of currentFiles) {
            const filePath = path.join(this.directory, file);
            const contents = fs.readFileSync(filePath, 'utf-8');
            magicStringCount += (contents.match(new RegExp(this.magicString, 'g')) || []).length;
        }
        
        const endTime = new Date();
        const runtime = endTime - startTime;
        const status = 'success';

        const taskRun = new TaskRun({
            start_time: startTime,
            end_time: endTime,
            status: status,
            runtime: runtime,
            magic_string_count: magicStringCount,
            files_added: newFiles,
            files_deleted: deletedFiles
        });

        await taskRun.save();
        this.prevFiles = currentFiles;
    }

    updateConfig(newConfig) {
        if (newConfig.directory) this.directory = newConfig.directory;
        if (newConfig.magicString) this.magicString = newConfig.magicString;
        if (newConfig.interval) {
            this.interval = newConfig.interval;
            this.stopWatching();
            this.startWatching();
        }
    }
}

module.exports = DirWatcher;
