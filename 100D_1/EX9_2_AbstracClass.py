# 2020/02/25  抽象類別
# 
# 回顧 EX9_1 類別繼承的練習
# 將 Person 類別改寫為抽象類別
# 建立抽象類別需要用到 abc 模組的 ABCMeta, abstractmethod

from abc import ABCMeta, abstractmethod

# 定義抽象類別 Person
# 抽象類別括號內要加上額外參數 metaclass=ABCMeta
class Person(metaclass=ABCMeta):
    def __init__(self, name, age):
        self._name = name
        self._age = age

    # 針對要被多型使用的函數，加上 @abstractmethod
    @abstractmethod
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
    # old_man = Person("Alen", 1000)  # Error，因為 Person 變成抽象類別，不能實體化

    Shiao = Teacher("SC. Shiao", 30, "NCKU")
    print(Shiao.action())

    Joe = Student("Joe Lee", 25, 6163)
    print(Joe.action("Coding"))


if __name__ == "__main__":
    main()





