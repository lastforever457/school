//--------------------------- Tabs ---------------------------

let pages = document.querySelector("#pages");

let tab1 = document.querySelector("#students");
let tab2 = document.querySelector("#classes");
let tab3 = document.querySelector("#teachers");

let tabs = [tab1, tab2, tab3];

function changeTabs(num) {
    localStorage.setItem("tab", num);
    displayTab(num);
}

function displayTab(num) {
    tabs.forEach((tab, index) => {
        tab.style.display = index === num - 1 ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let savedTab = localStorage.getItem("tab");
    if (savedTab) {
        displayTab(parseInt(savedTab, 10));
    } else {
        displayTab(1);
    }
});
