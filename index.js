const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = input.value;

    if (text !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);
        //Obtener el texto de la variable ul y meterlo en localstorage
        localStorage.setItem("tareas", ul.innerHTML);

        input.value = "";
        empty.style.display = "none";
    }
});

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }

        localStorage.setItem("tareas", ul.innerHTML);

    });

    return deleteBtn;

}

window.onload = function () {
    ul.innerHTML = localStorage.getItem("tareas");

    const items = document.querySelectorAll("li");

    if (items.length > 0) {
        empty.style.display = "none";
    }
    const deleteBtn = document.querySelectorAll(".btn-delete");

    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const item = e.target.parentElement;
            ul.removeChild(item);



            if (items.length === 0) {
                empty.style.display = "block";
            }

            localStorage.setItem("tareas", ul.innerHTML);

        });
    })

}


