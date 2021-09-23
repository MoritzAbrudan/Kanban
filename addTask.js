let allTasks = [];

let category = ['Management', 'Marketing', 'Retail', 'Accounting'];
let urgency = ['Very High', 'High', 'Normal', 'Got Time'];

/**
 * 
 * Collection of functions wich are initiated onload
 */
async function init() {
    defineCategory();
    defineUrgency();
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
}

/**
 * 
 * Function for dropdown menu Category
 */
function defineCategory() {
    document.getElementById('category').innerHTML = '';
    for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        document.getElementById('category').innerHTML += `
        <option value="${cat}"></option>
        `;
    };
}

/**
 * 
 * Function for dropdown menu Urgency
 */
function defineUrgency() {
    document.getElementById('urgency').innerHTML = '';
    for (let i = 0; i < urgency.length; i++) {
        const urge = urgency[i];
        document.getElementById('urgency').innerHTML += `
        <option value="${urge}"></option>
        `;
    };
}

/**
 * 
 * saves new task in array onsubmit
 */
function createTask(event) {
    allTasks.push({
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        urgency: document.getElementById('urgency').value,
        //assignedTo: document.getElementById('assignedTo').value,
    }, );
    event.preventDefault();
    backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('addTask').reset();
}