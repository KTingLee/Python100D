# 2020/02/25  類別繼承
# 
# 這個程式碼主要在練習類別的繼承
# 首先我們會建立父類別 - Person
# 其包含 _name, _age 屬性
# 而方法有 action
# 
# 子類別有兩個 - Teacher, Student
# Teacher 包含 level 屬性，說明老師教學程度，如小學、國高中、大學...
# Student 包含 Id 屬性，說明學生的學號

# 定義父類別 Person
class Person():
    def __init__(self, name, age):
        self._name = name
        self._age = age

    def action(self, word):
        return f"我是 {self._name}，我聽到你說 {word}。"

# 定義子類別 Teacher，別忘了定義時參數要寫上父類別的名稱。
# Teacher 以 FatherClass.__init__(self,..) 方式加入父類別屬性
class Teacher(Person):
    # 初始化參數要包含父類別的初始化參數
    def __init__(self, name, age, level):
        Person.__init__(self, name, age)
        self._level = level

    def action(self):
        return f"{self._name} 是 {self._level} 老師。"

# 定義子類別 Student
# Student 以 super() 方式加入父類別屬性，透過 super() 則參數不用加 self
class Student(Person):
    def __init__(self, name, age, Id):
        super().__init__(name, age)
        self._id = Id

    def action(self, subject):
        return f"{self._name} 是學生，年紀 {self._age} 歲，喜歡的科目為 {subject}。"


def main():
    old_man = Person("Alen", 1000)
    print(old_man.action("你太老了吧..."))

    Shiao = Teacher("SC. Shiao", 30, "NCKU")
    print(Shiao.action())

    Joe = Student("Joe Lee", 25, 6163)
    print(Joe.action("Coding"))


if __name__ == "__main__":
    main()





