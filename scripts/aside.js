//--------------------------- Aside ---------------------------

let aside = document.querySelector(".aside");
let asideBtn = document.querySelector(".aside-btn");
let isOpen = true;

function asideClick() {
    if (isOpen) {
        isOpen = false;
    } else {
        isOpen = true;
    }

    if (isOpen) {
        asideBtn.classList.remove("fa-angle-left");
        asideBtn.classList.add("fa-angle-right");
        aside.classList.remove("aside");
        aside.classList.add("aside-hide");
    } else {
        asideBtn.classList.add("fa-angle-left");
        asideBtn.classList.remove("fa-angle-right");
        aside.classList.add("aside");
        aside.classList.remove("aside-hide");
    }
}
