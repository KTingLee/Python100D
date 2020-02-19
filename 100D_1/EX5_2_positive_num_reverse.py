# 2020/02/19  Reverse the natural integer
#
# 反轉正整數
# 藉由以下程式碼，可將正整數順序反轉
# 例如 12345 變成 54321

def reverse_num(num):
    # 先計算位數
    i=1
    while num // (10**i) > 10:
        i+=1
    print('%d 為 %d 位數...' % (num, i+1))

    # 反轉
    res=0
    for n in range(i, -1, -1):
        add_num = num // (10**n)  # 取首位數的數字
        res = res + add_num * (10**(i-n))
        num = num - add_num * (10**n)  # 減去首位數
    return res

num = int(input('請輸入一正整數：'))
print(reverse_num(num))