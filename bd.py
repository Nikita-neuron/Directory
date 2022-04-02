import psycopg2

from config import HOST, USER, PASSWORD, DB_NAME


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class DataBase(metaclass=Singleton):
    def __init__(self):
        try:
            self.connection = psycopg2.connect(
                host=HOST,
                user=USER,
                password=PASSWORD,
                dbname=DB_NAME)
            self.connection.autocommit = True
            print("[INFO DB] Connection successful")
        except Exception as _ex:
            print("[INFO DB] Error with connection", _ex)

    def close(self):
        if self.connection:
            self.connection.close()
            print("[INFO DB] PostgreSQL connection closed")

    def get_server_version(self):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(
                    "SELECT version();"
                )
                print(f"Server version: {cursor.fetchone()}")
        except Exception as _ex:
            print("[INFO DB] Error:", _ex)

    def insert_query(self, query, data):
        try:
            with self.connection.cursor() as cursor:
                if data is not None:
                    cursor.execute(query, data)
                else:
                    cursor.execute(query)
        except Exception as _ex:
            print("[INFO DB] Error:", _ex)

    def get_query(self, query, data=None):
        try:
            with self.connection.cursor() as cursor:
                if data:
                    cursor.execute(query, [data])
                else:
                    cursor.execute(query)
                return cursor.fetchall()
        except Exception as _ex:
            print("[INFO DB] Error:", _ex)
            return None

    # ========= STUDENTS ===========

    def get_all_students(self):
        students_arr = []
        query = "SELECT * FROM students"
        data = self.get_query(query)
        if data:
            for student in data:
                students_arr.append({
                    "id": student[0],
                    "surname": student[1],
                    "name": student[2],
                    "patronymic": student[3],
                    "gender": student[4],
                    "email": student[5],
                    "id_group": student[6],
                    "image": student[7],
                    "date_of_birth": student[8],
                    "info": student[9]
                })
        return students_arr

    def get_student_by_id(self, student_id):
        student = None
        query = "SELECT * FROM students WHERE id = (%s)"
        data = self.get_query(query, data=str(student_id))
        if data:
            data = data[0]
            student = {
                "id": data[0],
                "surname": data[1],
                "name": data[2],
                "patronymic": data[3],
                "gender": data[4],
                "email": data[5],
                "id_group": data[6],
                "image": data[7],
                "date_of_birth": data[8],
                "info": data[9]
            }
        return student

    def get_student_attendance_by_id(self, student_id):
        attendance = []
        query = "SELECT * FROM attendance WHERE id = (%s)"
        data = self.get_query(query, data=str(student_id))
        if data:
            for elem in data:
                attendance.append({
                    "id_subject": elem[0],
                    "id_student": elem[1],
                    "id_day": elem[2],
                    "was_not_was": elem[3]
                })
        return attendance

    def add_student(self, surname, name, patronymic, gender, email, id_group, image, date_of_birth, info):
        insert_query = """INSERT INTO students (surname, name, patronymic, gender, email, id_group, image, 
                            date_of_birth, info) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        student_tuple = (surname, name, patronymic, gender, email, id_group, image, date_of_birth, info)
        self.insert_query(insert_query, student_tuple)

    def add_student_attendance(self, student_id, id_subject, id_day, was_not_was):
        insert_query = """INSERT INTO attendance (id_subject, id_student, id_day, was_not_was) 
                                                  VALUES (%s, %s, %s, %s)"""
        student_tuple = (id_subject, student_id, id_day, was_not_was)
        self.insert_query(insert_query, student_tuple)

    def update_student(self, student_id, surname, name, patronymic, gender, email,
                       id_group, image, date_of_birth, info):
        insert_query = """UPDATE students 
                            SET surname = %s, 
                            name = %s, 
                            patronymic = %s, 
                            gender = %s, 
                            email = %s, 
                            id_group = %s, 
                            image = %s,
                            date_of_birth = %s,
                            info = %s
                            WHERE id = %s"""
        student_tuple = (surname, name, patronymic, gender, email, id_group, image, date_of_birth,
                         info, student_id)
        self.insert_query(insert_query, student_tuple)

    def update_student_attendance_by_id(self, student_id, id_subject, id_day, was_not_was):
        insert_query = """UPDATE attendance 
                            SET id_subject = %s, 
                            id_day = %s, 
                            was_not_was = %s 
                            WHERE id_student = %s"""
        student_tuple = (id_subject, id_day, was_not_was, student_id)
        self.insert_query(insert_query, student_tuple)

    def delete_student(self, student_id):
        tables = ["attendance"]
        for table in tables:
            insert_query = """DELETE FROM """ + table + """ WHERE id_student = %s"""
            student_tuple = student_id
            self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM students WHERE id = %s"""
        student_tuple = student_id
        self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM groups WHERE id_headman = %s"""
        student_tuple = student_id
        self.insert_query(insert_query, student_tuple)

    # ======= TEACHERS ======

    def get_all_teachers(self):
        teachers_arr = []
        query = "SELECT * FROM teachers"
        data = self.get_query(query)
        if data:
            for teacher in data:
                teachers_arr.append({
                    "id": teacher[0],
                    "surname": teacher[1],
                    "name": teacher[2],
                    "patronymic": teacher[3],
                    "email": teacher[4],
                    "gender": teacher[5],
                    "position": teacher[6],
                    "date_of_birth": teacher[7],
                    "info": teacher[8],
                    "image": teacher[9]
                })
        return teachers_arr

    def get_teacher_by_id(self, teacher_id):
        teacher = None
        query = "SELECT * FROM teachers WHERE id = (%s)"
        data = self.get_query(query, data=str(teacher_id))
        if data:
            data = data[0]
            teacher = {
                "id": data[0],
                "surname": data[1],
                "name": data[2],
                "patronymic": data[3],
                "email": data[4],
                "gender": data[5],
                "position": data[6],
                "date_of_birth": data[7],
                "info": data[8],
                "image": data[9]
            }
        return teacher

    def get_teacher_subjects(self, teacher_id):
        subjects_id = []
        query = "SELECT * FROM subjects_teachers WHERE id_teacher = (%s)"
        data = self.get_query(query, data=str(teacher_id))
        if data:
            for subject in data:
                subjects_id.append(subject[1])
        return subjects_id

    def add_teacher(self, surname, name, patronymic, email, gender, position, date_of_birth, info, image):
        insert_query = """INSERT INTO teachers (surname, name, patronymic, email, gender, position, date_of_birth, info,
                          image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        student_tuple = (surname, name, patronymic, email, gender, position, date_of_birth, info, image)
        self.insert_query(insert_query, student_tuple)

    def update_teacher(self, teacher_id, surname, name, patronymic, email, gender, position, date_of_birth, info, image):
        insert_query = """UPDATE teachers 
                            SET surname = %s, 
                            name = %s, 
                            patronymic = %s, 
                            email = %s,
                            gender = %s,
                            position = %s,
                            date_of_birth = %s,
                            info = %s,
                            image = %s
                            WHERE id = %s"""
        student_tuple = (surname, name, patronymic, email, gender, position, date_of_birth, info, image, teacher_id)
        self.insert_query(insert_query, student_tuple)

    def delete_teacher(self, teacher_id):
        tables = ["subjects_groups", "subjects_groups"]
        for table in tables:
            insert_query = """DELETE FROM """ + table + """ WHERE id_teacher = %s"""
            student_tuple = teacher_id
            self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM teachers WHERE id = %s"""
        student_tuple = teacher_id
        self.insert_query(insert_query, student_tuple)

    # ====== SUBJECTS ======

    def get_all_subjects(self):
        subjects_arr = []
        query = "SELECT * FROM subjects"
        data = self.get_query(query)
        if data:
            for subject in data:
                subjects_arr.append({
                    "id": subject[0],
                    "name": subject[1],
                    "study_hours": subject[2],
                    "level_education": subject[3],
                    "info": subject[4]
                })
        return subjects_arr

    def get_subject_by_id(self, subject_id):
        subject = None
        query = "SELECT * FROM subjects WHERE id = (%s)"
        data = self.get_query(query, data=str(subject_id))
        if data:
            data = data[0]
            subject = {
                "id": data[0],
                "name": data[1],
                "study_hours": data[2],
                "level_education": data[3],
                "info": data[4]
            }
        return subject

    def get_subject_timetable_by_id(self, subject_id):
        attendance_arr = []
        query = "SELECT * FROM subjects_groups WHERE id_subject = (%s)"
        data = self.get_query(query, data=str(subject_id))
        if data:
            for attendance in data:
                attendance_arr.append({
                    "id_subject": attendance[0],
                    "id_group": attendance[1],
                    "day_of_week_number": attendance[2],
                    "pair_number": attendance[3],
                    "even_odd": attendance[4],
                    "id_teacher": attendance[5],
                    "room": attendance[6]
                })
        return attendance_arr

    def get_subjects_by_group(self, group_id):
        subjects_arr = []
        query = "SELECT * FROM subjects_groups WHERE id_group = (%s)"
        data = self.get_query(query, data=str(group_id))
        if data:
            for subject in data:
                subjects_arr.append({
                    "id_subject": subject[0],
                    "id_group": subject[1],
                    "day_of_week_number": subject[2],
                    "pair_number": subject[3],
                    "even_odd": subject[4],
                    "id_teacher": subject[5],
                    "room": subject[6]
                })
        return subjects_arr

    def add_subject(self, name, study_hours, level_education, info):
        insert_query = """INSERT INTO subjects (name, study_hours, level_education, info) 
                          VALUES (%s, %s, %s, %s)"""
        subject_tuple = (name, study_hours, level_education, info)
        self.insert_query(insert_query, subject_tuple)

    def update_subject(self, id_subject, name, study_hours, level_education, info):
        insert_query = """UPDATE subjects  
                            SET name = %s,
                            study_hours = %s,
                            level_education = %s,
                            info = %s
                            WHERE id = %s"""
        subject_tuple = (name, study_hours, level_education, info, id_subject)
        self.insert_query(insert_query, subject_tuple)

    def delete_subject(self, id_subject):
        tables = ["subjects_groups", "subjects_groups", "attendance"]
        for table in tables:
            insert_query = """DELETE FROM """ + table + """ WHERE id_subject = %s"""
            student_tuple = id_subject
            self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM subjects WHERE id = %s"""
        student_tuple = id_subject
        self.insert_query(insert_query, student_tuple)

    # ===== DAYS ====

    def get_all_days(self):
        subjects_arr = []
        query = "SELECT * FROM subjects"
        data = self.get_query(query)
        if data:
            for subject in data:
                subjects_arr.append({
                    "id": subject[0],
                    "name": subject[1]
                })
        return subjects_arr

    def get_day_by_id(self, day_id):
        day = None
        query = "SELECT * FROM days WHERE id = (%s)"
        data = self.get_query(query, data=str(day_id))
        if data:
            data = data[0]
            day = {
                "id": data[0],
                "day": data[1],
                "month": data[2],
                "year": data[3]
            }
        return day

    def add_day(self, day, month, year):
        insert_query = """INSERT INTO days (day, month, year) VALUES (%s, %s, %s)"""
        subject_tuple = (day, month, year)
        self.insert_query(insert_query, subject_tuple)

    def update_day(self, day_id, day, month, year):
        insert_query = """UPDATE days  
                            SET day = %s,
                            month = %s,
                            year = %s
                            WHERE id = %s"""
        day_tuple = (day, month, year, day_id)
        self.insert_query(insert_query, day_tuple)

    def delete_day(self, day_id):
        tables = ["attendance"]
        for table in tables:
            insert_query = """DELETE FROM """ + table + """ WHERE id_day = %s"""
            student_tuple = day_id
            self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM days WHERE id = %s"""
        student_tuple = day_id
        self.insert_query(insert_query, student_tuple)

    # ====== GROUPS =====

    def get_all_groups(self):
        groups_arr = []
        query = "SELECT * FROM groups"
        data = self.get_query(query)
        if data:
            for group in data:
                groups_arr.append({
                    "id": group[0],
                    "name": group[1],
                    "id_headman": group[2],
                    "level_education": group[3],
                    "cipher": group[4],
                    "subdivision": group[5]
                })
        return groups_arr

    def get_group_by_id(self, group_id):
        group = None
        query = "SELECT * FROM groups WHERE id = (%s)"
        data = self.get_query(query, data=str(group_id))
        if data:
            data = data[0]
            group = {
                "id": data[0],
                "name": data[1],
                "id_headman": data[2],
                "level_education": data[3],
                "cipher": data[4],
                "subdivision": data[5]
            }
        return group

    def get_group_by_name(self, name):
        group = None
        query = "SELECT * FROM groups WHERE name = (%s)"
        data = self.get_query(query, data=str(name))
        if data:
            data = data[0]
            group = {
                "id": data[0],
                "name": data[1],
                "id_headman": data[2],
                "level_education": data[3],
                "cipher": data[4],
                "subdivision": data[5]
            }
        return group

    def get_group_timetable_by_id(self, group_id):
        timetable_arr = []
        query = "SELECT * FROM subjects_groups WHERE id_group = (%s)"
        data = self.get_query(query, data=str(group_id))
        if data:
            for timetable in data:
                timetable_arr.append({
                    "id_subject": timetable[0],
                    "id_group": timetable[1],
                    "day_of_week_number": timetable[2],
                    "pair_number": timetable[3],
                    "even_odd": timetable[4],
                    "id_teacher": timetable[5],
                    "room": timetable[6]
                })
        return timetable_arr

    def add_group(self, name, id_headman, level_education, cipher, subdivision):
        insert_query = """INSERT INTO groups (name, id_headman, level_education, cipher, subdivision)
                          VALUES (%s, %s, %s, %s, %s)"""
        group_tuple = (name, id_headman, level_education, cipher, subdivision)
        self.insert_query(insert_query, group_tuple)

    def add_group_timetable(self, id_subject, id_group, day_of_week_number, pair_number, even_odd, id_teacher, room):
        insert_query = """INSERT INTO subjects_groups (id_subject, id_group, day_of_week_number, pair_number, 
                            even_odd, id_teacher, room) VALUES (%s, %s, %s, %s, %s, %s, %s) """
        group_tuple = (id_subject, id_group, day_of_week_number, pair_number, even_odd, id_teacher, room)
        self.insert_query(insert_query, group_tuple)

    def update_group(self, group_id, name, id_headman, level_education, cipher, subdivision):
        insert_query = """UPDATE groups  
                            SET name = %s,
                            id_headman = %s,
                            level_education = %s,
                            cipher = %s,
                            subdivision = %s
                            WHERE id = %s"""
        group_tuple = (name, id_headman, level_education, cipher, subdivision, group_id)
        self.insert_query(insert_query, group_tuple)

    def update_timetable_by_group_id(self, id_subject, id_group, day_of_week_number,
                                     pair_number, even_odd, id_teacher, room):
        insert_query = """UPDATE subjects_groups  
                            SET id_subject = %s,
                            day_of_week_number = %s,
                            pair_number = %s,
                            even_odd = %s,
                            id_teacher = %s,
                            room = %s
                            WHERE id_group = %s"""
        group_tuple = (id_subject, day_of_week_number, pair_number, even_odd, id_teacher, room, id_group)
        self.insert_query(insert_query, group_tuple)

    def delete_group(self, group_id):
        tables = ["students", "subjects_groups"]
        for table in tables:
            insert_query = """DELETE FROM """ + table + """ WHERE id_group = %s"""
            student_tuple = str(group_id)
            self.insert_query(insert_query, student_tuple)

        insert_query = """DELETE FROM groups WHERE id = %s"""
        student_tuple = str(group_id)
        self.insert_query(insert_query, student_tuple)

    # ===== TIMETABLE ======

    def get_all_timetable(self):
        timetable_arr = []
        query = "SELECT * FROM subjects_groups"
        data = self.get_query(query)
        if data:
            for timetable in data:
                timetable_arr.append({
                    "id_subject": timetable[0],
                    "id_group": timetable[1],
                    "day_of_week_number": timetable[2],
                    "pair_number": timetable[3],
                    "even_odd": timetable[4],
                    "id_teacher": timetable[5],
                    "room": timetable[6]
                })
        return timetable_arr


if __name__ == "__main__":
    db = DataBase()
    # db.add_student("testSurname2", "testName2", "testPatronymic2", "man", "test2@test.com", 0, "C:\photo_src")
    # students = db.get_all_students()
    # print("Students: ", students)

    # student_data = db.get_student_by_id(3)
    # print("Student:", student_data)
    # db.add_subject("testSubject", 10000, "Бакалавр", "Some info")
    # db.update_group(1, "ИКБО-01-21", 0, "Бакалавриат", "09.03.04", "Институт технологий")
    print(db.get_all_groups())
    db.close()
