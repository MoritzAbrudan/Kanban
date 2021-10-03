let currentDraggedElement;


async function updateBoard(){
    await loadFromBackend();
    filterTasks();
}


function createTasks(filteredArray, category) {
    for (let i = 0; i < filteredArray.length; i++) {
        let element = filteredArray[i];
        let color = chooseColor(element);                
        document.getElementById(category).innerHTML += generateElement(element, color, i);
    }
}

function startDragging(description) {

    allTasks.forEach(task => {
        if (task['description'] == description) {
            currentDraggedElement = allTasks.indexOf(task)
        }
    });
}

 function generateElement(array, color, i) {
    return `
    <div draggable="true" ondragstart="startDragging('${array['description']}')" class="boardItem ${color}">
        <div class="row">
            <div>
                <div class = "boardItemDate">
                    ${array['date']}
                </div>
                <div class = "boardItemTitle">
                    ${array['title']}
                </div>
                <div class = "boardItemUser">
                    ${array['assignedTo'][0]['name']}
                </div> 
            </div>
            <div><img class="bin" src="img/bin.png" onclick="deleteTask('${array['description']}')"></img></div>
        </div>
    </div>
    `;
    
}

async function deleteTask(description){
     
    let index;
    allTasks.forEach(task => {
        if (task['description'] == description) {
            index = allTasks.indexOf(task);
            allTasks.splice(index, 1);
        }
    });
    filterTasks();
}

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

function moveTo(status){
    allTasks[currentDraggedElement]['status'] = status;
    filterTasks();
}