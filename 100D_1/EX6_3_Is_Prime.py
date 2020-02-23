# 2020/02/20  Is a Prime number?
# 
# 回顧 EX 4_1，我們判斷一個正整數是否為質數
#
# 本範例重新計算之。
# 
# 質數的定義:
# 大於 1 的正整數，且該整數之因數只有 1 與 本身

def is_Prime(num):
    factor=[]
    for i in range(1, num+1):
        if num % i == 0:
            factor.append(i)
    if len(factor) == 2:
        print('%d 為質數。' % num)
        return 1
    else:
        print('%d 非質數。' % num)
        return 0

if __name__ == '__main__':
    is_Prime(1)