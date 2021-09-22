let allTasks = [{
    "title": "Kanban Board erstellen",
    "category": "Management",
    "description": "Gruppenarbeit bei der Developerakademie",
    "date": "08.10.2021",
    "urgency": "normal",
    "assignedTo": "alle",
}, ];

function clearAll() {
    document.getElementById('addTask').reset();
}

function createTask() {
    allTasks.push({
        title: document.getElementById('title').value,
        //category: document.getElementById('category').value,
        //description: document.getElementById('description').value,
        //date: document.getElementById('date').value,
        //urgency: document.getElementById('urgency').value,
        //assignedTo: document.getElementById('assignedTo').value,
    }, );
}