# 2020/02/19  CRAPS game
#
# 花旗骰
# 此為美國骰子賭博遊戲，規則如下：
# 使用兩個骰子，計算兩骰總和。
#
# 第一局
# 若玩家骰出 7 、 11，玩家勝；
# 若玩家骰出 2 、 3 、 12，莊家勝。
# 若不為 2, 3, 7, 11, 12；則繼續下一局。
#
# 其他局
# 若玩家骰出 7，莊家勝；
# 若玩家骰出第一局的點數，玩家勝。
# 若不為 7 或 第一局的點數，則繼續下一局。
#
# 備註：分兩種模式，
# 一種是遊玩 100 局，無賭金；
# 一種是玩家有 1000 元賭金，每局賭金 50 元，不斷遊戲直到玩家賭金歸零。
# 同時計算兩種模式玩家獲勝機率。

import random

def CRAPS_round_1(score):
    if score in [7, 11]:
        print('玩家獲勝。')
        return 1
    elif score in [2, 3, 12]:
        print('莊家獲勝。')
        return 0
    else:
        print('無結果，重新擲骰。')
        return 3

def CRAPS_round_other(game_round, score, FirstScore):
    if score == FirstScore:
        print('玩家獲勝。')
        return 1
    elif score == 7:
        print('莊家獲勝。')
        return 0
    else:
        print('無結果，重新擲骰。')
        return 3

def win_lose(res, money):
    if res == 1:
        money += 50
    elif res == 0:
        money -= 50
    return money

# 賭金模式
def CRAPS_Game(your_money=1000):
    round_No = 1
    win = 0

    while your_money > 0:
        next_round = False
        first_score = random.randint(2, 12)  # 兩顆骰子的總和範圍 2 ~ 12
        print('第 %d 局，玩家點數: %d' % (round_No, first_score))
        res = CRAPS_round_1(first_score)

        if res == 1:
            win+=1
            your_money = win_lose(res, your_money)
        elif res == 0:
            your_money = win_lose(res, your_money)
        else:
            next_round = True

        while next_round == True:
            next_round = False
            score = random.randint(2, 12)
            print('第 %d 局，玩家點數: %d' % (round_No, score))
            res = CRAPS_round_other(round_No, score, first_score)

            if res == 1:
                win+=1
                your_money = win_lose(res, your_money)
            elif res == 0:
                your_money = win_lose(res, your_money)
            else:
                next_round = True

        round_No+=1
        print('目前賭金剩餘：%d 元\n' % your_money)
    print('獲勝機率 %.2f' % (win/round_No))

# 無賭金模式
def CRAPS_Try(rounds=100):
    round_No = 1
    win = 0

    while round_No < rounds:
        next_round = False
        first_score = random.randint(2, 12)  # 兩顆骰子的總和範圍 2 ~ 12
        print('第 %d 局，玩家點數: %d' % (round_No, first_score))
        res = CRAPS_round_1(first_score)

        if res == 1:
            win+=1            
        elif res == 3:
            next_round = True

        while next_round == True:
            next_round = False
            score = random.randint(2, 12)
            print('第 %d 局，玩家點數: %d' % (round_No, score))
            res = CRAPS_round_other(round_No, score, first_score)

            if res == 1:
                win+=1
            elif res == 3:
                next_round = True

        round_No+=1
        print('目前累積勝利：%d 局\n' % win)
    print('獲勝機率 %.2f' % (win/round_No))



# CRAPS_Game(1000)
CRAPS_Try(100)
