//--------------------------- Theme ---------------------------

let night = document.querySelector(".fa-moon");
let day = document.querySelector(".fa-sun");

document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));

function changeNight() {
    night.classList.add("bs-theme");
    day.classList.remove("bs-theme");
    localStorage.setItem("theme", "dark");
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
}

function changeDay() {
    night.classList.remove("bs-theme");
    day.classList.add("bs-theme");
    localStorage.setItem("theme", "light");
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
}
