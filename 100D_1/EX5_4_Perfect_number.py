# 2020/02/19  Find the perfect numbers.
# 
# 完美數又稱完全數，具有以下性質
# 完美數之因數(不包含完美數本身)總和等於該數
# 
# 例如 6，其因數為 1, 2, 3, 6。 若不包含本身，則為 1, 2, 3
# 而 1 + 2 + 3 恰為 6。


def perfect_num(max_num):
    perfect_list=[]
    num = 2
    while num <= max_num:
        factor=[]
        for i in range(1, num):
            if num % i == 0:
                factor.append(i)
        if num == sum(factor):
            perfect_list.append(num)
        num+=1

    print('在 %d 範圍內的完美數為：\n' % max_num, perfect_list)

perfect_num(10000)
