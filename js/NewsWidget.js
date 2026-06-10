import UIComponent from "./UIComponent.js";


export default class NewsWidget extends UIComponent{


constructor(config){

super(config);

}




async getNews(){


const response =
await fetch(

"https://api.rss2json.com/v1/api.json?rss_url=https://rssexport.rbc.ru/rbcnews/news/30/full.rss"

);



const data =
await response.json();



return data.items;


}







async render(){



this.element =
document.createElement("div");



this.element.className="widget";



this.element.innerHTML=`

<div class="widgetHeader">


<h2>
📰 ${this.title}
</h2>


</div>



<ul>

Загрузка новостей...

</ul>


`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);





const list =
this.element.querySelector("ul");





try{


const news =
await this.getNews();





list.innerHTML="";





news
.slice(0,5)
.forEach(
item=>{


const li =
document.createElement("li");



const link =
document.createElement("a");



link.textContent =
item.title;



link.href =
item.link;



link.target =
"_blank";



link.style.textDecoration =
"none";



link.style.color =
"inherit";





li.append(link);



list.append(li);



}

);



}



catch{


list.innerHTML =

`
<li>
Не удалось загрузить новости
</li>

`;



}





return this.element;



}



}