const storageName = "tasks"; // magic string
function validateLocalStorage(name) {
    let taskArr = [];
    if (typeof(localStorage[name]) == "undefined") {
        localStorage[name]= JSON.stringify([]);
    } else {
        taskArr= JSON.parse(localStorage[name]);
    }
    return taskArr;
}

export function ListTask() {
    let taskArr =validateLocalStorage(storageName);
    return taskArr;
}

export function SaveTask(input) {
    let taskArr =validateLocalStorage(storageName);
    taskArr.push(input);
    localStorage[storageName] = JSON.stringify(taskArr);
    return taskArr;
}

export function DeleteTask(id) {
    let taskArr = validateLocalStorage(storageName);
    taskArr.splice(taskArr.findIndex(e => e.id == id), 1);
    localStorage[storageName] = JSON.stringify(taskArr);
    return taskArr;
}

export function UpdateTask(id, value) {
    let taskArr = validateLocalStorage(storageName);
    taskArr.map((el,index)=>{
        if(el.id === id){
            taskArr[index] = value;
        }
    })
   
    localStorage[storageName] = JSON.stringify(taskArr);
    return taskArr;
}

export function ClearTask() {
    let taskArr = validateLocalStorage(storageName);
    if (Array.isArray(taskArr)) {
        localStorage[storageName] = JSON.stringify([]);
    }
}