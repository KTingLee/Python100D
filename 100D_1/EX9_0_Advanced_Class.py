# 2020/02/21  類別進階
# 
# python 類別的屬性或函數，能被設為公開或私有
# 在建立物件後，其屬性若沒設定為私有的，可能一不小心就修改到物件內容
# 然而將其設置為私有屬性，可能又不方便
# 
# python 提供了 @property (裝飾器)之用法
# 裝飾器分成 getter , setter 與 deleter
# getter  能讀取屬性
# setter  能寫入屬性
# deleter 能刪除屬性
# 
# 裝飾器能降低屬性被修改的風險，以 account 類別為例
# 例如 屬性name 有 getter 但沒有 setter，所以只能被讀取，而不能寫入
# 屬性money 有 getter 也有 setter，所以可被讀取也可被寫入
# 
# 裝飾器在定義時很像函數，但用起來像讀寫一般屬性。
# 在使用 setter 前，其屬性必須先透過 property 定義過，
# 例如 @NAME.setter 之前，必須有 @property def NAME(self)



# 建立 car 類別，該類別屬性包含駕駛、乘客
class Car():

    def __init__(self, driver=None, passenger=None):
        # 透過兩條下底線，設定一個私有屬性
        # 駕駛不應該容易替換，所以將駕駛設為私有合情合理
        self.__driver = driver
        self.__carBand = 'HONDA'  # 汽車品牌(私有屬性)
        self.passenger = passenger

    # 公有函數，透過此函數新增乘客(公有屬性)
    def addPassenger(newPassenger):
        self.passenger.append(newPassenger)

    # 公有函數，使用者可透過該函數，了解駕駛(私有屬性)
    def checkDriver(self):
        print('透過公有函數存取私有屬性 __driver：', self.__driver)

    # 公有函數，透過此函數可更改駕駛
    # 駕駛雖為私有屬性，無法被外部修改，但仍可藉此方式繞個彎修改之
    def changeDriver(self, newDriver):  # self 莫忘
        self.__driver = newDriver

    # 公有函數，使用者可透過該函數，了解乘客(公有屬性)
    def checkPassenger(self):
        print('透過公有函數存取公有屬性 passenger：', self.passenger)

    # 私有函數，該函數只能在物件內的函數執行，無法由外部執行
    # 意即使用者其實不能使用該函數
    def __checkCarBand(self):
        print('私有函數存取私有屬性 __carBand：', self.__carBand)

    # 公有函數，因為 __checkCarBand() 無法被使用者使用
    # 藉由此公有函數使用之
    def thisCarBand(self):
        print('公有函數使用私有函數 __checkCarBand()：')
        self.__checkCarBand()  # 前面要加 self.

    # 以下介紹裝飾器 
    # @property  -getter 用法
    @ property
    def properDriver(self):
        return self.__driver
    

class Account():
    def __init__(self, name):
        self.__name = name

    # getter 用法，直接寫 @property 即可
    @property
    def userName(self):
        return self.__name

    # setter 用法，也可修改私有屬性。定義方式與定義函數相同
    # 但 .setter 前的命名必須先定義過(即上面的property)
    # 而下方定義的函數名稱可以不相同
    @userName.setter
    def setName(self, newName):
        self.__name = newName

    @property
    def userMoney(self):
        return self.__money
    
    @userMoney.setter
    def userMoney(self, money):
        self.__money = money

    # getter 用法，可讀取金額
    @property
    def money(self):
        return self.__money



def useCar():
    car1 = Car(driver='Ruby', passenger='Java')
    
    # print(car1.__driver)  # Error: 因為 __driver 為私有屬性
    car1.checkDriver()  # __driver 在 checkDriver() 中使用，而該函數為公有函數，所以可被使用

    print('實際上，Python可利用不同的寫法，使用私有屬性或函數...')
    print('以 _Car__driver 使用私有屬性 __driver：', car1._Car__driver, '\n')
    
    # print(car1.__carBand) # Error: 因為 __carBand 為私有屬性
    # car1.__checkCarBand() # Error: 因為 __checkCarBand() 為私有函數  
    car1.thisCarBand()  
    print('以 _Car__carBand 使用私有屬性 __carBand', car1._Car__carBand, '\n')
    print('以 _Car__checkCarBand() 使用私有函數 __checkCarBand()')
    car1._Car__checkCarBand()
    
    print(car1.passenger, '\n')

    # 修改私有屬性 __driver
    car1.changeDriver('Jason')  # 以公有函數修改私有屬性
    car1.checkDriver()
    car1._Car__driver = 'David' # 當然也可用這種特殊寫法修改私有屬性
    car1.checkDriver()


def useAccount():
    Acc1 = Account('Jaco')

    print(Acc1.userName)
    # Acc1.userName = 'Logan'
    Acc1.setName = 'Lagan'  # 雖然 setter 是 userName.setter，定義時是用 def setName，所以是用 setName
                            # setName()定義時雖然是函數，但這邊用法卻像使用屬性
    print(Acc1.userName)

    Acc1.userMoney = 10
    print(Acc1.money)




if __name__ == '__main__':
    # useCar()
    useAccount()



