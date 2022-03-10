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
        except Exception as _ex:
            print("[INFO] Error with connection", _ex)

    def close(self):
        if self.connection:
            self.connection.close()
            print("[INFO] PostgreSQL connection closed")

    def get_server_version(self):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(
                    "SELECT version();"
                )
                print(f"Server version: {cursor.fetchone()}")
        except Exception as _ex:
            print("[INFO] Error with get server version", _ex)

    def insert_query(self, query, data):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, data)
        except Exception as _ex:
            print("[INFO] Error with add student", _ex)

    def get_query(self, query, data=None):
        try:
            with self.connection.cursor() as cursor:
                if data:
                    cursor.execute(query, data)
                else:
                    cursor.execute(query)
                return cursor.fetchall()
        except Exception as _ex:
            print("[INFO] Error with get all students", _ex)
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
                    "photo_src": student[7]
                })
        return students_arr

    def get_student_by_id(self, student_id):
        student = None
        query = "SELECT * FROM students WHERE id = (%s)"
        data = self.get_query(query, data=str(student_id))[0]
        if data is not None:
            student = {
                "id": data[0],
                "surname": data[1],
                "name": data[2],
                "patronymic": data[3],
                "gender": data[4],
                "email": data[5],
                "id_group": data[6],
                "photo_src": data[7]
            }
        return student

    def get_student_attendance_by_id(self, student_id):
        pass

    def add_student(self, surname, name, patronymic, gender, email, id_group, photo_src):
        insert_query = """INSERT INTO students (surname, name, patronymic, gender, email, id_group, photo_src) 
                                          VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        student_tuple = (surname, name, patronymic, gender, email, id_group, photo_src)
        self.insert_query(insert_query, student_tuple)

    def update_student(self, student_id, surname, name, patronymic, gender, email, id_group, photo_src):
        insert_query = """UPDATE students 
                            SET surname = %s, 
                            SET name = %s, 
                            SET patronymic = %s, 
                            SET gender = %s, 
                            SET email = %s, 
                            SET id_group = %s, 
                            SET photo_src = %s
                            WHERE id = %s"""
        student_tuple = (surname, name, patronymic, gender, email, id_group, photo_src, student_id)
        self.insert_query(insert_query, student_tuple)

    def delete_student(self, student_id):
        pass

    # ======= TEACHERS ======

    def get_all_teachers(self):
        pass

    def get_teacher_by_id(self, teacher_id):
        pass

    def get_teacher_subjects(self, teacher_id):
        pass

    def add_teacher(self, surname, name, patronymic, email):
        pass

    def update_teacher(self, teacher_id, surname, name, patronymic, email):
        pass

    def delete_teacher(self, teacher_id):
        pass

    # ====== SUBJECTS ======

    def get_all_subjects(self):
        pass

    def get_subject_by_id(self, id_subject):
        pass

    def get_subject_attendance_by_id(self, subject_id):
        pass

    def get_subjects_by_group(self, group_id):
        pass

    def add_subject(self, name):
        pass

    def update_subject(self, id_subject, name):
        pass

    def delete_subject(self, id_subject):
        pass

    # ===== DAYS ====

    def get_all_days(self):
        pass

    def get_day_by_id(self, day_id):
        pass

    def add_day(self, day, month, year):
        pass

    def update_day(self, day_id, day, month, year):
        pass

    def delete_day(self, dey_id):
        pass

    # ====== GROUPS =====

    def get_all_groups(self):
        pass

    def get_group_by_id(self, group_id):
        pass

    def get_group_timetable_by_id(self, group_id):
        pass

    def add_group(self, name, id_headman):
        pass

    def update_group(self, group_id, name, id_headman):
        pass

    def delete_group(self, group_id):
        pass

    # ===== TIMETABLE ======

    def get_all_timetable(self):
        pass


if __name__ == "__main__":
    db = DataBase()
    # db.add_student("testSurname2", "testName2", "testPatronymic2", "man", "test2@test.com", 0, "C:\photo_src")
    students = db.get_all_students()
    print("Students", students)

    student_data = db.get_student_by_id(1)
    print("Student:", student_data)
    db.close()
