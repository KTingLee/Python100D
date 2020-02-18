# 2020/02/18  make a triangle?
# 輸入三邊長，該程式碼將判斷是否能夠構成三角形
# 若可以，則回傳 三角形面積 以及 周長
#
# 三角形成立必須滿足:
# 1.  兩邊和大於第三邊
# 2.  兩邊差之絕對值小於第三邊
#
# 透過邊長計算三角形面積公式(海龍公式):
# A = ( s(s-a)(s-b)(s-c) )^0.5
# s = (a+b+c)/2

# 欲使用 reduce 函數必須先引入
from functools import reduce

# 檢查是否可組成三角形
def check_Tri(length_list):
    bool_list=[]
    for L in length_list:
        bool_list.append((sum(length_list)-L) > L)
    return reduce(lambda L1, L2: L1*L2, bool_list)  # 麻煩估狗 reduce 函數

# 計算周長
def Tri_Peri(length_list):
    return sum(length_list)

# 計算面積
def Tri_Area(Perimeter, length_list):
    s = Perimeter/2
    a = length_list[0]
    b = length_list[1]
    c = length_list[2]
    area = ( s*(s-a)*(s-b)*(s-c) )**0.5
    return area

length_in = input('請輸入三邊長(三組邊長以空白隔開，最後一個直接Enter): ')
length_list = [ float(l) for l in length_in.split()]

if check_Tri(length_list) == 1:
    print('該三角形周長為: ', Tri_Peri(length_list))
    print('該三角形面積為: ', Tri_Area(Tri_Peri(length_list), length_list))