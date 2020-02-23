# 2020/02/21  Lottery ball
# 
# 大樂透玩法：
# 必須從 01～49 中任選 6 個號碼進行投注
# 官方會開出 7 個號碼，其中第 7 個號碼稱為特別號
# 若對中官方號碼 3 個以上，即可得到對應獎金。

import random

def suffle_select():
     balls = [x for x in range(1, 50)]
     res = random.sample(balls, 7)
     res.sort()
     return res

def display_balls(num_list):
    res_list = num_list.sort()
    if len(num_list) != 7:
        print('請輸入正確數量的號碼球...')
    else:
        for i, num in enumerate(num_list):
            if i == len(num_list)-1:
                print('| %02d' % num)
            else:
                print('%02d ' % num, end='')

def main():
    ans = input('請問要自選？(y or n): ')
    if ans == 'y':
        again = True
        while again:
            temp = input('請輸入 01~49 任 7 個號碼，不能重複!號碼請以空白隔開\n')
            temp = temp.split()
            your_balls = [int(x) for x in temp]
            if len(set(your_balls)) == 7:
                again = False
    else:
        your_balls = suffle_select()

    lottery_balls = suffle_select()
    
    print('本期號碼：')
    display_balls(lottery_balls)

    print('\n您的號碼：')
    display_balls(your_balls)


if __name__ == '__main__':
    main()












