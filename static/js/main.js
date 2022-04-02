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

    StudentEditInfoBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";

        StudentEditTable.children[0].children[0].children[1].innerHTML = StudentInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < StudentInfoTable2.children[0].children.length + 1; i++) {
            StudentEditTable.children[0].children[i].children[1].innerHTML = StudentInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        StudentEditTable.children[0].children[6].children[1].innerHTML = StudentInfoTable3.children[0].children[0].children[1].innerHTML
    }

    StudentAddPersonBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";
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

    TeacherEditInfoBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";

        TeacherEditTable.children[0].children[0].children[1].innerHTML = TeacherInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < TeacherInfoTable2.children[0].children.length + 1; i++) {
            TeacherEditTable.children[0].children[i].children[1].innerHTML = TeacherInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        TeacherEditTable.children[0].children[5].children[1].innerHTML = TeacherInfoTable3.children[0].children[0].children[1].innerHTML
    }

    TeacherAddPersonBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";
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

    EditGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";

        GroupEditTable.children[0].children[0].children[1].innerHTML = GroupInfoTable1.children[0].children[0].children[1].innerHTML

        for (let i = 1; i < GroupInfoTable2.children[0].children.length + 1; i++) {
            GroupEditTable.children[0].children[i].children[1].innerHTML = GroupInfoTable2.children[0].children[i-1].children[1].innerHTML
        }
    }

    AddGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";
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

    EditSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";

        SubjectEditTable.children[0].children[0].children[1].innerHTML = SubjectInfoTable1.children[0].children[0].children[1].innerHTML;

        for (let i = 1; i < SubjectInfoTable2.children[0].children.length + 1; i++) {
            SubjectEditTable.children[0].children[i].children[1].innerHTML = SubjectInfoTable2.children[0].children[i-1].children[1].innerHTML
        }

        SubjectEditTable.children[0].children[3].children[1].innerHTML = SubjectInfoTable3.children[0].children[0].children[1].innerHTML;
        SubjectEditTable.children[0].children[4].children[1].innerHTML = SubjectInfoTable4.children[0].children[0].children[1].innerHTML;
        SubjectEditTable.children[0].children[5].children[1].innerHTML = SubjectInfoTable5.children[0].children[0].children[1].innerHTML;
    }

    AddSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";
    }

    SubjectEditWindowExitBTN.onclick = function() {
        SubjectEditWindow.style.display = "none";

        for (let i = 0; i < SubjectEditTable.children[0].children.length; i++) {
            SubjectEditTable.children[0].children[i].children[1].innerHTML = "";
        }
    }



    //Get Запросы

    //Получение всех студентов и вывод списка
    StudentList = document.getElementById("StudentList");

    const getAllStudents = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllStudents");
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div class="LeftListBlock_PersonCell JSStudentBTN" id="Student' + (i+1).toString() + '"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"][0] + '</span></div>';
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
    // getAllStudents();




    //Получение одного студента и вывод его данных

    StudentInfo1 = document.getElementById("StudentInfo1");
    StudentInfo2 = document.getElementById("StudentInfo2");
    StudentInfo3 = document.getElementById("StudentInfo3");
    StudentInfo4 = document.getElementById("StudentInfo4");
    StudentInfo5 = document.getElementById("StudentInfo5");
    StudentInfo6 = document.getElementById("StudentInfo6");
    StudentInfo7 = document.getElementById("StudentInfo7");

    const getOneStudent = async function() {
        let data = { "student_id" : "0" };
        let url = new URL("http://127.0.0.1:5000/getStudent");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            
            if (json["status"] != "None") {
                StudentInfo1.innerHTML = json["data"]["surname"] + " " + json["data"]["name"] + " " + json["data"]["patronymic"];
                StudentInfo2.innerHTML = json["data"]["gender"];
                StudentInfo3.innerHTML = json["data"]["date_of_birth"];
                StudentInfo4.innerHTML = json["data"]["email"];
                StudentInfo5.innerHTML = json["data"]["surname"];
                StudentInfo6.innerHTML = json["data"]["surname"];
                StudentInfo7.innerHTML = json["data"]["surname"];
            }
            else {
                console.log("Об этом студенте нет информации", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }




    //Добавление нового студента

    const AddEditStudent1 = document.getElementById("AddEditStudent1");
    const AddEditStudent2 = document.getElementById("AddEditStudent2");
    const AddEditStudent3 = document.getElementById("AddEditStudent3");
    const AddEditStudent4 = document.getElementById("AddEditStudent4");
    const AddEditStudent5 = document.getElementById("AddEditStudent5");
    const AddEditStudent6 = document.getElementById("AddEditStudent6");
    const AddEditStudent7 = document.getElementById("AddEditStudent7");

    const StudentFileInput = document.getElementById("StudentFileInput");
    let StudentFile = StudentFileInput.files[0];

    const AddEditStudentBTN = document.getElementById("AddEditStudentBTN");

    const AddOneStudent = async function() {
        let student = {
            FIO: AddEditStudent1.innerHTML,
            gender: AddEditStudent3.innerHTML,
            name_group: AddEditStudent2.innerHTML,
            date_of_birth: AddEditStudent4.innerHTML,
            email: AddEditStudent5.innerHTML,
            headman: AddEditStudent6.innerHTML,
            info: AddEditStudent7.innerHTML,
            image: StudentFile
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

    const EditOneStudent = async function() {
        let student = {
            id_student: 0,
            FIO: AddEditStudent1.innerHTML,
            gender: AddEditStudent3.innerHTML,
            name_group: AddEditStudent2.innerHTML,
            date_of_birth: AddEditStudent4.innerHTML,
            email: AddEditStudent5.innerHTML,
            headman: AddEditStudent6.innerHTML,
            info: AddEditStudent7.innerHTML,
            image: ""
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
        // let StudentFile = StudentFileInput.files[0];
        // let reader = new FileReader();
        // reader.readAsDataURL(StudentFile);

        // reader.onload = function() {
        //     console.log(reader.result);
        // };

        // AddOneStudent();
    }




    //Удаление студента

    const DeleteStudentBTN = document.getElementById("DeleteStudentBTN");

    const delOneStudent = async function() {
        let data = { "student_id" : "0" };
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
        info: AddEditTeacher6.innerHTML,
        image: ""
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


    AddEditTeacherBTN.onclick = function() {
        // AddOneTeacher();
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

    const EditOneGroup = async function() {
        let group = {
            id_group: 0,
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


    AddEditGroupBTN.onclick = function() {
        // AddOneGroup();
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
                    // var str = '<div class="LeftListBlock_PersonCell JSStudentBTN" id="Student' + (i+1).toString() + '"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"][0] + '</span></div>';
                    var str = '<div class="Groups_Middle_GroupList_Cell"><img src="../static/sysImgs\info.png" class="LeftListBlock_PersonCell_InfoImg"><span>1. ИКБО-01-21</span></div>';
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
    getAllGroups();
};