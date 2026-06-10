import UIComponent from "./UIComponent.js";


export default class NotesWidget extends UIComponent{


constructor(config){

super(config);


this.notes =
JSON.parse(
localStorage.getItem("notes")
)
|| [];


}




save(){

localStorage.setItem(
"notes",
JSON.stringify(this.notes)
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



<textarea
class="noteInput"
placeholder="Введите заметку">
</textarea>



<button class="saveBtn">
Сохранить
</button>



<ul></ul>

`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);



const textarea =
this.element.querySelector(".noteInput");



const button =
this.element.querySelector(".saveBtn");



const list =
this.element.querySelector("ul");





button.onclick=()=>{


if(textarea.value.trim()){


this.notes.push({

text:
textarea.value,

});


this.save();


textarea.value="";


this.update(list);


}



};




this.update(list);



return this.element;


}






update(list){


list.innerHTML="";



this.notes.forEach(
(note,index)=>{



const li =
document.createElement("li");



const text =
document.createElement("span");


text.textContent =
note.text;




const edit =
document.createElement("button");


edit.textContent="✏️";



edit.onclick=()=>{


const edited =
prompt(
"Изменить заметку:",
note.text
);



if(
edited &&
edited.trim()
){


note.text =
edited;


this.save();


this.update(list);


}



};






const remove =
document.createElement("button");


remove.textContent="🗑";



remove.onclick=()=>{


this.notes.splice(
index,
1
);



this.save();



this.update(list);


};





li.append(
text,
edit,
remove
);



list.append(li);



}

);



}



}