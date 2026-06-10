import Dashboard from "./js/Dashboard.js";


const dashboard = 
new Dashboard("#dashboard");



document
.querySelector("#todoBtn")
.onclick = () => {

dashboard.addWidget("todo");

};



document
.querySelector("#notesBtn")
.onclick = () => {

dashboard.addWidget("notes");

};



document
.querySelector("#quoteBtn")
.onclick = () => {

dashboard.addWidget("quote");

};



document
.querySelector("#weatherBtn")
.onclick = () => {

dashboard.addWidget("weather");

};



document
.querySelector("#newsBtn")
.onclick = () => {

dashboard.addWidget("news");

};





document
.querySelector("#startBtn")
.onclick = () => {


document
.querySelector("#welcome")
.style.display = "none";


document
.querySelector("#dashboardHeader")
.style.display = "block";


document
.querySelector("#dashboard")
.style.display = "grid";


};