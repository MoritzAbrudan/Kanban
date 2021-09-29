let url = 'http://gruppe-105.developerakademie.net/smallest_backend_ever';
let category = ['toDo', 'testing', 'inProgress', 'done'];
let allTasks = [];


async function updateBoard(){
    await loadFromBackend();
    choosePhase();
}

function choosePhase(){
    createTasks('toDo');
    createTasks('inProgress');
    createTasks('testing');
    createTasks('done');
}



function createTasks(category) {
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i];
        document.getElementById(category).innerHTML += generateElement(allTasks, i);
    }
}


 function generateElement(allTasks, i) {
    return `
    <div class = "boardItem">
        <div class = "boardItemDate">
            ${allTasks[i]['date']}
        </div>
        <div class = "boardItemTitle">
            ${allTasks[i]['title']}
        </div>
        <div class = "boardItemUser">
            ${allTasks[i]['name']}
        </div>   
    </div>
    `
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}