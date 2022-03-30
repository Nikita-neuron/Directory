from flask import Flask, request, render_template, redirect, send_file
import io
from bd import DataBase

# from bd import DataBase
app = Flask(__name__)


# data = DataBase()
@app.route("/")
@app.route("/main")
def main():
    return render_template("index.html")


img = 0


@app.route("/getStudent", methods=["GET"])
def getStud():
    data = request.args
    return bd.get_student_by_id(int(data["id"]))


@app.route("/getTeacher", methods=["GET"])
def getTeach():
    data = request.args
    return bd.get_teacher_by_id(int(data["id"]))


@app.route("/getGroup", methods=["GET"])
def getGroup():
    data = request.args
    return bd.get_group_by_id(int(data["id"]))


@app.get("/getSubject", methods=["GET"])
def getSubj():
    data = request.args
    return bd.get_subject_by_id(int(data["id"]))


@app.route("/addTeacher", methods=["POST"])
def addTeach():
    data = request.form
    bd.add_teacher(data["surname"], data["name"], data["patronymic"], data["email"], data["gender"])


@app.route("/updateTeacher", methods=["POST"])
def updateTeach():
    data = request.form
    bd.update_teacher(int(data["id"]), data["surname"], data["name"], data["patronymic"])


@app.route("/getAllTeachers")
def allTeach():
    return bd.get_all_teachers()


@app.route("/updateStud", methods=["POST"])
def updtateStud():
    data = request.form
    group = data["name_group"]
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.update_student(int(data["id"]), data["surname"], data["name"], data["patronymic"], data["gender"], data["email"],
                          bd.get_group_by_name(group), img)


@app.route("/addStudent", methods=["POST"])
def add():
    data = request.form
    group = data["name_group"]
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.add_student(data["surname"], data["name"], data["patronymic"], data["gender"], data["email"], group,
                       img, data["date_of_birth"], data["characteristic"])


@app.route("/getAllStudents")
def allStud():
    return bd.get_all_students()


@app.route("/updateGroup", methods=["POST"])
def updateGroup():
    data = request.form
    bd.update_group(int(data["id"]), data["name"], data["id_headman"])


@app.route("/addGroup", methods=["POST"])
def addGroup():
    data = request.form
    bd.add_group(data["name"], int(data["id_headman"]))


@app.route("/getAllGroups")
def allGroups():
    return bd.get_all_groups()


@app.route("/updateSubject", methods=["POST"])
def updateSub():
    data = request.form
    bd.update_subject(int(data["id"]), data["name"])


@app.route("/addSubject", methods=["POST"])
def addSub():
    data = request.form
    bd.add_subject(data["name"])


@app.route("/getAllSubjects")
def getSub():
    return bd.get_all_subjects()


@app.route("/schedule")
def schedule():
    return bd.get_all_timetable()


@app.route('/static/userImages/<img_src>')
def photo(img_src):
    return send_file(io.BytesIO(img), attachment_filename='image.png', mimetype='image/png')


if __name__ == "__main__":
    bd = DataBase()
    app.run(debug=True)
