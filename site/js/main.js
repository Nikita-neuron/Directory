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

    StudentEditInfoBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";
    }

    StudentAddPersonBTN.onclick = function() {
        StudentEditWindow.style.display = "flex";
    }

    StudentEditWindowExitBTN.onclick = function() {
        StudentEditWindow.style.display = "none";
    }



    const TeacherEditWindow = document.getElementById("TeacherEditWindow");
    const TeacherEditInfoBTN = document.getElementById("TeacherEditInfoBTN");
    const TeacherAddPersonBTN = document.getElementById("TeacherAddPersonBTN");
    const TeacherEditWindowExitBTN = document.getElementById("TeacherEditWindowExitBTN");

    TeacherEditInfoBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";
    }

    TeacherAddPersonBTN.onclick = function() {
        TeacherEditWindow.style.display = "flex";
    }

    TeacherEditWindowExitBTN.onclick = function() {
        TeacherEditWindow.style.display = "none";
    }




    const GroupEditWindow = document.getElementById("GroupEditWindow");
    const EditGroupBTN = document.getElementById("EditGroupBTN");
    const AddGroupBTN = document.getElementById("AddGroupBTN");
    const GroupEditWindowExitBTN = document.getElementById("GroupEditWindowExitBTN");

    EditGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";
    }

    AddGroupBTN.onclick = function() {
        GroupEditWindow.style.display = "flex";
    }

    GroupEditWindowExitBTN.onclick = function() {
        GroupEditWindow.style.display = "none";
    }

    const SubjectEditWindow = document.getElementById("SubjectEditWindow");
    const EditSubjectBTN = document.getElementById("EditSubjectBTN");
    const AddSubjectBTN = document.getElementById("AddSubjectBTN");
    const SubjectEditWindowExitBTN = document.getElementById("SubjectEditWindowExitBTN");

    EditSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";
    }

    AddSubjectBTN.onclick = function() {
        SubjectEditWindow.style.display = "flex";
    }

    SubjectEditWindowExitBTN.onclick = function() {
        SubjectEditWindow.style.display = "none";
    }
};
