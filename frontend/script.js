document.addEventListener('DOMContentLoaded', () => {
    const taskRunsTable = document.getElementById('taskRunsTable').getElementsByTagName('tbody')[0];
    const configForm = document.getElementById('configForm');

    // Fetch and display task runs
    fetch('/api/task/runs')
        .then(response => response.json())
        .then(data => {
            data.taskRuns.forEach(run => {
                const row = taskRunsTable.insertRow();
                row.insertCell(0).innerText = run.id;
                row.insertCell(1).innerText = new Date(run.startTime).toLocaleString();
                row.insertCell(2).innerText = new Date(run.endTime).toLocaleString();
                row.insertCell(3).innerText = run.status;
                row.insertCell(4).innerText = run.fileCount;
                row.insertCell(5).innerText = run.magicCount;
            });
        })
        .catch(error => console.error('Error fetching task runs:', error));

    // Handle configuration form submission
    configForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(configForm);
        const configData = {
            directory: formData.get('directory'),
            interval: formData.get('interval'),
            magicString: formData.get('magicString')
        };

        fetch('/api/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error('Error updating configuration:', error));
    });
