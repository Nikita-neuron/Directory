window.onload = function(){
    let BTNs = [document.getElementById("studentBTN"), document.getElementById("groupsBTN"), document.getElementById("teacherBTN"), document.getElementById("subjectBTN"), document.getElementById("scheduleBTN")];
    let Windows = [document.getElementById("studentWindow"), document.getElementById("groupsWindow"), document.getElementById("teacherWindow"), document.getElementById("subjectWindow"), document.getElementById("scheduleWindow")]

    studentBTN.classList.replace("MenuElement", "MenuElement_BackGreen");

    function changeWindow(BTNnum) {
        for (let i  = 0; i < BTNs.length; i++) {
            BTNs[i].classList.replace("MenuElement_BackGreen", "MenuElement");
            Windows[i].style.display = "none";
        }

        BTNs[BTNnum].classList.replace("MenuElement", "MenuElement_BackGreen");
        Windows[BTNnum].style.display = "flex";
    }

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
};
