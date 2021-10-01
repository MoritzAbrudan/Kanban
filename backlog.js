let url = 'http://gruppe-105.developerakademie.net/smallest_backend_ever';

async function loadBacklog(){
    await loadFromBackend();
    generateProfile();
}

function generateProfile(){
    let container = document.getElementById('table');
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        let color = chooseColor(i);
        for (let j = 0; j < allTasks[i]['assignedTo'].length; j++) {                
            container.innerHTML += profileAsHTML(color, allTasks, i, j);
        }   
    }
}

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

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}