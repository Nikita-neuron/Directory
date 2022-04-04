window.onload = function(){

    //Окно загрузки

    loadScreen = document.getElementById("loadScreen");

    function setOnLoadScreen() {
        loadScreen.style.display = "flex";
    }

    function setOffLoadScreen() {
        loadScreen.style.display = "none";
    }

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

    var ScheduleMode = 1;

    radioElements[0].onclick = function() {
        changeRadio(0);
        ScheduleMode = 1;
        ScheduleGetAllGroups("Бакалавриат");
    }

    radioElements[1].onclick = function() {
        changeRadio(1);
        ScheduleMode = 2;
        ScheduleGetAllGroups("Магистратура");
    }

    radioElements[2].onclick = function() {
        changeRadio(2);
        ScheduleMode = 3;
        ScheduleGetAllGroups("Аспирантура");
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

    let ScheduleEditWindow = document.getElementById("ScheduleEditWindow");
    let editScheduleBTN = document.getElementById("editScheduleBTN");
    let CloseEditSchedule = document.getElementById("CloseEditSchedule");
    let SaveEditGroupId = document.getElementById("SaveEditGroupId");

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

    //Запросы

    //Получение всех студентов и вывод списка
    StudentList = document.getElementById("StudentList");

    const getAllStudents = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllStudents");
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneStudent(' + json["data"][i]["id"] + ')" class="LeftListBlock_PersonCell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"] + '</span></div>';
                    StudentList.innerHTML += str;
                }

            }
            else {
                console.log("База данных студентов пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
            console.log("test");
        }
    }
    getAllStudents();


    //Добавление нового студента

    const addStudentData = async function(formData) {
        let url = new URL("http://127.0.0.1:5000/addStudent");
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    const AddEditStudent1 = document.getElementById("AddEditStudent1");
    const AddEditStudent2 = document.getElementById("AddEditStudent2");
    const AddEditStudent3 = document.getElementById("AddEditStudent3");
    const AddEditStudent4 = document.getElementById("AddEditStudent4");
    const AddEditStudent5 = document.getElementById("AddEditStudent5");
    const AddEditStudent6 = document.getElementById("AddEditStudent6");
    const AddEditStudent7 = document.getElementById("AddEditStudent7");

    const AddEditStudentBTN = document.getElementById("AddEditStudentBTN");

    const StudentFileInput = document.getElementById("StudentFileInput");

    const AddOneStudent = async function() {
        let formData = new FormData();
        formData.append("FIO", AddEditStudent1.innerHTML);
        formData.append("gender", AddEditStudent3.innerHTML);
        formData.append("name_group", AddEditStudent2.innerHTML);
        formData.append("date_of_birth", AddEditStudent4.innerHTML);
        formData.append("email", AddEditStudent5.innerHTML);
        formData.append("headman", AddEditStudent6.innerHTML);
        formData.append("info", AddEditStudent7.innerHTML);

        let file = StudentFileInput.files[0];
        if (!file) {
            setOnLoadScreen();
            let blobImage = await fetch("http://127.0.0.1:5000/static/sysImgs/user.png").then(r => r.blob());
            setOffLoadScreen();
            file = new File([blobImage], 'image.png', blobImage)
            formData.append('image', file);
        }
        else {
            formData.append('image', file);
        }

       addStudentData(formData);
    }

    //Обновление студента

    SaveEditStudentId = document.getElementById("SaveEditStudentId");
    let StudentPhotoField = document.getElementById("StudentPhotoField");

    // const getDefaultUserImage = async function() {
    //     let blobImage = await fetch("http://127.0.0.1:5000/static/sysImgs/user.png").then(r => r.blob());
    //     let file = new File([blobImage], 'image.png', blobImage)
    //     let formData = new FormData();
    //     formData.append('image', file);
    //     sendUserImage(formData);
    // }
    
    const updateStudentData = async function(formData) {
        let url = new URL("http://127.0.0.1:5000/updateStud");
        setOnLoadScreen();
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        setOffLoadScreen();
        if (response.ok) {
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    const EditOneStudent = async function() {
        var Student_ID = -1
        if (SaveEditStudentId.innerHTML != "-") {
            var Student_ID = Number(SaveEditStudentId.innerHTML)
        }
        else {
            return 0;
        }

        let formData = new FormData();
        formData.append("FIO", AddEditStudent1.innerHTML);
        formData.append("gender", AddEditStudent3.innerHTML);
        formData.append("name_group", AddEditStudent2.innerHTML);
        formData.append("date_of_birth", AddEditStudent4.innerHTML);
        formData.append("email", AddEditStudent5.innerHTML);
        formData.append("headman", AddEditStudent6.innerHTML);
        formData.append("info", AddEditStudent7.innerHTML);
        formData.append("id_student", Student_ID);

        let file = StudentFileInput.files[0];
        if (!file) {
            setOnLoadScreen();
            let blobImage = await fetch(StudentPhotoField.src).then(r => r.blob());
            setOffLoadScreen();
            file = new File([blobImage], 'image.png', blobImage)
            formData.append('image', file);
        }
        else {
            formData.append('image', file);
        }
        updateStudentData(formData);
    }


    AddEditStudentBTN.onclick = function() {
        if (StudentEditMode == true) {
            EditOneStudent();
        }
        else if (StudentEditMode == false) {
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteStudentBTN.onclick = function() {
        delOneStudent();
    }

















    

    //Добавление нового преподавателя

    const AddEditTeacher1 = document.getElementById("AddEditTeacher1");
    const AddEditTeacher2 = document.getElementById("AddEditTeacher2");
    const AddEditTeacher3 = document.getElementById("AddEditTeacher3");
    const AddEditTeacher4 = document.getElementById("AddEditTeacher4");
    const AddEditTeacher5 = document.getElementById("AddEditTeacher5");
    const AddEditTeacher6 = document.getElementById("AddEditTeacher6");
    const AddEditTeacherPhoto = document.getElementById("TeacherFileInput");

    const AddEditTeacherBTN = document.getElementById("AddEditTeacherBTN");

    const addTeacherData = async function(formData) {
        let url = new URL("http://127.0.0.1:5000/addTeacher");
        setOnLoadScreen();
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        setOffLoadScreen();
        if (response.ok) {
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    const updateTeacherData = async function(formData) {
        let url = new URL("http://127.0.0.1:5000/updateTeacher");
        setOnLoadScreen();
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        setOffLoadScreen();
        if (response.ok) {
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    const AddOneTeacher = async function() {
        let formData = new FormData();
        formData.append("FIO", AddEditTeacher1.innerHTML);
        formData.append("position", AddEditTeacher2.innerHTML);
        formData.append("gender", AddEditTeacher3.innerHTML);
        formData.append("date_of_birth", AddEditTeacher4.innerHTML);
        formData.append("email", AddEditTeacher5.innerHTML);
        formData.append("info", AddEditTeacher6.innerHTML);

        let file = AddEditTeacherPhoto.files[0];
        if (!file) {
            setOnLoadScreen();
            let blobImage = await fetch("http://127.0.0.1:5000/static/sysImgs/user.png").then(r => r.blob());
            setOffLoadScreen();
            file = new File([blobImage], 'image.png', blobImage)
            formData.append('image', file);
        }
        else {
            formData.append('image', file);
        }

        addTeacherData(formData);
    }


    // Обновление преподавателей

    SaveEditTeacherId = document.getElementById("SaveEditTeacherId");
    let TeacherPhotoField = document.getElementById("TeacherPhotoField");

    const EditOneTeacher = async function() {
        let TeacherID = -1;
        if (SaveEditTeacherId.innerHTML != "-") {
            TeacherID = Number(SaveEditTeacherId.innerHTML)
        }
        else {
            return 0;
        }

        let formData = new FormData();
        formData.append("FIO", AddEditTeacher1.innerHTML);
        formData.append("position", AddEditTeacher2.innerHTML);
        formData.append("gender", AddEditTeacher3.innerHTML);
        formData.append("date_of_birth", AddEditTeacher4.innerHTML);
        formData.append("email", AddEditTeacher5.innerHTML);
        formData.append("info", AddEditTeacher6.innerHTML);
        formData.append("id_teacher", TeacherID);

        let file = AddEditTeacherPhoto.files[0];
        if (!file) {
            setOnLoadScreen();
            let blobImage = await fetch(TeacherPhotoField.src).then(r => r.blob());
            setOffLoadScreen();
            file = new File([blobImage], 'image.png', blobImage)
            formData.append('image', file);
        }
        else {
            formData.append('image', file);
        }

        updateTeacherData(formData);
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                for (let i = 0; i < json["data"].length; i++) {
                    var str = '<div onclick="getOneTeacher(' + json["data"][i]["id"] + ')" class="LeftListBlock_PersonCell"><img src="../static/sysImgs/info.png" class="LeftListBlock_PersonCell_InfoImg"><span>' + (i+1).toString() + '. ' + json["data"][i]["surname"][0] + '. ' + json["data"][i]["name"][0] + '. ' + json["data"][i]["patronymic"] + '</span></div>'
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
        let data = { "id_teacher" : Number(SaveEditTeacherId.innerHTML) };
        let url = new URL("http://127.0.0.1:5000/deleteTeacher");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOnLoadScreen();
        if (response.ok) {
            let json = await response.json();
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
        });
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            console.log(json);
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
        });
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            console.log(json);
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(subject)
        });
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            console.log(json);
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(subject)
        });
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            console.log(json);
            window.location.reload();
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();

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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            window.location.reload();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    DeleteSubjectBTN.onclick = function() {
        delOneSubject();
    }

    // Вывод расписания

    const ScheduleList = document.getElementById("ScheduleTableList");

    const getOneSchedule = async function(Group_ID) {
        let data = { "id_group" : Group_ID };
        let url = new URL("http://127.0.0.1:5000/getTimetable");
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();

            console.log(json);
            
            var ScheduleStr = ""
            if (json["status"] != "None") {
                let DayMassives = [[], [], [], [], [], []];
                let DayMassivesPairNumbers = [[], [], [], [], [], []];
                let NameOfDaysMassive = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

                for (let i = 0; i < json["data"].length; i++) {
                    DayMassives[json["data"][i]["data"]["day_of_week_number"] - 1].push(i);
                    DayMassivesPairNumbers[json["data"][i]["data"]["day_of_week_number"] - 1].push(json["data"][i]["data"]["pair_number"])
                }

                console.log(DayMassives[1]);
                console.log(DayMassivesPairNumbers[1]);

                ScheduleStr = `<table class="Schedule_RightInfo_Table" border="all">
                    <tr class="Schedule_RightInfo_TableTopic">
                        <td>День недели</td>
                        <td colspan="3">${json["name"]}</td>
                    </tr>
                    <tr class="Schedule_RightInfo_TableSecondTopic">
                        <td>-</td>
                        <td>Дисциплина</td>
                        <td>№ Каб.</td>
                        <td>Преподаватель</td>
                    </tr>`

                for (let Day = 0; Day < 6; Day++) {
                    if (DayMassives[Day].length > 0) {
                        if (DayMassivesPairNumbers[Day].indexOf(1, 0) != -1) {
                            ScheduleStr += `
                            <tr class="Schedule_RightInfo_TableChetRow">
                                <td rowspan="7">${NameOfDaysMassive[Day]}</td>
                                <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(1, 0)]]["subject"]}</td>
                                <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(1, 0)]]["data"]["room"]}</td>
                                <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(1, 0)]]["surname"][0] + '. ' + json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(1, 0)]]["name"][0] + '. ' + json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(1, 0)]]["patronymic"]}</td>
                            </tr>`
                        }
                        else {
                            ScheduleStr += `
                            <tr class="Schedule_RightInfo_TableChetRow">
                                <td rowspan="7">${NameOfDaysMassive[Day]}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>`
                        }
    
                        for (let i = 2; i < 8; i++) {
                            if (DayMassivesPairNumbers[Day].indexOf(i, 0) != -1) {
                                ScheduleStr += `<tr class="Schedule_RightInfo_TableChetRow">
                                    <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(i, 0)]]["subject"]}</td>
                                    <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(i, 0)]]["data"]["room"]}</td>
                                    <td>${json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(i, 0)]]["surname"][0] + '. ' + json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(i, 0)]]["name"][0] + '. ' + json["data"][DayMassives[Day][DayMassivesPairNumbers[Day].indexOf(i, 0)]]["patronymic"]}</td>
                                </tr>`
                            }
                            else {
                                ScheduleStr += `<tr class="Schedule_RightInfo_TableChetRow">
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>`
                            }
                        }
                    }

                    else {
                        ScheduleStr += `
                        <tr class="Schedule_RightInfo_TableChetRow">
                            <td rowspan="7">${NameOfDaysMassive[Day]}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>`

                        for (let i = 0; i < 6; i++) {
                            ScheduleStr += `<tr class="Schedule_RightInfo_TableChetRow">
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>`
                        }
                    }
                }

                ScheduleList.innerHTML += ScheduleStr
            }
            else {
                console.log("В этой группе нет расписания", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    const ScheduleGetAllGroups = async function(Group_Level) {
        let url = new URL("http://127.0.0.1:5000/getAllGroups");
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();

            if (json["status"] != "None") {

                ScheduleList.innerHTML = "";

                for (let i = 0; i < json["data"].length; i++) {
                    if (Group_Level.toLowerCase() == json["data"][i]["level_education"].toLowerCase()) {
                        getOneSchedule(json["data"][i]["id"]);
                    }
                }

                console.log(json["data"]);

            }
            else {
                console.log("База данных групп пуста", json);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    ScheduleGetAllGroups("Бакалавриат");


    // Редактирование расписания
    const chooseDayButtons = document.querySelectorAll(".choose-day-btn");
    const addTimetablePair = document.querySelector(".add-timetable-pair");
    const mainBoxSave = document.querySelector(".main-box-save");
    const chooseDayTimetable = document.querySelector(".choose-day-timetable");
    
    let idGroup = 1;

    let groupDBTimetable = [];
    let currentDay = "1";
    let subjects = [];
    let teachers = [];
    
    const EditSchedulegetAllSubjects = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllSubjects");
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
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
    
    const EditSchedulegetAllTeachers = async function() {
        let url = new URL("http://127.0.0.1:5000/getAllTeachers");
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
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
    
        setOnLoadScreen();
        let response = await fetch(url);
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
    
            if (json["status"] != "None") {
                groupDBTimetable = json["data"];
                updateViewTimetable(currentDay);
            }
            else {
                console.log("База данных пуста", json);
                groupDBTimetable = [];
                updateViewTimetable(currentDay);
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    
    const sendGroupTimetable = async function (data) {
        let url = new URL("http://127.0.0.1:5000/addGroupTimetable");
        setOnLoadScreen();
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        setOffLoadScreen();
        if (response.ok) {
            let json = await response.json();
            ScheduleEditWindow.style.display = "none"
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
    
        sendGroupTimetable({
            "status": "OK",
            "id_group": idGroup,
            "timetable": groupDBTimetable
        });
    });

    ScheduleEditWindow = document.getElementById("ScheduleEditWindow");
    editScheduleBTN = document.getElementById("editScheduleBTN");
    CloseEditSchedule = document.getElementById("CloseEditSchedule");
    SaveEditGroupId = document.getElementById("SaveEditGroupId");

    editScheduleBTN.onclick = function() {
        let GroupInfo1 = document.getElementById("GroupInfo1");
        if (GroupInfo1.innerHTML != "-") {
            ScheduleEditWindow.style.display = "flex";
            idGroup = Number(SaveEditGroupId.innerHTML);

            EditSchedulegetAllSubjects();
            EditSchedulegetAllTeachers();
            getGroupTimetable();
        }
    }

    CloseEditSchedule.onclick = function() {
        ScheduleEditWindow.style.display = "none"
    }
};