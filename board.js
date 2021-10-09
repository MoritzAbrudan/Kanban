let currentDraggedElement;

/**
 * lädt Array runter und erstellt Tasks fürs Board 
 */
async function updateBoard(){
    await loadFromBackend();
    filterTasks();
}

/**
 * Schleife, um alle Tasks auf dem Board wiederzugeben
 * @param {string} category
 * @param {array} filteredArray
 */
function createTasks(filteredArray, category) {
    for (let i = 0; i < filteredArray.length; i++) {
        let element = filteredArray[i];
        let color = chooseColor(element);                
        document.getElementById(category).innerHTML += generateElement(element, color);
    }
}

/**
 * @param {*} id individuelle Nummer einer Task
 */
function startDragging(id) {

    allTasks.forEach(task => {
        if (task['id'] == id) {
            currentDraggedElement = allTasks.indexOf(task)
        }
    });
}

/**
 * erstellt Board-Task als HTML
 * @param {string} color
 * @param {array} array
 */
 function generateElement(array, color) {
    return `
    <div draggable="true" ondragstart="startDragging(${array['id']})" class="boardItem ${color}">
        <div class="row">
            <div>
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
            <div><img class="bin" src="img/bin.png" onclick="deleteTask(${array['id']})"></img></div>
        </div>
    </div>
    `;
    
}

/**
 * löscht eine Task nach id und aktualisiert Board
 * @param {*} id individuelle Nummer einer Task
 */
async function deleteTask(id){
    let index;
    allTasks.forEach(task => {
        if (task['id'] == id) {
            index = allTasks.indexOf(task);
            allTasks.splice(index, 1);
        }
    });
    filterTasks();
    saveArrayInBackend();
}

/**
 * filtert die Tasks nach Status
 */
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

/**
 * ändert Status einer Task
 * @param {string} status individuelle Nummer einer Task
 */
function moveTo(status){
    allTasks[currentDraggedElement]['status'] = status;
    filterTasks();
    saveArrayInBackend();
}