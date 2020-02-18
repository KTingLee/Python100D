# 2020/02/18  Is a Prime number?
# 該程式碼將判斷輸入的數字是否為整數
#
# 質數的定義:
# 大於 1 的正整數，且該整數之因數只有 1 與 本身

num = int(input('輸入一正整數: '))
if num == 1:
    print('質數為大於 1 的正整數...')

elif num > 1:
    divisor=[]  # 放置因數
    for i in range(1, num+1):
        if num % i == 0:
            divisor.append(i)

    if len(divisor) == 2:
        print(num, ' 為質數。')
    else:
        print(num, ' 不為質數，其因數有...')
        for x in divisor:
            print(x, end='\t')
        print()
