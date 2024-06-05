//------------------------ students.js ------------------------

let editingStudentId = null;

let studentsModal = new bootstrap.Modal(
    document.querySelector("#studentsModal")
);

function studentClassSelectOptions() {
    let getClasses = localStorage.getItem("classes");
    let classes = getClasses ? JSON.parse(getClasses) : [];
    let newClassSelect = document.querySelector("#newStudentClass");

    newClassSelect.innerHTML = '<option value="default">Select class</option>';

    classes.forEach((clasS) => {
        let classOption = document.createElement("option");
        classOption.value = clasS.className;
        classOption.textContent = clasS.className;
        newClassSelect.appendChild(classOption);
    });
}

function handleAddOrUpdateStudent(event) {
    event.preventDefault();
    try {
        let newStudentFirstName = document.querySelector(
            "#newStudentFirstName"
        ).value;
        let newStudentLastName = document.querySelector(
            "#newStudentLastName"
        ).value;
        let newStudentClass = document.querySelector("#newStudentClass").value;

        let getStudents = localStorage.getItem("students");
        let students = getStudents ? JSON.parse(getStudents) : [];

        if (editingStudentId) {
            let studentToEdit = students.find(
                (student) => student.id === editingStudentId
            );
            studentToEdit.firstName = newStudentFirstName;
            studentToEdit.lastName = newStudentLastName;
            studentToEdit.class = newStudentClass;
            console.log("Updated student:", studentToEdit);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Student has been edited successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            let newStudent = {
                id: Date.now(),
                firstName: newStudentFirstName,
                lastName: newStudentLastName,
                class: newStudentClass,
            };
            Swal.fire({
                position: "center",
                icon: "success",
                title: "New student has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
            students.push(newStudent);
            console.log("Added new student:", newStudent);
        }

        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
        document.querySelector("#newStudentFirstName").value = "";
        document.querySelector("#newStudentLastName").value = "";

        studentsModal.hide();
        editingStudentId = null;
        countOfStudents();
    } catch (error) {
        console.error(error);
    }
}

function handleDeleteStudent(event) {
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
            const studentId = event.target
                .closest("button")
                .getAttribute("data-id");
            let getStudents = localStorage.getItem("students");
            let students = getStudents ? JSON.parse(getStudents) : [];
            students = students.filter((student) => student.id != studentId);
            localStorage.setItem("students", JSON.stringify(students));
            renderStudents();
            Swal.fire({
                title: "Deleted!",
                text: "Student has been deleted.",
                icon: "success",
            });
        }
    });
}

let studentsTable = document.querySelector("#student-table");

function renderStudents() {
    let getStudents = localStorage.getItem("students");
    let students = getStudents ? JSON.parse(getStudents) : [];
    studentsTable.innerHTML = ""; // Clear existing table rows
    students.forEach((student) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.class}</td>
            <td>
                <button class="btn text-warning edit-student-btn" data-id="${student.id}"><i class="text-warning fas fa-edit"></i></button>
                <button class="btn text-danger delete-student-btn" data-id="${student.id}"><i class="text-danger fas fa-trash"></i></button>
            </td>
        `;
        studentsTable.appendChild(row);
    });

    // Attach event listeners to edit and delete buttons
    document.querySelectorAll(".edit-student-btn").forEach((button) => {
        button.addEventListener("click", handleEditStudent);
    });

    document.querySelectorAll(".delete-student-btn").forEach((button) => {
        button.addEventListener("click", handleDeleteStudent);
    });
}

document.addEventListener("DOMContentLoaded", renderStudents);

function handleEditStudent(event) {
    let studentId = parseInt(event.currentTarget.getAttribute("data-id"));
    editingStudentId = studentId;
    let getStudents = localStorage.getItem("students");
    let students = getStudents ? JSON.parse(getStudents) : [];
    let studentToEdit = students.find((student) => student.id === studentId);

    document.querySelector("#newStudentFirstName").value =
        studentToEdit.firstName;
    document.querySelector("#newStudentLastName").value =
        studentToEdit.lastName;
    document.querySelector("#newStudentClass").value = studentToEdit.class;
    console.log("Editing student:", studentToEdit);
    studentsModal.show();
}

//------------------------ students.js ------------------------
