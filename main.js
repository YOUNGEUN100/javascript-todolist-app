//유저는 할일을 추가할 수 있다. v
//각 할일에 삭제와 체크버튼이 있다. v
//삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.v
//체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.v
//끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.v
//탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
//모바일 버전에서도 확인할 수 있는 반응형 웹이다


let taskInput = document.getElementById("tast-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = 'all';
let underLine = document.getElementById("under-line");


//'+' 버튼을 누르면 addTask 함수 이벤트 발생
addButton.addEventListener("click",addTask);

// 키보드 'Enter'를 누르면 addTask 함수 발생 
// html input태크에 onkeyup 으로 직접줌
function enterkey() {
	if (window.event.keyCode == 13) {
    	addTask();
    }
}

// 각각 탭을 클릭하면 이벤트 발생
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event) {filter(event)});
}

// addTask 함수 : 할일을 추가하는 함수
function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList);
    render();
}

// render 함수: 화면에 할일을 보여주는 함수
function render() {
    let list = [];
    if (mode == "all") {
        list = taskList;
    } else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i=0; i<list.length; i++) {
        if (list[i].isComplete) {
        resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
        } else {
        resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

// toggleComplete 함수 : 할일을 끝냈는지 안끝냈는지 구분
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}


// filter 함수 : 할일의 상태를 구분함 (모두/진행중/끝남)
function filter(event) {

    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.bottom = event.currentTarget.offsetBottom + "px";

    mode = event.target.id
    filterList = []; // filterList가 계속 덮어쓰지 않도록 비워주기

    if (mode == "all") {
        render();
    } else if (mode == "ongoing") {
        for (let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
                console.log(filterList);
            }
        }
        render();
    } else if (mode = "done") {
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true) {
                filterList
                filterList.push(taskList[i]);
                console.log(filterList);
            }
        }
        render();
    }  
}


// 랜덤함수 만들기
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 9);
}

// deleteTask 함수 : 할일을 삭제하는 함수
function deleteTask(id) {
    if (mode == "all") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].id == id) {
                taskList.splice(i,1);
                break;
            }
        }
        render();
        console.log(taskList);
    } else if (mode == "ongoing" || mode == "done") {
        for(let i=0; i<filterList.length; i++) {
            if(filterList[i].id == id) {
                filterList.splice(i,1);
                break;
            }  
        }
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].id == id) {
                taskList.splice(i,1);
                break;
            }
        }
    render();
    console.log(filterList);
    }
}