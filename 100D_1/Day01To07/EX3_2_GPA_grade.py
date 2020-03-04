# 2020/02/18  GPA grade
# 該程式碼會將百分制的分數 轉成 GPA 制
#
# 等級轉換:
# A : 90 ~
# B : 80 ~ 89
# C : 70 ~ 79
# D : 60 ~ 69
# E : ~ 59

def GPA_grade(score):
    GPA = {'10':'A', '9':'A', '8':'B', '7':'C', '6':'D'}
    if type(score) != type(0) and type(score) != type(0.1):
        print('分數必需為正整數或正小數。')

    elif str(int(score // 10)) in GPA.keys():
        return GPA[str(int(score // 10))]

    else:
        return 'E'

score = float(input('請輸入分數，待會將轉換成 GPA 制: '))
print(GPA_grade(score))
