import ToDoWidget from "./ToDoWidget.js";
import NotesWidget from "./NotesWidget.js";
import QuoteWidget from "./QuoteWidget.js";
import WeatherWidget from "./WeatherWidget.js";
import NewsWidget from "./NewsWidget.js";
import StatisticsWidget from "./StatisticsWidget.js";



export default class Dashboard{


constructor(selector){


this.container =
document.querySelector(selector);



this.widgets=[];


}




async addWidget(type){


let widget;



switch(type){


case "todo":

widget =
new ToDoWidget({

title:"Учебные задачи",

id:Date.now()

});

break;




case "notes":

widget =
new NotesWidget({

title:"Заметки",

id:Date.now()

});

break;




case "quote":

widget =
new QuoteWidget({

title:"Мотивация",

id:Date.now()

});

break;




case "weather":

widget =
new WeatherWidget({

title:"Погода",

id:Date.now()

});

break;




case "news":

widget =
new NewsWidget({

title:"Новости",

id:Date.now()

});

break;




case "stats":

widget =
new StatisticsWidget({

title:"Статистика",

id:Date.now(),


getTasks:()=>{


const todo =
this.widgets.find(
item=>item instanceof ToDoWidget
);



return todo
?
todo.tasks
:
[];



}



});

break;


}



this.widgets.push(widget);



const element =
await widget.render();



this.makeDraggable(element);



this.container.append(element);



}






makeDraggable(element){


element.draggable=true;



element.addEventListener(
"dragstart",
()=>{


element.classList.add(
"dragging"
);


}
);



element.addEventListener(
"dragend",
()=>{


element.classList.remove(
"dragging"
);


}
);





element.addEventListener(
"dragover",
event=>{


event.preventDefault();



const dragging =
document.querySelector(
".dragging"
);



if(
dragging &&
dragging!==element
){


const box =
element.getBoundingClientRect();



const offset =
event.clientY-box.top;



if(offset>box.height/2){

element.after(dragging);

}

else{

element.before(dragging);

}



}



}

);



}





removeWidget(id){



const widget =
this.widgets.find(
item=>item.id===id
);



if(widget){


widget.destroy();


this.widgets =
this.widgets.filter(
item=>item!==widget
);


}



}


}