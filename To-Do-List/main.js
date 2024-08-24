let mytask =[];

//inputbox == taskinput

function addTask(){
    const inputBox = document.getElementById("input-box");
    const text = inputBox.value.trim();

    if(text){
        mytask.push({text:text, completed:false});
        inputBox.value="";
        
        updateTaskList();
    }
}

const toggleTaskCompletion = (index) => {
    mytask[index].completed = !mytask[index].completed;
    updateTaskList();
}

const updateTaskList = ()=>{

    const taskList = document.getElementById("task-list");
    taskList.innerHTML='';

    mytask.forEach((task,index)=>{

        const listItem = document.createElement('li');
         listItem.innerHTML=`
          <div class="taskItem">
                <div class="task ${task.completed ? "completed":""}">

                        <input type="checkbox" class="check-box" ${task.completed ? "checked" : ""}/> 
                        <p>${task.text}</p>
                </div>

                <div class="img-item">
                    <img src="images/pen.png" onclick="editTask(${index})"/>
                    <img src="images/delete2.png" onclick="deleteTask(${index})"/>
                </div>
          </div>
         `;


         listItem.addEventListener("change",()=>toggleTaskCompletion(index));
         taskList.append(listItem);
    });
}

const editTask = (index)=>{

    const taskInput = document.getElementById("input-box");
    taskInput.value = mytask[index].text;

    mytask.splice(index,1);
    updateTaskList();
}

const deleteTask = (index)=>{
    mytask.splice(index,1);
    updateTaskList();
}


document.getElementById('newTask').addEventListener('click', function(event){
    event.preventDefault();
    addTask();
}
);













/*

const inputBox = document.getElementById("input-box");
const listBox = document.getElementById("list-box");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write your task!");
    }else{

        //insert items
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listBox.appendChild(li);

        //delete itemns
        let span = document.createElement("span");
        span.innerHTML= "\u00d7" ; // cross icon
        li.appendChild(span);
    }
    inputBox.value="";
}
*/




























