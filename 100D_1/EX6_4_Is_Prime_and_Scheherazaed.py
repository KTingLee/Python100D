# 2020/02/19  Is a Scheherazade and Prime Numbers?
# 
# 判斷一正整數是否為回文數以及質數
# 
# 回顧 EX6_2，可判斷一正整數是否為對稱數
# 回顧 EX6_3，可判斷一正整數是否為質數
#
# 該程式碼將透過 import 的方式，將 EX6_2、 EX6_3 的函數引入

from EX6_2_Is_Scheherazade_Numbers import is_palindromic
from EX6_3_Is_Prime import is_Prime

def is_Prime_Palindromic(num):
    Prime = is_Prime(num)
    pali = is_palindromic(num)
    if Prime==1 and pali==1:
        print(num, '為質數，亦為對稱數\n')
        return 1
    else:
        print()
        return 0

if __name__ == '__main__':
    for i in range(1,1000):
        is_Prime_Palindromic(i)