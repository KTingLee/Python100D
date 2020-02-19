# 2020/02/19  計算水仙花數(Narcissistic number)
#
# 水仙花數也被稱為超完全數字不變數(pluperfect digital invariant, PPDI)
# 、自戀數、自冪數、阿姆斯壯數或阿姆斯特朗數(Armstrong number)。
#
# 水仙花數的定義：
# 該數為一個 3 位數字，而將各個位數的立方總和，其值即為該數字。
#
# 例如：
# 153 = 1^3 + 5^3 + 3^3

for num in range(100, 1000):
    first  = num // 100
    second = (num % 100) // 10
    third  = num - 100*first - 10*second
    # third = num % 10

    if first**3 + second**3 + third**3 == num:
        print(num, ' 為水仙花數。')