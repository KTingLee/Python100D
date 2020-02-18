# 2020/02/18  印出米字金字塔
# 該程式碼將打印出以下三種圖形
#  *           *         *
#  **         **        ***
#  ***       ***       *****
#  ****     ****      *******

# 第一種圖案
def Tri_L(floor):
    for i in range(floor+1):
        print('*'*i)


# 第二種圖案
def Tri_R(floor):
    # 圖案最大長度恰為 floor。 因為最大長度為最底層，而最底層長度為 floor
    for i in range(floor+1):
        print(' '*(floor-i) + '*'*i)


# 第三種圖案
def Tri_P(floor):
    # 圖案最下層長度為 1+2*(floor-1)
    length = 1+2*(floor-1)
    


# 提供層數
floor = int(input('請輸入圖案高度: '))
tri_type = input('請輸入圖案類型: L, R or P ?')




