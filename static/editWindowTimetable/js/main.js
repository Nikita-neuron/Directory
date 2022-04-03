const chooseDayButtons = document.querySelectorAll(".choose-day-btn");
const addTimetablePair = document.querySelector(".add-timetable-pair");
const mainBoxSave = document.querySelector(".main-box-save");
const chooseDayTimetable = document.querySelector(".choose-day-timetable");

const idGroup = 1;

let groupDBTimetable = [];
let currentDay = "1";
let subjects = [];
let teachers = [];

const getAllSubjects = async function() {
    let url = new URL("http://127.0.0.1:5000/getAllSubjects");

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();

        if (json["status"] != "None") {
            subjects = json["data"];
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
            groupDBTimetable = json["data"];
            updateViewTimetable(currentDay);
        }
        else {
            console.log("База данных пуста", json);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

const sendGroupTimetable = async function (data) {
    let url = new URL("http://127.0.0.1:5000/addGroupTimetable");
    let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

function updateViewTimetable(day) {
    let dayTimetable = [];
    currentDay = day;
        
    groupDBTimetable.forEach(timetable => {
        if (timetable["day_of_week_number"] == currentDay) dayTimetable.push(timetable);
    });

    chooseDayTimetable.innerHTML = "";

    dayTimetable.forEach(timetable => {
        let html = `
        <table class="timetable-pair">
            <tr class="timetable-pair-row">
                <td><span>Номер пары:</span></td>
                <td><input id="pair-number" type="number" value="${timetable["pair_number"]}"></td>
            </tr>
            <tr class="timetable-pair-row">
                <td><span>Дисциплина:</span></td>
                <td>
                    <select id="subject">
                        <option value="">Выберите дисциплину</option>`;

        subjects.forEach(subject => {
            if (subject["id"] == timetable["id_subject"]) {
                html += `<option selected value="${subject["id"]}">${subject["name"]}</option>`;
            }
            else {
                html += `<option value="${subject["id"]}">${subject["name"]}</option>`;
            }
        });
        html +=`</select>
                </td>
            </tr>
            <tr class="timetable-pair-row">
                <td><span>Преподаватель:</span></td>
                <td>
                    <select id="teacher">
                        <option value="">Выберите преподавателя</option>`
        teachers.forEach(teacher => {
            if (teacher["id"] == timetable["id_teacher"]) {
                html += `<option selected value="${teacher["id"]}">${teacher["surname"]} ${teacher["name"]} ${teacher["patronymic"]}</option>`;
            }
            else {
                html += `<option value="${teacher["id"]}">${teacher["surname"]} ${teacher["name"]} ${teacher["patronymic"]}</option>`;
            }
        });
        html +=    `</select>
                </td>
            </tr>
            <tr class="timetable-pair-row">
                <td><span>Кабинет:</span></td>
                <td><input id="room" type="text" value="${timetable["room"]}"></td>
            </tr>
            <tr>
                <td>
                    <button class="remove-pair">Удалить пару</button>
                </td>
            </tr>
        </table>
        `;
        chooseDayTimetable.insertAdjacentHTML('beforeend', html);
        const removeBtn = chooseDayTimetable.lastElementChild.querySelector(".remove-pair");
        removeBtn.addEventListener("click", e => {
            let elem = chooseDayTimetable.lastElementChild;
            let pairNumber = elem.querySelector("#pair-number").value;
            if (pairNumber != "") {
                let index = -1;
                for (let i = 0; i < groupDBTimetable.length; i++) {
                    timetable = groupDBTimetable[i];
                    if (timetable["day_of_week_number"] == currentDay && timetable["pair_number"] == pairNumber) {
                        index = i;
                        break;
                    }
                };
                if (index > -1) groupDBTimetable.splice(index, 1);
            }
            chooseDayTimetable.removeChild(elem);
        });
    });
}

getAllSubjects();
getAllTeachers();
getGroupTimetable();

chooseDayButtons.forEach(elem => {
    elem.addEventListener("click", e => {
        chooseDayButtons.forEach(btn => btn.classList.remove("active"));
        elem.classList.add("active");

        let lastDayTimetable = chooseDayTimetable.children;
        for (let i = 0; i < lastDayTimetable.length; i++) {
            let elem = lastDayTimetable[i];
            let pairNumber = elem.querySelector("#pair-number").value == "" ? -1: elem.querySelector("#pair-number").value;
            let id_subject = elem.querySelector("#subject").value == "" ? -1: elem.querySelector("#subject").value;
            let id_teacher = elem.querySelector("#teacher").value == "" ? -1: elem.querySelector("#teacher").value;
            let room = elem.querySelector("#room").value;

            if (pairNumber != "") {
                let find = false;
    
                groupDBTimetable.forEach(timetable => {
                    if (timetable["day_of_week_number"] == currentDay && timetable["pair_number"] == pairNumber) {
                        timetable["id_subject"] = id_subject;
                        timetable["id_teacher"] = id_teacher;
                        timetable["room"] = room;
                        find = true;
                    }
                });
    
                if (!find) {
                    groupDBTimetable.push({
                        "id_subject": id_subject, 
                        "id_group": idGroup, 
                        "day_of_week_number": currentDay, 
                        "pair_number": pairNumber, 
                        "even_odd": "Чётная", 
                        "id_teacher": id_teacher, 
                        "room": room
                    });
                }
            }
        }
        updateViewTimetable(elem.dataset.day);
    });
});

addTimetablePair.addEventListener("click", e => {
    let lastPair = "1";
    if (chooseDayTimetable.childElementCount != 0) {
        lastPair = chooseDayTimetable.lastElementChild.querySelector("#pair-number").value;
    }

    if (lastPair != "") {
        let html = `
            <table class="timetable-pair">
                <tr class="timetable-pair-row">
                    <td><span>Номер пары:</span></td>
                    <td><input id="pair-number" type="number"></td>
                </tr>
                <tr class="timetable-pair-row">
                    <td><span>Дисциплина:</span></td>
                    <td>
                        <select id="subject">
                            <option value="">Выберите дисциплину</option>`;

        subjects.forEach(subject => {
            html += `<option value="${subject["id"]}">${subject["name"]}</option>`;
        });
        html +=`</select>
                </td>
                </tr>
                <tr class="timetable-pair-row">
                    <td><span>Преподаватель:</span></td>
                    <td>
                        <select id="teacher">
                            <option value="">Выберите преподавателя</option>`
        teachers.forEach(teacher => {
            html += `<option value="${teacher["id"]}">${teacher["surname"]} ${teacher["name"]} ${teacher["patronymic"]}</option>`;
        });
        html +=    `</select>
                    </td>
                </tr>
                <tr class="timetable-pair-row">
                    <td><span>Кабинет:</span></td>
                    <td><input id="room" type="text"></td>
                </tr>
                <tr>
                    <td>
                        <button class="remove-pair">Удалить пару</button>
                    </td>
                </tr>
            </table>
        `;
        chooseDayTimetable.insertAdjacentHTML('beforeend', html);

        const removeBtn = chooseDayTimetable.lastElementChild.querySelector(".remove-pair");
        removeBtn.addEventListener("click", e => {
            let elem = chooseDayTimetable.lastElementChild;
            let pairNumber = elem.querySelector("#pair-number").value;
            if (pairNumber != "") {
                let index = -1;
                for (let i = 0; i < groupDBTimetable.length; i++) {
                    timetable = groupDBTimetable[i];
                    if (timetable["day_of_week_number"] == currentDay && timetable["pair_number"] == pairNumber) {
                        index = i;
                        break;
                    }
                };
                if (index > -1) groupDBTimetable.splice(index, 1);
            }
            chooseDayTimetable.removeChild(elem);
        });
    }
});

mainBoxSave.addEventListener("click", e => {
    let lastDayTimetable = chooseDayTimetable.children;
    for (let i = 0; i < lastDayTimetable.length; i++) {
        let elem = lastDayTimetable[i];
        let pairNumber = elem.querySelector("#pair-number").value == "" ? -1: elem.querySelector("#pair-number").value;
        let id_subject = elem.querySelector("#subject").value == "" ? -1: elem.querySelector("#subject").value;
        let id_teacher = elem.querySelector("#teacher").value == "" ? -1: elem.querySelector("#teacher").value;
        let room = elem.querySelector("#room").value;

        if (pairNumber != "") {
            let find = false;

            groupDBTimetable.forEach(timetable => {
                if (timetable["day_of_week_number"] == currentDay && timetable["pair_number"] == pairNumber) {
                    timetable["id_subject"] = id_subject;
                    timetable["id_teacher"] = id_teacher;
                    timetable["room"] = room;
                    find = true;
                }
            });

            if (!find) {
                groupDBTimetable.push({
                    "id_subject": id_subject, 
                    "id_group": idGroup, 
                    "day_of_week_number": currentDay, 
                    "pair_number": pairNumber, 
                    "even_odd": "Чётная", 
                    "id_teacher": id_teacher, 
                    "room": room
                });
            }
        }
    }

    console.log(groupDBTimetable);
    sendGroupTimetable({
        "status": "OK",
        "id_group": idGroup,
        "timetable": groupDBTimetable
    });
});