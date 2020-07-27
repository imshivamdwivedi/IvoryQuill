function showHideNav(){
    let button = document.querySelector("button.navbar-toggler");
    let div = document.querySelector("div.navbar-collapse");
    button.classList.toggle("collapsed")
    div.classList.toggle("show");
}