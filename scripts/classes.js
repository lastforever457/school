//------------------------ classes.js ------------------------

let editingClassId = null;

document.addEventListener("DOMContentLoaded", () => {
    teacherSelectOptions();
    renderClasses();
    document
        .querySelector("#addClassForm")
        .addEventListener("submit", handleAddOrUpdateClass);
});

let classTable = document.querySelector("#class-table");

let classModal = new bootstrap.Modal(document.querySelector("#classModal"));

function renderClasses() {
    let getClasses = localStorage.getItem("classes");
    let classes = getClasses ? JSON.parse(getClasses) : [];
    let getStudents = localStorage.getItem("students");
    let students = getStudents ? JSON.parse(getStudents) : [];

    classTable.innerHTML = "";

    classes.forEach((clasS) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${clasS.id}</td>
            <td>${clasS.className}</td>
            <td>${clasS.classTeacher}</td>
            <td>
                <button class="btn text-warning edit-class-btn" data-id="${clasS.id}"><i class="text-warning fas fa-edit"></i></button>
                <button class="btn text-danger delete-class-btn" data-id="${clasS.id}"><i class="text-danger fas fa-trash"></i></button>
            </td>
        `;
        classTable.appendChild(row);
    });

    document.querySelectorAll(".edit-class-btn").forEach((button) => {
        button.addEventListener("click", handleEditClass);
    });

    document.querySelectorAll(".delete-class-btn").forEach((button) => {
        button.addEventListener("click", handleDeleteClass);
    });
}

function teacherSelectOptions() {
    let getTeacher = localStorage.getItem("teachers");
    let teachers = getTeacher ? JSON.parse(getTeacher) : [];
    let newClassSelect = document.querySelector("#newClassTeacher");

    newClassSelect.innerHTML =
        '<option value="default">Select teacher</option>';
    teachers.forEach((clasS) => {
        let classOption = document.createElement("option");
        classOption.value = `${clasS.firstName} ${clasS.lastName}`;
        classOption.textContent = `${clasS.firstName} ${clasS.lastName}`;
        newClassSelect.appendChild(classOption);
    });
}

function handleAddOrUpdateClass(event) {
    event.preventDefault();
    let newClassName = document.querySelector("#newClassName").value;
    let newClassSelect = document.querySelector("#newClassTeacher").value;

    let getClasss = localStorage.getItem("classes");
    let classes = getClasss ? JSON.parse(getClasss) : [];

    if (editingClassId) {
        let classToEdit = classes.find((clasS) => clasS.id === editingClassId);
        classToEdit.className = newClassName;
        classToEdit.classTeacher = newClassSelect;
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Class has been edited successfully",
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        if (!newClassName.match(/^(10|11|[1-9])[A-Z]/)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The class name was entered incorrectly",
            });
            return;
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Class has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        let newClass = {
            id: Date.now(),
            className: newClassName,
            classTeacher: newClassSelect,
            classStudents: 0,
        };
        classes.push(newClass);
    }

    localStorage.setItem("classes", JSON.stringify(classes));
    renderClasses();
    document.querySelector("#newClassName").value = "";
    document.querySelector("#newClassTeacher").value = "";
    editingClassId = null;
    classModal.hide();
    studentClassSelectOptions();
}

function handleEditClass(event) {
    classModal.show();
    let classId = parseInt(event.currentTarget.getAttribute("data-id"));
    editingClassId = classId;
    let getClasss = localStorage.getItem("classes");
    let classes = getClasss ? JSON.parse(getClasss) : [];
    let classToEdit = classes.find((clasS) => clasS.id === classId);

    document.querySelector("#newClassName").value = classToEdit.className;
    document.querySelector("#newClassTeacher").value = classToEdit.classTeacher;
    console.log("Editing class:", classToEdit);
}

function handleDeleteClass(event) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            let classId = parseInt(event.target.getAttribute("data-id"));
            let getClasss = localStorage.getItem("classes");
            let classes = getClasss ? JSON.parse(getClasss) : [];
            classes = classes.filter((clasS) => clasS.id !== classId);
            localStorage.setItem("classes", JSON.stringify(classes));
            renderClasses();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    });
}

//------------------------ classes.js ------------------------
