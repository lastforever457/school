let editingTeacherId = null;

document.addEventListener("DOMContentLoaded", () => {
    classSelectOptions();
    renderTeachers();
    document
        .querySelector("#addTeacherForm")
        .addEventListener("submit", handleAddOrUpdateTeacher);
});

let teachersTable = document.querySelector("#teacher-table");

let teachersModal = new bootstrap.Modal(
    document.querySelector("#teacherModal")
);

function renderTeachers() {
    let getTeachers = localStorage.getItem("teachers");
    let teachers = getTeachers ? JSON.parse(getTeachers) : [];
    teachersTable.innerHTML = "";

    teachers.forEach((teacher) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.firstName}</td>
            <td>${teacher.lastName}</td>
            <td>${teacher.class}</td>
            <td>
                <button class="btn text-warning edit-teacher-btn" data-id="${teacher.id}"><i class="text-warning fas fa-edit"></i></button>
                <button class="btn text-danger delete-teacher-btn" data-id="${teacher.id}"><i class="text-danger fas fa-trash"></i></button>
            </td>
        `;
        teachersTable.appendChild(row);
    });

    document.querySelectorAll(".edit-teacher-btn").forEach((button) => {
        button.addEventListener("click", handleEditTeacher);
    });

    document.querySelectorAll(".delete-teacher-btn").forEach((button) => {
        button.addEventListener("click", handleDeleteTeacher);
    });
}

document.addEventListener("DOMContentLoaded", classSelectOptions);

function classSelectOptions() {
    let getClasses = localStorage.getItem("classes");
    let classes = getClasses ? JSON.parse(getClasses) : [];
    let newClassSelect = document.querySelector("#newTeacherClass");

    newClassSelect.innerHTML = '<option value="default">Select class</option>';

    classes.forEach((clasS) => {
        let classOption = document.createElement("option");
        classOption.value = clasS.className;
        classOption.textContent = clasS.className;
        newClassSelect.appendChild(classOption);
    });
}

function handleAddOrUpdateTeacher(event) {
    event.preventDefault();
    let newTeacherFirstName = document.querySelector(
        "#newTeacherFirstName"
    ).value;
    let newTeacherLastName = document.querySelector(
        "#newTeacherLastName"
    ).value;
    let newTeacherClass = document.querySelector("#newTeacherClass").value;

    let getTeachers = localStorage.getItem("teachers");
    let teachers = getTeachers ? JSON.parse(getTeachers) : [];

    if (editingTeacherId) {
        let teacherToEdit = teachers.find(
            (teacher) => teacher.id === editingTeacherId
        );
        teacherToEdit.firstName = newTeacherFirstName;
        teacherToEdit.lastName = newTeacherLastName;
        teacherToEdit.class = newTeacherClass;
        console.log("Updated teacher:", teacherToEdit);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Teacher has been edited successfully",
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        // Add new teacher
        let newTeacher = {
            id: Date.now(),
            firstName: newTeacherFirstName,
            lastName: newTeacherLastName,
            class: newTeacherClass,
        };
        Swal.fire({
            position: "center",
            icon: "success",
            title: "New teacher has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
        teachers.push(newTeacher);
        console.log("Added new teacher:", newTeacher);
    }

    localStorage.setItem("teachers", JSON.stringify(teachers));
    renderTeachers();
    document.querySelector("#addTeacherForm").reset();
    editingTeacherId = null;
    teachersModal.hide();

    // Update teacher options
    teacherSelectOptions();
}

function handleEditTeacher(event) {
    teachersModal.show();
    let teacherId = parseInt(event.currentTarget.getAttribute("data-id"));
    editingTeacherId = teacherId;
    let getTeachers = localStorage.getItem("teachers");
    let teachers = getTeachers ? JSON.parse(getTeachers) : [];
    let teacherToEdit = teachers.find((teacher) => teacher.id === teacherId);

    document.querySelector("#newTeacherFirstName").value =
        teacherToEdit.firstName;
    document.querySelector("#newTeacherLastName").value =
        teacherToEdit.lastName;
    document.querySelector("#newTeacherClass").value = teacherToEdit.class;
}

function handleDeleteTeacher(event) {
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
            let teacherId = parseInt(event.target.getAttribute("data-id"));
            let getTeachers = localStorage.getItem("teachers");
            let teachers = getTeachers ? JSON.parse(getTeachers) : [];
            teachers = teachers.filter((teacher) => teacher.id !== teacherId);
            localStorage.setItem("teachers", JSON.stringify(teachers));
            renderTeachers();
            Swal.fire({
                title: "Deleted!",
                text: "Teacher has been deleted.",
                icon: "success",
            });
        }
    });
}
