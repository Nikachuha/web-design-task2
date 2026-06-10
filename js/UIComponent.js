export default class UIComponent {


constructor(config){


this.title = config.title;

this.id = config.id;

this.element = null;

this.listeners = [];


}





createCloseButton(){


const button =
document.createElement("button");



button.textContent = "✕";

button.className = "closeWidget";



button.onclick = () => {


this.destroy();


};



return button;


}






addListener(element,event,handler){


element.addEventListener(
event,
handler
);



this.listeners.push({

element,

event,

handler

});


}







render(){


this.element =
document.createElement("div");


return this.element;


}







destroy(){


this.listeners.forEach(
item=>{


item.element.removeEventListener(

item.event,

item.handler

);


}

);



this.listeners = [];




if(this.element){


this.element.remove();


this.element = null;


}



}







close(){


this.destroy();


}







minimize(){


if(this.element){


this.element.classList.toggle(
"hidden"
);


}


}



}