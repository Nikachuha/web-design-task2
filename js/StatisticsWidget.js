import UIComponent from "./UIComponent.js";


export default class StatisticsWidget extends UIComponent{


constructor(config){

super(config);

this.getTasks =
config.getTasks;


}



render(){


this.element =
document.createElement("div");


this.element.className =
"widget stats";


this.element.innerHTML=`

<div class="widgetHeader">

<h2>${this.title}</h2>

</div>


<div class="statNumber">
0%
</div>


<p>
Выполнено задач
</p>

`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);



this.update();



return this.element;


}




update(){


const tasks =
this.getTasks();



const done =
tasks.filter(
task=>task.completed
).length;



const percent =
tasks.length
?
Math.round(
(done/tasks.length)*100
)
:
0;



this.element
.querySelector(".statNumber")
.textContent =
percent+"%";


}



}