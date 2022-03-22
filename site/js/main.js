window.onload = function(){
    let BTNs = [document.getElementById("studentBTN"), document.getElementById("groupsBTN")];
    let Windows = [document.getElementById("studentWindow"), document.getElementById("groupsWindow")]

    studentBTN.style.backgroundColor = "#47BE82";

    function changeWindow(BTNnum) {
        for (let i  = 0; i < BTNs.length; i++) {
            BTNs[i].style.backgroundColor = "rgb(34, 34, 34)";
            Windows[i].style.display = "none";
        }

        BTNs[BTNnum].style.backgroundColor = "#47BE82";
        Windows[BTNnum].style.display = "flex";
    }

    BTNs[0].onclick = function() {
        changeWindow(0);

        // studentWindow.style.display = "flex";
        // groupsWindow.style.display = "none";

        // studentBTN.style.backgroundColor = "#47BE82";
        // groupsBTN.style.backgroundColor = "rgb(34, 34, 34)";
    }

    BTNs[1].onclick = function() {
        changeWindow(1);

        // studentWindow.style.display = "none";
        // groupsWindow.style.display = "flex";

        // studentBTN.style.backgroundColor = "rgb(34, 34, 34)";
        // groupsBTN.style.backgroundColor = "#47BE82";
    }
};
