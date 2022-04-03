const userImage = document.querySelector(".userImage");
const imageFile = document.querySelector('.imageFile');
const imageSaveBtn = document.querySelector(".image-save");

const idStudent = 3;

const getStudentImage = async function () {
    let url = new URL("http://127.0.0.1:5000/UserImg");
    let response = await fetch(url);
    if (response.ok) {
        let blob = await response.blob();
        console.log(blob);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

imageSaveBtn.addEventListener("click", e => {
    let file = imageFile.files[0];
    console.log(file);
});