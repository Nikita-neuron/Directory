const chooseDayButtons = document.querySelectorAll(".choose-day-btn");
const addTimetablePair = document.querySelector(".add-timetable-pair");
const mainBoxSave = document.querySelector(".main-box-save");

const idGroup = 1;

let groupTimetable = {};
let subjects = {};
let teachers = {};

const getAllSubjects = async function() {
    let url = new URL("http://127.0.0.1:5000/getAllSubjects");

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();

        if (json["status"] != "None") {
            subjects = json["data"];
            console.log(subjects);
        }
        else {
            console.log("База данных пуста", json);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

const getAllTeachers = async function() {
    let url = new URL("http://127.0.0.1:5000/getAllTeachers");

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();

        if (json["status"] != "None") {
            teachers = json["data"];
            console.log(teachers);
        }
        else {
            console.log("База данных пуста", json);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

const getGroupTimetable = async function() {
    let url = new URL("http://127.0.0.1:5000/getGroupTimetable");
    let data = { "id_group" : idGroup };
    for (let k in data) { url.searchParams.append(k, data[k]); }

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();

        if (json["status"] != "None") {
            groupTimetable = json["data"];
            console.log(groupTimetable)
        }
        else {
            console.log("База данных пуста", json);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}
getAllSubjects();
getAllTeachers();
getGroupTimetable();

chooseDayButtons.forEach(elem => {
    elem.addEventListener("click", e => {
        chooseDayButtons.forEach()
    });
});