# 2020/02/25  怪物對打小遊戲
# 
# 本程式碼會利用到類別、抽象類別、類別繼承
# 
# 內容類似神奇寶貝
# 主角擁有 4 個招式，單一普通攻擊、魔法群體攻擊、單一強力攻擊、補血
# 
# 敵人只有普通攻擊
# 


from abc import ABCMeta, abstractmethod
from random import randint, randrange


# 建立父類別(抽象類別)，參數必須加入 metaclass=ABCMeta
class Character():
    # 透過 __solts__ 以限制該類別的屬性
    __solts__ = ('_name', '_hp')

    def __init__(self, name, hp):
        self._name = name  # 將屬性暗示為 受保護的，因為若為 私有的，在子類別使用時可能有問題
        self._hp = hp

    # 因為將屬性設為私有的，所以透過 @property 來讀寫之
    @property
    def name(self):
        return self._name

    @property
    def hp(self):
        return self._hp

    @hp.setter
    def hp(self, value):
        self._hp = value if value >= 0 else 0

    @property
    def alive(self):
        return self._hp > 0

    # 要被多型使用的函數，透過 @abstractmethod 完成
    # attack 為普通攻擊
    @abstractmethod
    def attack(self, enemy):
        pass


# 建立子類別，主角
class Human(Character):
    __solts__ = ('_name', '_hp', '_mp')

    def __init__(self, name, hp, mp):
        # 透過 super() 完成父類別屬性的設定，以該方法不需參數 self
        super().__init__(name, hp)
        self._mp = mp
        self.__maxHp = hp
        self.__maxMp = mp

    # 普通攻擊
    def attack(self, enemy):
        damage = randint(5, 15)
        enemy.hp -= damage  # 這邊的 hp 是透過 @property --setter 的方式改寫
        return damage

    # 魔法攻擊，要消耗 mp 所以要判斷，回傳布林值以判斷是否能使用
    def magic_attack(self, all_enemies):
        if self._mp >= 20:
            self._mp -= 20
            for enemy in all_enemies:
                if enemy.alive > 0:
                    damage = randint(10, 20)
                    enemy.hp -= randint(10, 20)
            return True
        else:
            return False

    # 強力攻擊，扣除對手 3/4 生命或至少 50 滴血，但耗費魔力 50
    # 回傳布林值判斷是否能使用，若魔力不足則轉以普通攻擊
    def super_attack(self, enemy):
        if self._mp >= 50:
            self._mp -= 50
            damage = int(enemy.hp * 3/4)
            damage = damage if damage > 50 else 50
            enemy.hp -= damage
            return damage
        else:
            self.attack(enemy)  # 當使用自身定義的函數時，透過 self. 取用
            return False

    # 補血
    def healing(self):
        if self._hp < self.__maxHp:
            incrHP = randint(10, 20)
            HP = self._hp + incrHP
            self._hp = HP if HP < self.__maxHp else self.__maxHp
            return incrHP
        else:
            return 0

    # 回復魔力，使用普通攻擊後能恢復魔力
    def resumeMP(self):
        incrMP = randint(5, 10)
        MP = self._mp + incrMP
        self._mp = MP if MP < self.__maxMp else self.__maxMp
        return incrMP

    # 客製化該類別的 print
    def __str__(self):
        return f"~~~主角{self._name}~~~\n生命值：{self._hp}\n魔力值：{self._mp}\n"


# 建立子類別，魔物
class Monster(Character):
    __solts__ = ('_name', '_hp')

    def __init__(self, name, hp):
        super().__init__(name, hp)

    # 普通攻擊
    def attack(self, enemy):
        damage = randint(5, 10)
        enemy.hp -= damage
        return damage

    def __str__(self):
        return f"***柱之男{self._name}***\n生命值：{self._hp}"


# 檢測是否還有對手
def is_any_alive(all_enemies):
    for enemy in all_enemies:
        if enemy.alive > 0:
            return True
    else:
        return False


# 自行選取敵人
def select_enemy(all_enemies):
    str1 = '\n請選擇攻擊對手：\n'
    for k, enemy in enumerate(all_enemies, start=1):
        if k % 2 == 0:
            str1 += '%d.%s\n' % (k, enemy.name)
        else:
            str1 += '%d.%s\t\t' % (k, enemy.name)
    str1 += '%d.隨機選取  ' % (k+1)
    num = str(input(str1))
    return num


# 隨機選取敵人
def random_select_enemy(all_enemies):
    all_enemies_len = len(all_enemies)
    while True:
        index = randrange(all_enemies_len)  # 在敵人 list 中隨機選取
        enemy = all_enemies[index]
        if enemy.alive == True:
            return enemy


# 電腦操控
def computer_control(human, all_enemies):
    enemy = random_select_enemy(all_enemies)
    skill = randint(1, 10)   # 隨機選取一個數字，以便選用技能
    if skill <= 2:  # 20% 進行補血
        incrHP = human.healing()
        print('%s 進行自癒，回復 %02d 血量' % (human.name, incrHP))

    elif skill <= 6:  # 40% 採取普通攻擊
        damage = human.attack(enemy)
        incrMP = human.resumeMP()
        print('%s 對 %s 發動普通攻擊，造成傷害 %02d' % (human.name, enemy.name, damage))
        print('%s 回復 %02d 的魔力' % (human.name, incrMP))

    elif skill <= 9:  # 30% 採用魔法攻擊
        if human.magic_attack(all_enemies) == True:
            print('%s 發動魔法群體攻擊' % (human.name))
        else:
            print('魔力不足無法發動，等待下一回合')
            incrMP = human.resumeMP()
            print('%s 回復 %02d 的魔力' % (human.name, incrMP))

    else:  # 10% 採用強力攻擊(魔力不足而發動失敗將改採普通攻擊)
        damage = human.super_attack(enemy)
        if damage > 0:  # 若發動成功，則 damage 不為 0
            print('%s 對 %s 發動強力攻擊，造成傷害 %02d' % (human.name, enemy.name, damage))
        else:
            print('%s 對 %s 發動普通攻擊' % (human.name, enemy.name))
            incrMP = human.resumeMP()
            print('%s 回復 %02d 的魔力' % (human.name, incrMP))






# 顯示整體狀況
def display_info(human, all_enemies):
    print(human)
    for item in all_enemies:
        print(item)
    print('\n'*3)

# 顯示使用技能結果
def display_skill():
    pass


def main():
    human1 = Human("JoJo", 200, 100)
    mons1 = Monster("ACDC", 100)
    mons2 = Monster("瓦姆烏", 100)
    mons3 = Monster("卡茲", 100)
    Boss = Monster("Dio", 200)
    monster_list = [mons1, mons2, mons3, Boss]
    display_info(human1, monster_list)

    round_No = 1
    while human1.alive == True and is_any_alive(monster_list) == True:
        print(("第%03d回合" % round_No).center(20, '='))

        # 主角攻擊階段
        skill_no = str(input('選擇招式號碼：\n1.普通單一攻擊  2.魔法群體攻擊  \n3.單一強力攻擊  4.補血  其他.電腦隨機操控  '))
        if skill_no not in ['1', '2', '3', '4']:
            print('\n========戰鬥過程========\n')
            computer_control(human1, monster_list)

        elif skill_no == '4':  # 採用自癒
            print('\n========戰鬥過程========\n')
            print('%s 採取自癒，恢復 %02d 點生命' % (human1.name, human1.healing()))

        elif skill_no == '2':  # 採用魔法攻擊
            print('\n========戰鬥過程========\n')
            if human1.magic_attack(monster_list) == True:
                print('%s 發動魔法群體攻擊' % (human1.name))
            else:
                print('魔力不足無法發動，等待下一回合')
                incrMP = human1.resumeMP()
                print('%s 回復 %02d 的魔力' % (human1.name, incrMP))

        else:
            monster_no = select_enemy(monster_list)
            print('\n========戰鬥過程========\n')
            if monster_no not in ['1', '2', '3', '4']:
                monster = random_select_enemy(monster_list)
            else:
                monster = monster_list[int(monster_no)-1]

            if skill_no == '1':  # 採用普通攻擊
                damage = human1.attack(monster)
                incrMP = human1.resumeMP()
                print('%s 對 %s 發動普通攻擊，造成傷害 %02d' % (human1.name, monster.name, damage))
                print('%s 回復 %02d 的魔力' % (human1.name, incrMP))

            else:  # 10% 採用強力攻擊(魔力不足而發動失敗將改採普通攻擊)
                damage = human1.super_attack(monster)
                if damage > 0:  # 若發動成功，則 damage 不為 0
                    print('%s 對 %s 發動強力攻擊，造成傷害 %02d' % (human1.name, monster.name, damage))
                else:
                    print('%s 對 %s 發動普通攻擊' % (human1.name, monster.name))
                    incrMP = human1.resumeMP()
                    print('%s 回復 %02d 的魔力' % (human1.name, incrMP))
            
        # 敵人回擊階段
        for enemy in monster_list:
            if enemy.alive == True and human1.alive == True:
                damage = enemy.attack(human1)
                print('%s 對 %s 發動攻擊，造成傷害 %02d' % (enemy.name, human1.name, damage))

        print(("第%03d回合結果" % round_No).center(20, '='))
        display_info(human1, monster_list)
        round_No += 1

    # 結果
    print('\n========遊戲結束!========\n')
    if human1.alive > 0:
        print('%s獲勝！！！' % human1.name)
    else:
        print('敵人獲勝！！！')











    






if __name__ == "__main__":
    main()
