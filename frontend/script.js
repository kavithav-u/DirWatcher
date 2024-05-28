document.addEventListener('DOMContentLoaded', () => {
    const taskRunsTable = document.getElementById('taskRunsTable').getElementsByTagName('tbody')[0];
    const configForm = document.getElementById('configForm');

    // Fetch and display task runs
    fetch('/api/task/runs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            taskRunsTable.innerHTML = '';  // Clear the table before adding new rows
            console.log(data,"data")
            if (data.taskRuns) {
                console.log(data.taskRuns,"taskruns")
                data.taskRuns.forEach(run => {
                    const row = taskRunsTable.insertRow();
                    row.insertCell(0).innerText = run._id || 'N/A';
                    row.insertCell(1).innerText = new Date(run.start_time).toLocaleString() || 'N/A';
                    row.insertCell(2).innerText = new Date(run.end_time).toLocaleString() || 'N/A';
                    row.insertCell(3).innerText = run.status || 'N/A';
                    row.insertCell(4).innerText = run.magic_string_count|| 'N/A';
                });
            }
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
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error('Error updating configuration:', error));
    });
});
