import UIComponent from "./UIComponent.js";


export default class ToDoWidget extends UIComponent{


constructor(config){

super(config);


this.tasks =
JSON.parse(
localStorage.getItem("tasks")
)
|| [];


}



save(){

localStorage.setItem(
"tasks",
JSON.stringify(this.tasks)
);

}



render(){


this.element =
document.createElement("div");


this.element.className="widget";


this.element.innerHTML=`

<div class="widgetHeader">

<h2>${this.title}</h2>

</div>


<input 
class="taskInput"
placeholder="Введите задачу">


<button class="addBtn">
Добавить
</button>


<ul></ul>

`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);



const input =
this.element.querySelector(".taskInput");


const add =
this.element.querySelector(".addBtn");


const list =
this.element.querySelector("ul");



add.onclick=()=>{


if(input.value.trim()){


this.tasks.push({

text:input.value,

completed:false

});


this.save();


input.value="";


this.update(list);


}


};



this.update(list);



return this.element;


}




update(list){


list.innerHTML="";



this.tasks.forEach((task,index)=>{


const li =
document.createElement("li");



const checkbox =
document.createElement("input");


checkbox.type="checkbox";


checkbox.checked =
task.completed;



checkbox.onchange=()=>{


task.completed =
checkbox.checked;


this.save();



li.classList.toggle(
"done",
task.completed
);


};



const text =
document.createElement("span");


text.textContent =
task.text;



const remove =
document.createElement("button");


remove.textContent="Удалить";


remove.onclick=()=>{


this.tasks.splice(index,1);


this.save();


this.update(list);


};



li.append(
checkbox,
text,
remove
);



if(task.completed){

li.classList.add("done");

}



list.append(li);



});


}



}