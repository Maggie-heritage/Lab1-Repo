
import "../css/styles.css";

import layoutTemplate from "../hbs/layout.hbs";
import PageController from "./pageController.js";

const app = document.getElementById("app");

let menu;

app.innerHTML = layoutTemplate({ "title": "lab 5 " });
let nav = app.querySelector("nav");
let main = app.querySelector("main");
let component = app.querySelector("#component");
let pagesPromise = fetch("api/pages.json").then(function (response) {
    return response.json();
});


let libraryPromise = fetch("api/library.json").then(function (response) {
    return response.json();
});



/*

{
    shoes:{data:result[1]},
    links:{}
}

*/


Promise.all([pagesPromise, libraryPromise]).then(result => {
    menu = new PageController(result[0], main, nav, component,
        {
            "libraries": {
                "data": result[1]
            }
        }
    );
    render(result[1]);
});

let render = function (shoes) {

    menu.initMenu();


}