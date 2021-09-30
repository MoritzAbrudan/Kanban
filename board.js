let currentDraggedElement;
let allTasks = [];


async function updateBoard(){
    await loadFromBackend();
    filterTasks();
}


function createTasks(filteredArray, category) {
    for (let i = 0; i < filteredArray.length; i++) {
        let element = filteredArray[i];
        let color = chooseColor(i);
        for (let j = 0; j < element['assignedTo'].length; j++) {                
            document.getElementById(category).innerHTML += generateElement(element, color, j, i);
        }
        
    }
}

function startDragging(i){
    currentDraggedElement = i;
}

 function generateElement(array, color, j, i) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" class="boardItem ${color}">
        <div class="row">
            <div>
                <div class = "boardItemDate">
                    ${array['date']}
                </div>
                <div class = "boardItemTitle">
                    ${array['title']}
                </div>
                <div class = "boardItemUser">
                    ${array['assignedTo'][j]['name']}
                </div> 
            </div>
            <div><img class="bin" src="img/bin.png" onclick="deleteTask(allTasks, ${i})"></img></div>
        </div>
    </div>
    `;
    
}

async function deleteTask(array, i){
    await array.splice(i, 1);
    filterTasks();
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
    document.getElementById('toDo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('testing').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
    createTasks(toDo,'toDo');
    createTasks(inProgress,'inProgress');
    createTasks(testing,'testing');
    createTasks(done,'done');
}

function allowDrop(ev) {
    ev.preventDefault();
  }

function moveTo(category){
    allTasks[currentDraggedElement]['status'] = category;
    filterTasks();
}