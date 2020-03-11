# 2020/03/10  multiprocessing 練習 4 -- 基本概念4
# 
# 這篇介紹多進程的另一個函數，進程池 Pool()
# 透過 Pool()，我們不必再自己建立新的進程，同時
# 執行任務時，進程本來需要透過 Queue 物件取值，但進程池不需要

import multiprocessing
import time


def job1(num):
    return num*num

def job2(num1, num2, num3):
    print(f'執行 {num1}*{num2}{num3}')
    return num1*num2*num3

def using_pool_map():
    # 建立進程池，預設使用所有核心，可透過參數 processes 指定
    pool = multiprocessing.Pool(processes=2)

    # 使用 Pool 的物件方法 map(func=, iterable=)
    # 參數 func 指定的函數只能傳入一個，若指定函數需要傳入兩個以上的參數，那要用 starmap()
    # 參數 iterable 要放入"可迭代"的數據，例如 list 型態，且最後的逗號不可省略(好像不一定)
    res = pool.map(func=job1, iterable=[1,])
    print(res)


def using_pool_starmap():
    pool = multiprocessing.Pool(processes=2)

    # 使用 starmap，執行 job2 的過程為 job2(1,2)、job2(3,4)
    res = pool.starmap(func=job2, iterable=[(1,2,3), (3,4,3)])
    print(res)


def using_pool_apply_async():
    pool = multiprocessing.Pool(processes=2)

    # apply_async 跟 map 相似，map 可以一口氣執行許多次
    # 而 apply_async 只能執行一次
    res1 = pool.apply_async(func=job1, args=(2, ))  # args 必需為迭代形式
    
    # apply_async 的結果必需用 get() 取得
    print(res1.get())



if __name__ == '__main__':
    using_pool_map()
    # using_pool_starmap()
    # using_pool_apply_async()




