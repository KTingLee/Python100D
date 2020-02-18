# 2020/02/18  Circle Calculator
# 該程式碼會根據輸入的 半徑 回傳 圓的面積及圓周長
#
# 圓面積公式
# A = r^2 * pi
#
# 圓周長公式
# L = 2*r * pi
import math

def Circle_Area(r):
    return r**2 * math.pi

def Circle_Perimeter(r):
    return r*2 * math.pi

r = float(input('給定半徑(cm): '))
print('面積 = %.2f cm^2' % (Circle_Area(r)))
print('周長 = %.2f cm' % (Circle_Perimeter(r)))

