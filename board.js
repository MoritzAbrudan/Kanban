let url = 'http://gruppe-105.developerakademie.net/smallest_backend_ever';
let allTasks = [];


async function updateBoard(){
    await loadFromBackend();
    createTasks();
}


function createTasks() {
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i];
        let category = allTasks[i]['status'];
        let color = chooseColor(i);
        for (let j = 0; j < allTasks[i]['assignedTo'].length; j++) {                
            document.getElementById(category).innerHTML += generateElement(allTasks, i, color, j);
        }
    }
}


 function generateElement(allTasks, i, color, j) {
    return `
    <div class = "boardItem ${color}">
        <div class = "boardItemDate">
            ${allTasks[i]['date']}
        </div>
        <div class = "boardItemTitle">
            ${allTasks[i]['title']}
        </div>
        <div class = "boardItemUser">
            ${allTasks[i]['assignedTo'][j]['name']}
        </div>   
    </div>
    `
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

function chooseColor(i){    
    if (allTasks[i]['urgency'] == 'Hat Zeit') {
        color = 'green';           
    } else if(allTasks[i]['urgency'] == 'Hoch'){
        color = 'orange';
    } else if(allTasks[i]['urgency'] == 'Sehr Hoch'){
        color = 'red';
    } else{
        color = 'blue';
    };  
    return color;   
};