import menuView from "../hbs/menuView.hbs";
import pageView from "../hbs/pageView.hbs";
import librariesTemplate from "../hbs/libraries.hbs";
/* import libraryTemplate from "../hbs/library.hbs"; */

export default class {


    constructor(pages, mainEl, navEl, componentEl, componentData) {
        this.pages = pages;
        this.currentPage = "home";
        this.mainContainer = mainEl;
        this.componentContainer = componentEl;
        this.navContainer = navEl;
        this.navContainer.innerHTML = this.getMenu();
        this.componentData = componentData;
    }

    setCurrentPage(newPage) {
        this.currentPage = newPage;

        let menuItems = this.navContainer.querySelectorAll("li");

        for (let li of menuItems) {
            if (li.dataset.page == newPage) {
                li.classList.add("active-page");
            } else {
                li.classList.remove("active-page");
            }
        }

        this.mainContainer.innerHTML = this.getPage();
        let component = this.pages[this.currentPage].component;
        if (component !== undefined) {
            if (component === "libraries") {
                if (this.componentData["libraries"] !== undefined &&
                    this.componentData["libraries"].data !== undefined) {
                    let libraryData = this.componentData["libraries"].data;
                    //console.log(libraryData);
                    this.componentContainer.innerHTML = librariesTemplate(libraryData);
                }
            }
        } else {
            this.componentContainer.innerHTML = "";
        }

        let links = this.mainContainer.querySelectorAll(".site-link");

        for (let el of links) {
            el.onclick = () => {
                this.setCurrentPage(el.dataset.link);
            }
        }
    }

    getMenu() {

        for (let page of Object.keys(this.pages)) {
            this.pages[page].isActive = page == this.currentPage ? true : false;
        }

        //console.log(this.pages);
        return menuView({ "page": this.currentPage, "pages": this.pages });
    }
    initMenu() {
        let links = this.navContainer.querySelectorAll("li");
        for (let link of links) {
            let me = this;
            link.onclick = function () {
                //console.log(this.dataset.page);
                me.setCurrentPage(this.dataset.page);


            };
        }
        this.setCurrentPage("home");
        //this.mainContainer.innerHTML = this.getPage("home");
    }
    getPage() {
        return pageView(this.pages[this.currentPage]);
    }

}