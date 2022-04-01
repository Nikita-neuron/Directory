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


# ========= TEACHERS =========

@app.route("/getTeacher", methods=["GET"])
def getTeach():
    data = request.args
    teacher = bd.get_teacher_by_id(int(data["teacher_id"]))
    if teacher is None or len(teacher) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": teacher
        }


@app.route("/deleteTeacher", methods=["GET"])
def deleteTeach():
    data = request.args
    bd.delete_teacher(int(data["teacher_id"]))


@app.route("/addTeacher", methods=["POST"])
def addTeach():
    data = request.form
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        fio = data["FIO"]
        fio = fio.split()
        bd.add_teacher(fio[0], fio[1], fio[2], data["email"], data["gender"],
                       data["position"],
                       data["date_of_birth"], data["info"], img)


@app.route("/updateTeacher", methods=["POST"])
def updateTeach():
    data = request.form
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        fio = data["FIO"]
        fio = fio.split()
        bd.update_teacher(int(data["teacher_id"]), fio[0], fio[1], fio[2], data["email"],
                          data["gender"], data["position"],
                          data["date_of_birth"], data["info"], img)


@app.route("/getAllTeachers")
def allTeach():
    teachers = bd.get_all_teachers()
    if teachers is None or len(teachers) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": teachers
        }


# ========= STUDENTS =========


@app.route("/updateStud", methods=["POST"])
def updateStud():
    data = request.form
    group = data["name_group"]
    id = bd.get_group_by_name(group)
    if request.files:
        fileimage = request.files["image"]
        img = fileimage.read()
        fio = data["FIO"]
        fio = fio.split()
        bd.update_student(int(data["student_id"]), fio[0], fio[1], fio[2], data["gender"],
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
        fio = data["FIO"]
        fio = fio.split()
        bd.add_student(fio[0], fio[1], fio[2], data["gender"], data["email"],
                       int(id["group_id"]),
                       img, data["date_of_birth"], data["info"])


@app.route("/getAllStudents")
def allStud():
    students = bd.get_all_students()
    if students is None or len(students) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": students
        }


@app.route("/getStudent", methods=["GET"])
def getStud():
    data = request.args
    student = bd.get_student_by_id(int(data["student_id"]))
    if student is None or len(student) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": student
        }


@app.route("/deleteStudent", methods=["GET"])
def deleteStud():
    data = request.args
    bd.delete_student(int(data["student_id"]))


# ========= GROUPS ==========


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
    groups = bd.get_all_groups()
    if groups is None or len(groups) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": groups
        }


@app.route("/getGroup", methods=["GET"])
def getGroup():
    data = request.args
    group = bd.get_group_by_id(int(data["group_id"]))
    if group is None or len(group) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": group
        }


@app.route("/deleteGroup", methods=["GET"])
def deleteGroup():
    data = request.args
    bd.delete_group(int(data["group_id"]))


# ======== SUBJECTS ==========


@app.route("/updateSubject", methods=["POST"])
def updateSub():
    data = request.form
    bd.update_subject(int(data["id_subject"]), data["name"], int(data["study_hours"]), data["level_education"],
                      data["info"])


@app.route("/addSubject", methods=["POST"])
def addSub():
    data = request.form
    bd.add_subject(data["name"], int(data["study_hours"]), data["level_education"], data["info"])


@app.route("/getAllSubjects")
def getSubjects():
    subjects = bd.get_all_subjects()
    if subjects is None or len(subjects) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": subjects
        }


@app.route("/getSubject", methods=["GET"])
def getSub():
    data = request.args
    subject = bd.get_subject_by_id(int(data["subject_id"]))
    if subject is None or len(subject) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": subject
        }


@app.route("/deleteSubject", methods=["GET"])
def deleteSub():
    data = request.args
    bd.delete_subject(int(data["subject_id"]))


# ========= TIMETABLE ==========


@app.route("/schedule")
def schedules():
    schedule = bd.get_all_timetable()
    if schedule is None or len(schedule) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": schedule
        }


# @app.route('/static/userImages/<img_src>')
# def photo(img_src):
#     return send_file(io.BytesIO(img), attachment_filename='image.png', mimetype='image/png')


if __name__ == "__main__":
    bd = DataBase()
    app.run(debug=True)
