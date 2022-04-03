const userImage = document.querySelector(".userImage");
const imageFile = document.querySelector('.imageFile');
const imageSaveBtn = document.querySelector(".image-save");
const imageBox = document.querySelector(".image-box");

const idStudent = 3;

const getStudentImage = function () {
    imageBox.innerHTML = "";
    let html = `<img src="http://127.0.0.1:5000/studentImage/${idStudent}" alt="user" class="userImage">`;
    imageBox.insertAdjacentHTML('beforeend', html);
}

const getDefaultUserImage = async function() {
    let blobImage = await fetch("http://127.0.0.1:5000/static/sysImgs/user.png").then(r => r.blob());
    let file = new File([blobImage], 'image.png', blobImage)
    let formData = new FormData();
    formData.append('image', file);
    sendUserImage(formData);
}

const sendUserImage = async function(blob) {
    let url = new URL("http://127.0.0.1:5000/saveStudentImage/" + idStudent);
    let response = await fetch(url, {
        method: 'POST',
        body: blob
    });
    if (response.ok) {
        window.location.reload();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getStudentImage();

imageSaveBtn.addEventListener("click", e => {
    let file = imageFile.files[0];
    if (!file) {
        getDefaultUserImage();
    }
    else {
        let formData = new FormData();
        formData.append('image', file);
        sendUserImage(formData);
    }
});