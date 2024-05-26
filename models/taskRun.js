const mongoose = require('mongoose');

const taskRunSchema = new mongoose.Schema({
    start_time: Date,
    end_time: Date,
    status: String,
    runtime: Number,
    magic_string_count: Number,
    files_added: [String],
    files_deleted: [String]
});

const TaskRun = mongoose.model('TaskRun', taskRunSchema);

module.exports = TaskRun;