# 2020/02/19  Calculate the gcd and lcm.
# 
# 回顧 EX4_2，我們計算了兩正整數的最大公因數(gcd)與最小公倍數(lcm)。
# 
# 本範例再次重新計算之。
#
# 最小公倍數與最大公因數之關係如下：
# lcm = (x * y) / gcd

# 計算最大公因數
def gcd(x, y):
    min_ = min([x, y])
    max_ = max([x, y])

    # 公因數只要找較小數的範圍即可，由於要找最大公因數，因此由大往小找。
    for factor in range(min_, 1, -1):
        if min_ % factor == 0 and max_ % factor == 0:
            return factor

def lcm(x, y):
    return (x * y) // gcd(x, y)

if __name__ == '__main__':
    a = 25
    b = 80
    print(gcd(a, b))
    print(lcm(a, b))