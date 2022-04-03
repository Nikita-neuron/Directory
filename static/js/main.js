window.onload = function(){

    //Верхнее меню

    //Инициализация двух массивов. Один с кнопками, другой с окнами
    let BTNs = [document.getElementById("mainBTN"), document.getElementById("studentBTN"), document.getElementById("groupsBTN"), document.getElementById("teacherBTN"), document.getElementById("subjectBTN"), document.getElementById("scheduleBTN")];
    let Windows = [document.getElementById("mainWindow"), document.getElementById("studentWindow"), document.getElementById("groupsWindow"), document.getElementById("teacherWindow"), document.getElementById("subjectWindow"), document.getElementById("scheduleWindow")]

    BTNs[0].classList.replace("MenuElement", "MenuElement_BackGreen");

    //Функция смены окна. Параметр BTNnum отвечает за окно, что будет открыто
    function changeWindow(BTNnum) {
        for (let i  = 0; i < BTNs.length; i++) {
            BTNs[i].classList.replace("MenuElement_BackGreen", "MenuElement");
            Windows[i].style.display = "none";
        }

        BTNs[BTNnum].classList.replace("MenuElement", "MenuElement_BackGreen");
        Windows[BTNnum].style.display = "flex";
    }

    //Вызов функции по нажатию на кнопку
    BTNs[0].onclick = function() {
        changeWindow(0);
    }

    BTNs[1].onclick = function() {
        changeWindow(1);
    }

    BTNs[2].onclick = function() {
        changeWindow(2);
    }

    BTNs[3].onclick = function() {
        changeWindow(3);
    }

    BTNs[4].onclick = function() {
        changeWindow(4);
    }

    BTNs[5].onclick = function() {
        changeWindow(5);
    }



    //Поиск элементов
    let SearchList = [document.getElementById("StudentList"), document.getElementById("TeacherList"), document.getElementById("GroupList"), document.getElementById("SubjectList")];
    let SearchListTextField = [document.getElementById("StudentListTextField"), document.getElementById("TeacherListTextField"), document.getElementById("GroupListTextField"), document.getElementById("SubjectListTextField")]
    
    function updSearch(SearchNum, SearchValue) {
        for(let i = 0; i < SearchList[SearchNum].children.length; i++) {
            if (SearchList[SearchNum].children[i].children[1].innerText.toLowerCase().includes(SearchValue.toLowerCase()) == false) {
                SearchList[SearchNum].children[i].style.display = "none";
            }
            else {
                SearchList[SearchNum].children[i].style.display = "flex";
            }
        }
    }

    SearchListTextField[0].oninput = function() {
        var ValueOfSearch = this.value;
        updSearch(0, ValueOfSearch);
    }

    SearchListTextField[1].oninput = function() {
        var ValueOfSearch = this.value;
        updSearch(1, ValueOfSearch);
    }

    SearchListTextField[2].oninput = function() {
        var ValueOfSearch = this.value;
        updSearch(2, ValueOfSearch);
    }

    SearchListTextField[3].oninput = function() {
        var ValueOfSearch = this.value;
        updSearch(3, ValueOfSearch);
    }

    //Поиск группы в расписании

    const ScheduleTableList = document.getElementById("ScheduleTableList");
    const ScheduleSearchField = document.getElementById("ScheduleSearchField");

    ScheduleSearchField.oninput = function() {
        for (let i = 0; i < ScheduleTableList.children.length; i++) {
            if (ScheduleTableList.children[i].children[0].children[0].children[0].innerText.toLowerCase().includes(this.value.toLowerCase()) == false) {
                ScheduleTableList.children[i].style.display = "none";
            }
            else {
                ScheduleTableList.children[i].style.display = "flex";
            }
        }
    }



    //Стилизированное радио

    radioElements = document.querySelectorAll(".CustomRadio")
    
    function changeRadio(RadioNum) {
        for (let i = 0; i < radioElements.length; i++) {
            radioElements[i].children[0].style.display = "none";
        }

        radioElements[RadioNum].children[0].style.display = "flex";
    }

    radioElements[0].children[0].style.display = "flex";

    radioElements[0].onclick = function() {
        changeRadio(0);
    }

    radioElements[1].onclick = function() {
        changeRadio(1);
    }

    radioElements[2].onclick = function() {
        changeRadio(2);
    }



    //Окно редактирования/добавления
    const StudentEditWindow = document.getElementById("StudentEditWindow");
    const StudentEditInfoBTN = document.getElementById("StudentEditInfoBTN");
    const StudentAddPersonBTN = document.getElementById("StudentAddPersonBTN");
    const StudentEditWindowExitBTN = document.getElementById("StudentEditWindowExitBTN");

    const StudentInfoTable1 = document.getElementById("StudentInfoTable1");
    const StudentInfoTable2 = document.getElementById("StudentInfoTable2");
    const StudentInfoTable3 = document.getElementById("StudentInfoTable3");
    const StudentEditTable = document.getElementById("StudentEditTable");

    var StudentEditMode = false;

    StudentEditInfoBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";

        StudentEditMode = true;

        StudentEditTable.children[0].children[0].children[1].innerHTML = StudentInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < StudentInfoTable2.children[0].children.length + 1; i++) {
            StudentEditTable.children[0].children[i].children[1].innerHTML = StudentInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        StudentEditTable.children[0].children[6].children[1].innerHTML = StudentInfoTable3.children[0].children[0].children[1].innerHTML
    }

    StudentAddPersonBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";

        StudentEditMode = false;
    }

    StudentEditWindowExitBTN.onclick = function() {
        StudentEditWindow.style.display = "none";

        for (let i = 0; i < StudentEditTable.children[0].children.length - 1; i++) {
            StudentEditTable.children[0].children[i].children[1].innerHTML = "";
        }
    }



    const TeacherEditWindow = document.getElementById("TeacherEditWindow");
    const TeacherEditInfoBTN = document.getElementById("TeacherEditInfoBTN");
    const TeacherAddPersonBTN = document.getElementById("TeacherAddPersonBTN");
    const TeacherEditWindowExitBTN = document.getElementById("TeacherEditWindowExitBTN");

    const TeacherInfoTable1 = document.getElementById("TeacherInfoTable1");
    const TeacherInfoTable2 = document.getElementById("TeacherInfoTable2");
    const TeacherInfoTable3 = document.getElementById("TeacherInfoTable3");
    const TeacherEditTable = document.getElementById("TeacherEditTable");

    var TeacherEditMode = false;

    TeacherEditInfoBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";

        TeacherEditMode = true;

        TeacherEditTable.children[0].children[0].children[1].innerHTML = TeacherInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < TeacherInfoTable2.children[0].children.length + 1; i++) {
            TeacherEditTable.children[0].children[i].children[1].innerHTML = TeacherInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        TeacherEditTable.children[0].children[5].children[1].innerHTML = TeacherInfoTable3.children[0].children[0].children[1].innerHTML
    }

    TeacherAddPersonBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";

        TeacherEditMode = false;
    }

    TeacherEditWindowExitBTN.onclick = function() {
        TeacherEditWindow.style.display = "none";

        for (let i = 0; i < TeacherEditTable.children[0].children.length - 1; i++) {
            TeacherEditTable.children[0].children[i].children[1].innerHTML = "";
        }
    }




    const GroupEditWindow = document.getElementById("GroupEditWindow");
    const EditGroupBTN = document.getElementById("EditGroupBTN");
    const AddGroupBTN = document.getElementById("AddGroupBTN");
    const GroupEditWindowExitBTN = document.getElementById("GroupEditWindowExitBTN");

    const GroupInfoTable1 = document.getElementById("GroupInfoTable1");
    const GroupInfoTable2 = document.getElementById("GroupInfoTable2");
    const GroupEditTable = document.getElementById("GroupEditTable");

    var GroupEditMode = false;

    EditGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";

        GroupEditMode = true;

        GroupEditTable.children[0].children[0].children[1].innerHTML = GroupInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < GroupInfoTable2.children[0].children.length + 1; i++) {
            GroupEditTable.children[0].children[i].children[1].innerHTML = GroupInfoTable2.children[0].children[i-1].children[1].innerHTML
        }
    }

    AddGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";

        GroupEditMode = false;
    }

    GroupEditWindowExitBTN.onclick = function() {
        GroupEditWindow.style.display = "none";

        for (let i = 0; i < GroupEditTable.children[0].children.length; i++) {
            GroupEditTable.children[0].children[i].children[1].innerHTML = "";
        }
    }

    const SubjectEditWindow = document.getElementById("SubjectEditWindow");
    const EditSubjectBTN = document.getElementById("EditSubjectBTN");
    const AddSubjectBTN = document.getElementById("AddSubjectBTN");
    const SubjectEditWindowExitBTN = document.getElementById("SubjectEditWindowExitBTN");

    const SubjectInfoTable1 = document.getElementById("SubjectInfoTable1");
    const SubjectInfoTable2 = document.getElementById("SubjectInfoTable2");
    const SubjectInfoTable3 = document.getElementById("SubjectInfoTable3");
    const SubjectInfoTable4 = document.getElementById("SubjectInfoTable4");
    const SubjectInfoTable5 = document.getElementById("SubjectInfoTable5");
    const SubjectEditTable = document.getElementById("SubjectEditTable");

    var SubjectEditMode = false;

    EditSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";

        SubjectEditMode = true;

        SubjectEditTable.children[0].children[0].children[1].innerHTML = SubjectInfoTable1.children[0].children[0].children[1].innerHTML;

        for (let i = 1; i < SubjectInfoTable2.children[0].children.length + 1; i++) {
            SubjectEditTable.children[0].children[i].children[1].innerHTML = SubjectInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        SubjectEditTable.children[0].children[3].children[1].innerHTML = SubjectInfoTable5.children[0].children[0].children[1].innerHTML;
    }

    AddSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";

        SubjectEditMode = false;
    }

    SubjectEditWindowExitBTN.onclick = function() {
        SubjectEditWindow.style.display = "none";

        for (let i = 0; i < SubjectEditTable.children[0].children.length; i++) {
            SubjectEditTable.children[0].children[i].children[1].innerHTML = "";
        }
    }

    //Расписание

    const ScheduleTable1 = document.getElementById("ScheduleTable1");
    const ScheduleTable2 = document.getElementById("ScheduleTable2");
    const ScheduleTable3 = document.getElementById("ScheduleTable3");
    const ScheduleTable4 = document.getElementById("ScheduleTable4");
    const ScheduleTable5 = document.getElementById("ScheduleTable5");
    const ScheduleTable6 = document.getElementById("ScheduleTable6");
    const ScheduleTable7 = document.getElementById("ScheduleTable7");
    const ScheduleTable8 = document.getElementById("ScheduleTable8");

    const ScheduleTableTakeHeight1 = document.getElementById("ScheduleTableTakeHeight1");
    const ScheduleTableTakeHeight2 = document.getElementById("ScheduleTableTakeHeight2");
    const ScheduleTableTakeHeight3 = document.getElementById("ScheduleTableTakeHeight3");

    ScheduleTable1.style.height = ScheduleTableTakeHeight1.clientHeight;
    ScheduleTable2.style.height = ScheduleTableTakeHeight2.clientHeight;
    ScheduleTable3.style.height = ScheduleTableTakeHeight2.clientHeight;
    var test = ScheduleTableTakeHeight2.clientHeight;
    console.log(getComputedStyle(ScheduleTable2).height)
    // ScheduleTable3.style.height = (ScheduleTableTakeHeight2.clientHeight * 7);






    //Запросы

    //Получение всех студентов и вывод списка
    StudentList = document.getElementById("StudentList");

    const getAllStudents = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllStudents");
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneStudent(' + json["data"][i]["id"] + ')" class="LeftListBlock_PersonCell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"][0] + '</span></div>';
                    StudentList.innerHTML += str;
                }

            }
            else {
                console.log("База данных студентов пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    getAllStudents();


    //Добавление нового студента

    const AddEditStudent1 = document.getElementById("AddEditStudent1");
    const AddEditStudent2 = document.getElementById("AddEditStudent2");
    const AddEditStudent3 = document.getElementById("AddEditStudent3");
    const AddEditStudent4 = document.getElementById("AddEditStudent4");
    const AddEditStudent5 = document.getElementById("AddEditStudent5");
    const AddEditStudent6 = document.getElementById("AddEditStudent6");
    const AddEditStudent7 = document.getElementById("AddEditStudent7");

    const AddEditStudentBTN = document.getElementById("AddEditStudentBTN");

    const AddOneStudent = async function() {
        let student = {
            FIO: AddEditStudent1.innerHTML,
            gender: AddEditStudent3.innerHTML,
            name_group: AddEditStudent2.innerHTML,
            date_of_birth: AddEditStudent4.innerHTML,
            email: AddEditStudent5.innerHTML,
            headman: AddEditStudent6.innerHTML,
            info: AddEditStudent7.innerHTML
        };

        let url = new URL("http://127.0.0.1:5000/addStudent");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(student)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    //Обновление студента

    SaveEditStudentId = document.getElementById("SaveEditStudentId");

    const EditOneStudent = async function() {
        if (SaveEditStudentId.innerHTML != "-") {
            var GroupID = Number(SaveEditStudentId.innerHTML)
        }
        else {
            return 0;
        }

        let student = {
            id_student: 0,
            FIO: AddEditStudent1.innerHTML,
            gender: AddEditStudent3.innerHTML,
            name_group: AddEditStudent2.innerHTML,
            date_of_birth: AddEditStudent4.innerHTML,
            email: AddEditStudent5.innerHTML,
            headman: AddEditStudent6.innerHTML,
            info: AddEditStudent7.innerHTML
        };

        let url = new URL("http://127.0.0.1:5000/updateStud");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(student)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }


    AddEditStudentBTN.onclick = function() {
        if (GroupEditMode == true) {
            EditOneStudent();
        }
        else if (GroupEditMode == false) {
            AddOneStudent();
        }
        else {
            console.log("Ошибка");
        }
    }




    //Удаление студента

    const DeleteStudentBTN = document.getElementById("DeleteStudentBTN");

    const delOneStudent = async function() {
        let data = { "student_id" : Number(SaveEditStudentId.innerHTML) };
        let url = new URL("http://127.0.0.1:5000/deleteStudent");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteStudentBTN.onclick = function() {
        // delOneStudent();
    }

















    

    //Добавление нового преподавателя

    const AddEditTeacher1 = document.getElementById("AddEditTeacher1");
    const AddEditTeacher2 = document.getElementById("AddEditTeacher2");
    const AddEditTeacher3 = document.getElementById("AddEditTeacher3");
    const AddEditTeacher4 = document.getElementById("AddEditTeacher4");
    const AddEditTeacher5 = document.getElementById("AddEditTeacher5");
    const AddEditTeacher6 = document.getElementById("AddEditTeacher6");

    const AddEditTeacherBTN = document.getElementById("AddEditTeacherBTN");

    let teacher = {
        FIO: AddEditTeacher1.innerHTML,
        position: AddEditTeacher3.innerHTML,
        gender: AddEditTeacher2.innerHTML,
        date_of_birth: AddEditTeacher4.innerHTML,
        email: AddEditTeacher5.innerHTML,
        info: AddEditTeacher6.innerHTML
    };
    const AddOneTeacher = async function() {
        let url = new URL("http://127.0.0.1:5000/addTeacher");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(teacher)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }


    // Обновление преподавателей

    SaveEditTeacherId = document.getElementById("SaveEditTeacherId");

    const EditOneTeacher = async function() {
        if (SaveEditTeacherId.innerHTML != "-") {
            var GroupID = Number(SaveEditTeacherId.innerHTML)
        }
        else {
            return 0;
        }

        let teacher = {
            FIO: AddEditTeacher1.innerHTML,
            position: AddEditTeacher3.innerHTML,
            gender: AddEditTeacher2.innerHTML,
            date_of_birth: AddEditTeacher4.innerHTML,
            email: AddEditTeacher5.innerHTML,
            info: AddEditTeacher6.innerHTML
        };

        let url = new URL("http://127.0.0.1:5000/updateTeacher");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(teacher)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    AddEditTeacherBTN.onclick = function() {
        if (TeacherEditMode == true) {
            EditOneTeacher();
        }
        else if (TeacherEditMode == false) {
            AddOneTeacher();
        }
        else {
            console.log("Ошибка");
        }
    }


    // Получение всех преподавателей

    TeacherList = document.getElementById("TeacherList");

    const getAllTeachers = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllTeachers");
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                console.log(json);
                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneTeacher(' + json["data"][i]["id"] + ')" class="LeftListBlock_PersonCell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"][0] + '</span></div>'
                    TeacherList.innerHTML += str;
                }

            }
            else {
                console.log("База данных преподавателей пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    getAllTeachers();


    //Удаление преподавателя

    const DeleteTeacherBTN = document.getElementById("DeleteTeacherBTN");

    const delOneTeacher = async function() {
        let data = { "student_id" : Number(SaveEditTeacherId.innerHTML) };
        let url = new URL("http://127.0.0.1:5000/deleteTeacher");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteTeacherBTN.onclick = function() {
        delOneTeacher();
    }















    //Добавление группы

    const AddEditGroup1 = document.getElementById("AddEditGroup1");
    const AddEditGroup2 = document.getElementById("AddEditGroup2");
    const AddEditGroup3 = document.getElementById("AddEditGroup3");
    const AddEditGroup4 = document.getElementById("AddEditGroup4");
    const AddEditGroup5 = document.getElementById("AddEditGroup5");

    const AddEditGroupBTN = document.getElementById("AddEditGroupBTN");

    const AddOneGroup = async function() {
        let group = {
            name: AddEditGroup1.innerHTML,
            level_education: AddEditGroup2.innerHTML,
            cipher: AddEditGroup3.innerHTML,
            subdivision: AddEditGroup4.innerHTML,
            headman: AddEditGroup5.innerHTML,
        };

        let url = new URL("http://127.0.0.1:5000/addGroup");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    //Обновление группы

    SaveEditGroupId = document.getElementById("SaveEditGroupId");

    const EditOneGroup = async function() {
        if (SaveEditGroupId.innerHTML != "-") {
            var GroupID = Number(SaveEditGroupId.innerHTML)
        }
        else {
            return 0;
        }

        let group = {
            id_group: GroupID,
            name: AddEditGroup1.innerHTML,
            level_education: AddEditGroup2.innerHTML,
            cipher: AddEditGroup3.innerHTML,
            subdivision: AddEditGroup4.innerHTML,
            headman: AddEditGroup5.innerHTML,
        };

        let url = new URL("http://127.0.0.1:5000/updateGroup");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }


    AddEditGroupBTN.onclick = function() {
        if (GroupEditMode == true) {
            EditOneGroup();
        }
        else if (GroupEditMode == false) {
            AddOneGroup();
        }
        else {
            console.log("Ошибка");
        }
    }


    //Получение групп

    GroupList = document.getElementById("GroupList");

    const getAllGroups = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllGroups");
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneGroup(' + json["data"][i]["id"] + ')" class="Groups_Middle_GroupList_Cell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["name"] + '</span></div>';
                    GroupList.innerHTML += str;
                }

            }
            else {
                console.log("База данных групп пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    getAllGroups()

    function eraseGroupList() {
        GroupList.innerHTML = "";
    }

    //Удаление групп

    const DeleteGroupBTN = document.getElementById("DeleteGroupBTN");

    const delOneGroup = async function() {
        let data = { "id_group" : SaveEditGroupId.innerHTML };
        let url = new URL("http://127.0.0.1:5000/deleteGroup");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteGroupBTN.onclick = function() {
        delOneGroup();
    }









    //Добавление предмета

    const AddEditSubject1 = document.getElementById("AddEditSubject1");
    const AddEditSubject2 = document.getElementById("AddEditSubject2");
    const AddEditSubject3 = document.getElementById("AddEditSubject3");
    const AddEditSubject6 = document.getElementById("AddEditSubject6");

    const AddEditSubjectBTN = document.getElementById("AddEditSubjectBTN");

    const AddOneSubject = async function() {
        let subject = {
            name: AddEditSubject1.innerHTML,
            study_hours: AddEditSubject2.innerHTML,
            level_education: AddEditSubject3.innerHTML,
            info: AddEditSubject6.innerHTML
        };

        let url = new URL("http://127.0.0.1:5000/addSubject");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(subject)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    //Обновление предмета

    SaveEditSubjectId = document.getElementById("SaveEditSubjectId");

    const EditOneSubject = async function() {
        if (SaveEditSubjectId.innerHTML != "-") {
            var SubjectID = Number(SaveEditSubjectId.innerHTML)
        }
        else {
            return 0;
        }

        let subject = {
            id_subject: SubjectID,
            name: AddEditSubject1.innerHTML,
            study_hours: AddEditSubject2.innerHTML,
            level_education: AddEditSubject3.innerHTML,
            info: AddEditSubject6.innerHTML
        };

        let url = new URL("http://127.0.0.1:5000/updateSubject");
    
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(subject)
        });
        if (response.ok) {
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    AddEditSubjectBTN.onclick = function() {
        if (SubjectEditMode == true) {
            EditOneSubject();
        }
        else if (SubjectEditMode == false) {
            AddOneSubject();
        }
        else {
            console.log("Ошибка");
        }
    }



    //Получение предметов

    SubjectList = document.getElementById("SubjectList");

    const getAllSubjects = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllSubjects");
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();

            console.log(json);
            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneSubject(' + json["data"][i]["id"] + ')" class="Groups_Middle_GroupList_Cell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["name"] + '</span></div>';
                    SubjectList.innerHTML += str;
                }

            }
            else {
                console.log("База данных предметов пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    getAllSubjects()


    // Удаление предмета

    const DeleteSubjectBTN = document.getElementById("DeleteSubjectBTN");

    const delOneSubject = async function() {
        let data = { "id_subject" : SaveEditSubjectId.innerHTML };
        let url = new URL("http://127.0.0.1:5000/deleteSubject");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteSubjectBTN.onclick = function() {
        delOneSubject();
    }
};