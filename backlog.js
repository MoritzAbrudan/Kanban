/**
 * lädt Array runter und erstellt das Backlog 
 */
async function loadBacklog(){
    await loadFromBackend();
    generateProfile();
}

/**
 * Schleife, um für jede Task und jeden Nutzer einen Eintrag zu erstellen
 */
function generateProfile(){
    let container = document.getElementById('table');
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        let color = chooseColor(element);
        for (let j = 0; j < allTasks[i]['assignedTo'].length; j++) {                
            container.innerHTML += profileAsHTML(color, allTasks, i, j);
        }   
    }
}

/**
 * Gibt das Backlog als HTML wieder
 * @param {string} color 
 * @param {array} allTasks 
 * @param {number} i 
 * @param {number} j 
 */
function profileAsHTML(color, allTasks, i, j){
    return`
    <tr class="table-todo-row">

                    <td id="table-profile" class="${color}">
                        <div class="table-profile-container">
                            <img id="profile-img" src="img/face-women1.jpg">
                            <div class="table-profile-name-email">
                                <div id="profile-name">${allTasks[i]['assignedTo'][j]['name']}</div>
                            <a href="" id="profile-email" class="profile-email">${allTasks[i]['assignedTo'][j]['email']}</a>    
                            </div>
                        </div>                                                      
                    </td>
                        <td id="table-title">${allTasks[i]['title']}</td>
                        <td id="table-category">${allTasks[i]['category']}</td>
                        <td id="table-details">${allTasks[i]['description']}</td>
                </tr>
    `
}