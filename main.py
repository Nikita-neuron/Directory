from flask import Flask, request, render_template, send_file
import io
from bd import DataBase

app = Flask(__name__)


@app.route("/")
@app.route("/main")
def main():
    return render_template("index.html")


@app.route("/editWindow")
def editWindow():
    return render_template("editWindow.html")


@app.route("/imageUpload")
def imageUpload():
    return render_template("imageUpload.html")


teachers_arr = []
group_arr = []
img = 0


# ========= TEACHERS =========

@app.route("/getTeacher", methods=["GET"])
def getTeach():
    data = request.args
    teacher = bd.get_teacher_by_id(int(data["id_teacher"]))
    if teacher is None or len(teacher) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        teacher["image"] = ""
        return {
            "status": "OK",
            "data": teacher
        }


@app.route("/deleteTeacher", methods=["GET"])
def deleteTeach():
    data = request.args
    bd.delete_teacher(int(data["id_teacher"]))
    return {
        "status": "OK"
    }


@app.route("/addTeacher", methods=["POST"])
def addTeach():
    data = request.form
    fio = data["FIO"]
    fio = fio.split()
    image = ""
    if request.files: image = request.files["image"].read()
    bd.add_teacher(fio[0], fio[1], fio[2], data["email"], data["gender"],
                   data["position"], data["date_of_birth"], data["info"], image)
    return {
        "status": "OK"
    }


@app.route("/updateTeacher", methods=["POST"])
def updateTeach():
    data = request.form
    fio = data["FIO"]
    fio = fio.split()
    image = ""
    if request.files: image = request.files["image"].read()
    bd.update_teacher(int(data["id_teacher"]), fio[0], fio[1], fio[2], data["email"],
                      data["gender"], data["position"], data["date_of_birth"], data["info"], image)
    return {
        "status": "OK"
    }


@app.route("/getAllTeachers")
def allTeach():
    teachers = bd.get_all_teachers()
    if teachers is None or len(teachers) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        for teacher in teachers:
            teacher["image"] = ""
        return {
            "status": "OK",
            "data": teachers
        }


# ========= STUDENTS =========


@app.route("/updateStud", methods=["POST"])
def updateStud():
    data = request.form
    group = data["name_group"]
    group = bd.get_group_by_name(group)
    group_id = 0
    if group is not None: group_id = int(group["id"])
    fio = data["FIO"]
    fio = fio.split()
    image = ""
    if request.files: image = request.files["image"].read()
    bd.update_student(int(data["id_student"]), fio[0], fio[1], fio[2], data["gender"],
                      data["email"], group_id, image, data["date_of_birth"], data["info"])
    return {
        "status": "OK"
    }


@app.route("/addStudent", methods=["POST"])
def addStud():
    data = request.form
    group = data["name_group"]
    group = bd.get_group_by_name(group)
    group_id = 0
    if group is not None: group_id = int(group["id"])
    fio = data["FIO"]
    fio = fio.split()
    image = ""
    if request.files: image = request.files["image"].read()
    bd.add_student(fio[0], fio[1], fio[2], data["gender"], data["email"],
                   group_id, image, data["date_of_birth"], data["info"])
    if data["headman"] == "Да" or data["headman"] == "ДА":
        students = bd.get_all_students()
        for student in students:
            if student["name"] == fio[1] and student["surname"] == fio[0] and student["patronymic"] == fio[2]:
                id_student = student["id"]
                group = bd.get_group_by_id(student["id_group"])
                bd.update_group(group["id"], group["name"], id_student, group["level_education"],
                                group["cipher"], group["subdivision"])
                break
    return {
        "status": "OK"
    }


@app.route("/getAllStudents")
def allStud():
    students = bd.get_all_students()
    if students is None or len(students) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        for student in students:
            student["image"] = ""
            group = student["id_group"]
            group = bd.get_group_by_id(group)
            if group is None:
                student["headman"] = "Нет"
            else:
                id_headman = group["id_headman"]
                if id_headman == student["id"]:
                    student["headman"] = "Да"
                else:
                    student["headman"] = "Нет"
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
        student["image"] = ""
        group = student["id_group"]
        group = bd.get_group_by_id(group)
        if group is None:
            student["headman"] = "NO"
            return {
                "status": "OK",
                "data": student,
                "group": {}
            }
        id_headman = group["id_headman"]
        if id_headman == int(data["student_id"]):
            student["headman"] = "YES"
        else:
            student["headman"] = "NO"
        return {
            "status": "OK",
            "data": student,
            "group": group["name"]
        }


@app.route("/deleteStudent", methods=["GET"])
def deleteStud():
    data = request.args
    bd.delete_student(int(data["student_id"]))
    return {
        "status": "OK"
    }


# ========= GROUPS ==========


@app.route("/updateGroup", methods=["POST"])
def updateGroup():
    data = request.json
    headman = data["headman"]
    headman = headman.split()
    students = bd.get_all_students()
    id_headman = 0
    for student in students:
        if headman[0] == student["surname"] and headman[1] == student["name"] and headman[2] == student["patronymic"]:
            id_headman = student["id"]
            break
    bd.update_group(int(data["id_group"]), data["name"], id_headman, data["level_education"],
                    data["cipher"], data["subdivision"])
    return {
        "status": "OK"
    }


@app.route("/addGroup", methods=["POST"])
def addGroup():
    data = request.json
    headman = data["headman"]
    headman = headman.split()
    students = bd.get_all_students()
    id_student = 0
    if len(headman) == 3:
        for student in students:
            if headman[0] == student["surname"] and headman[1] == student["name"] and headman[2] == student[
                "patronymic"]:
                id_student = student["id"]
                break
    bd.add_group(data["name"], id_student, data["level_education"], data["cipher"], data["subdivision"])
    return {
        "status": "OK"
    }


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
    group = bd.get_group_by_id(int(data["id_group"]))
    students = bd.get_all_students()
    students_group = []
    for student in students:
        if int(student["id_group"]) == int(data["id_group"]):
            students_group.append({
                "name": student["name"],
                "surname": student["surname"],
                "patronymic": student["patronymic"]
            })
    if group is None or len(group) == 0:
        return {
            "status": "None",
            "data": {},
            "group": students_group
        }
    else:
        return {
            "status": "OK",
            "data": group,
            "group": students_group
        }


@app.route("/deleteGroup", methods=["GET"])
def deleteGroup():
    data = request.args
    bd.delete_group(int(data["id_group"]))
    return {
        "status": "OK"
    }


# ======== SUBJECTS ==========


@app.route("/updateSubject", methods=["POST"])
def updateSub():
    data = request.json
    bd.update_subject(int(data["id_subject"]), data["name"], int(data["study_hours"]), data["level_education"],
                      data["info"])
    return {
        "status": "OK"
    }


@app.route("/addSubject", methods=["POST"])
def addSub():
    data = request.json
    bd.add_subject(data["name"], int(data["study_hours"]), data["level_education"], data["info"])
    return {
        "status": "OK"
    }


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
    subject = bd.get_subject_by_id(int(data["id_subject"]))
    if subject is None or len(subject) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        teachers = []
        groups = []
        schedules_a = bd.get_subject_timetable_by_id(int(data["id_subject"]))
        for schedule in schedules_a:
            teacher = bd.get_teacher_by_id(schedule["id_teacher"])
            group = bd.get_group_by_id(schedule["id_group"])
            teachers.append({
                "name": teacher["name"],
                "surname": teacher["surname"],
                "patronymic": teacher["patronymic"]
            })
            groups.append(group["name"])
        if teachers is None or len(teachers) == 0 or groups is None or len(groups) == 0:
            return{
                "status": "OK",
                "data": subject
            }
        else:
            return {
                "status": "OK",
                "data": subject,
                "teachers": teachers,
                "groups": groups
            }


@app.route("/deleteSubject", methods=["GET"])
def deleteSub():
    data = request.args
    bd.delete_subject(int(data["id_subject"]))
    return {
        "status": "OK"
    }


# ========= TIMETABLE/SCHEDULE ==========


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


@app.route("/getTimetable", methods=["GET"])
def timetable_group():
    data = request.args
    timetable = bd.get_group_timetable_by_id(int(data["id_group"]))
    if timetable is None or len(timetable) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        group_timetable = []
        group = bd.get_group_by_id(data["id_group"])
        schedule = bd.get_all_timetable()
        for day in schedule:
            teacher_name = ""
            teacher_surname = ""
            teacher_patronymic = ""
            subject_name = ""
            teacher = bd.get_teacher_by_id(day["id_teacher"])
            if teacher is not None:
                teacher_name = teacher["name"]
                teacher_surname = teacher["surname"]
                teacher_patronymic = teacher["patronymic"]
            subject = bd.get_subject_by_id(day["id_subject"])
            if subject is not None: subject_name = subject["name"]
            if day["id_group"] == int(data["id_group"]):
                group_timetable.append({
                    "data": day,
                    "name": teacher_name,
                    "surname": teacher_surname,
                    "patronymic": teacher_patronymic,
                    "subject": subject_name
                })
        return {
            "name": group["name"],
            "level_education": group["level_education"],
            "data": group_timetable
        }


@app.route("/getGroupTimetable", methods=["GET"])
def getTimetable():
    data = request.args
    timetable = bd.get_group_timetable_by_id(int(data["id_group"]))
    if timetable is None or len(timetable) == 0:
        return {
            "status": "None",
            "data": {}
        }
    else:
        return {
            "status": "OK",
            "data": timetable
        }


# @app.route("/timetableByLevelEducation", methods=["GET"])
# def levelTimetable():


@app.route("/addGroupTimetable", methods=["POST"])
def addTimetable():
    data = request.json
    group_timetable = data["timetable"]
    bd.delete_timetable_by_group_id(int(data["id_group"]))
    for timetableGroup in group_timetable:
        bd.add_group_timetable(int(timetableGroup["id_subject"]), int(timetableGroup["id_group"]),
                               int(timetableGroup["day_of_week_number"]), timetableGroup["pair_number"],
                               timetableGroup["even_odd"], int(timetableGroup["id_teacher"]),
                               timetableGroup["room"])
    return {
        "status": "OK"
    }


@app.route("/studentImage/<id_student>", methods=["GET"])
def student_image(id_student):
    student = bd.get_student_by_id(int(id_student))
    student_img = student["image"]
    return send_file(io.BytesIO(student_img), download_name='img_src.png', mimetype='image/png')


@app.route("/teacherImage/<id_teacher>", methods=["GET"])
def teacher_image(id_teacher):
    teacher = bd.get_teacher_by_id(int(id_teacher))
    teacher_img = teacher["image"]
    return send_file(io.BytesIO(teacher_img), download_name='img_src.png', mimetype='image/png')


@app.route("/saveStudentImage/<id_student>", methods=["POST"])
def save(id_student):
    print(request.form.to_dict())
    if request.files:
        image = request.files["image"].read()
        student = bd.get_student_by_id(id_student)
        if student is not None:
            bd.update_student(student["id"], student["surname"], student["name"], student["patronymic"],
                              student["gender"], student["email"], student["id_group"], image,
                              student["date_of_birth"], student["info"])
    return {
        "status": "OK"
    }


if __name__ == "__main__":
    bd = DataBase()
    app.run(debug=True)
    bd.close()
