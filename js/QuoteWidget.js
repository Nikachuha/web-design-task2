import UIComponent from "./UIComponent.js";


export default class QuoteWidget extends UIComponent{


constructor(config){

super(config);


this.quotes=[

"Учёба открывает новые возможности",

"Каждый день — шаг к цели",

"Знания создают будущее"

];

}



render(){


this.element =
document.createElement("div");


this.element.className="widget";


this.element.innerHTML=`

<div class="widgetHeader">

<h2>${this.title}</h2>

</div>


<p class="quote"></p>


<button class="new">
Новая цитата
</button>


`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);



const text =
this.element.querySelector(".quote");



const update=()=>{


text.textContent =
this.quotes[
Math.floor(
Math.random()*this.quotes.length
)
];


};



update();



this.element
.querySelector(".new")
.onclick=update;



return this.element;


}



}