
let allTasks = [];


async function updateBoard(){
    await loadFromBackend();
    filterTasks();
}


function createTasks(filteredArray, category) {
    for (let i = 0; i < filteredArray.length; i++) {
        let element = filteredArray[i];
        let color = chooseColor(i);
        console.log(generateElement(element, color))
        document.getElementById(category).innerHTML += generateElement(element, color);
        
    }
}


 function generateElement(array, color) {
    return `
    <div class = "boardItem ${color}">
        <div class = "boardItemDate">
            ${array['date']}
        </div>
        <div class = "boardItemTitle">
            ${array['title']}
        </div>
        <div class = "boardItemUser">
            ${array['assignedTo']['name']}
        </div>   
    </div>
    `;
    
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

function filterTasks(){
    let toDo = allTasks.filter(t => t['status'] == 'toDo');
    let inProgress = allTasks.filter(t => t['status'] == 'inProgress');
    let testing = allTasks.filter(t => t['status'] == 'testing');
    let done = allTasks.filter(t => t['status'] == 'done');
    createTasks(toDo,'toDo');
    createTasks(inProgress,'inProgress');
    createTasks(testing,'testing');
    createTasks(done,'done');
}