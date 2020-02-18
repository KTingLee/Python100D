# 2020/02/18  計算兩正整數的最大公因數與最小公倍數
#
# 最大公因數 Highest common factor
# 最小公倍數 Least common multiple

# 計算因數(1 不算)
def cal_factor(num):
    factor=[]
    for i in range(2, num+1):
        if num % i == 0:
            factor.append(i)
    return factor


num_1 = int(input('請輸入第一個正整數: '))
num_2 = int(input('請輸入第二個正整數: '))

factor_1 = cal_factor(num_1)
factor_2 = cal_factor(num_2)

# 計算最大公因數
hcf = max( set(factor_1).intersection(factor_2) )
print('%d 與 %d 的最大公因數為 %d' % (num_1, num_2, hcf))

# 計算最小公倍數
lcm=2
while True:
    if lcm % num_1 == 0 and lcm % num_2 == 0:
        print('%d 與 %d 的最小公因數為 %d' % (num_1, num_2, lcm))
        break
    lcm+=1
