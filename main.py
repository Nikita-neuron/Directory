from flask import Flask, request, render_template, send_file
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
    return bd.get_student_by_id(int(data["student_id"]))


@app.route("/deleteStudent", methods=["GET"])
def deleteStud():
    data = request.args
    bd.delete_student(int(data["student_id"]))


@app.route("/getTeacher", methods=["GET"])
def getTeach():
    data = request.args
    return bd.get_teacher_by_id(int(data["teacher_id"]))


@app.route("/deleteTeacher", methods=["GET"])
def deleteTeach():
    data = request.args
    bd.delete_teacher(int(data["teacher_id"]))


@app.route("/getGroup", methods=["GET"])
def getGroup():
    data = request.args
    return bd.get_group_by_id(int(data["group_id"]))


@app.route("/deleteGroup", methods=["GET"])
def deleteGroup():
    data = request.args
    bd.delete_group(int(data["group_id"]))


@app.route("/getSubject", methods=["GET"])
def getSub():
    data = request.args
    return bd.get_subject_by_id(int(data["subject_id"]))


@app.route("/deleteSubject", methods=["GET"])
def deleteSub():
    data = request.args
    bd.delete_subject(int(data["subject_id"]))


@app.route("/addTeacher", methods=["POST"])
def addTeach():
    data = request.form
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.add_teacher(data["surname"], data["name"], data["patronymic"], data["email"], data["gender"],
                       data["position"],
                       data["date_of_birth"], data["info"], img)


@app.route("/updateTeacher", methods=["POST"])
def updateTeach():
    data = request.form
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.update_teacher(int(data["teacher_id"]), data["surname"], data["name"], data["patronymic"], data["email"],
                          data["gender"], data["position"],
                          data["date_of_birth"], data["info"], img)


@app.route("/getAllTeachers")
def allTeach():
    return bd.get_all_teachers()


@app.route("/updateStud", methods=["POST"])
def updateStud():
    data = request.form
    group = data["name_group"]
    id = bd.get_group_by_name(group)
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.update_student(int(data["student_id"]), data["surname"], data["name"], data["patronymic"], data["gender"],
                          data["email"],
                          int(id["group_id"]), img, data["date_of_birth"], data["info"])


@app.route("/addStudent", methods=["POST"])
def addStud():
    data = request.form
    group = data["name_group"]
    id = bd.get_group_by_name(group)
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        bd.add_student(data["surname"], data["name"], data["patronymic"], data["gender"], data["email"],
                       int(id["group_id"]),
                       img, data["date_of_birth"], data["info"])


@app.route("/getAllStudents")
def allStud():
    return bd.get_all_students()


@app.route("/updateGroup", methods=["POST"])
def updateGroup():
    data = request.form
    bd.update_group(int(data["group_id"]), data["name"], int(data["id_headman"]), data["level_education"],
                    data["cipher"], data["subdivision"])


@app.route("/addGroup", methods=["POST"])
def addGroup():
    data = request.form
    bd.add_group(data["name"], int(data["id_headman"]), data["level_education"], data["cipher"], data["subdivision"])


@app.route("/getAllGroups")
def allGroups():
    return bd.get_all_groups()


@app.route("/updateSubject", methods=["POST"])
def updateSub():
    data = request.form
    bd.update_subject(int(data["id_subject"]), data["name"], int(data["study_hours"]), data["level_education"], data["info"])


@app.route("/addSubject", methods=["POST"])
def addSub():
    data = request.form
    bd.add_subject(data["name"], int(data["study_hours"]), data["level_education"], data["info"])


@app.route("/getAllSubjects")
def getSubjects():
    return bd.get_all_subjects()


@app.route("/schedule")
def schedule():
    return bd.get_all_timetable()


# @app.route('/static/userImages/<img_src>')
# def photo(img_src):
#     return send_file(io.BytesIO(img), attachment_filename='image.png', mimetype='image/png')


if __name__ == "__main__":
    bd = DataBase()
    app.run(debug=True)