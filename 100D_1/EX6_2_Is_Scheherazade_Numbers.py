# 2020/02/19  Is a Scheherazade Numbers?
# 
# 對稱數又稱回文數(Scheherazade Numbers, palindromic number)
# 意即該數顛倒，仍得到相同數字。
# 
# 例如 12321 顛倒仍為 12321

def is_palindromic(num):
    res=0
    temp=num
    while temp > 0:
        res = res*10 + temp%10
        temp = temp // 10

    if res == num:
        print('%d 為對稱數' % num)
        return 1
    else:
        print('%d 不為對稱數' % num)
        return 0

is_palindromic(12321)