# 2020/03/10  multiprocessing 練習 3 -- 基本概念3
# 
# 這篇將會比較多線程、多進程以及一般狀態
# 運行效率到底會有什麼樣的差別


import threading
import queue

import multiprocessing
import time


def calcu_job(q=None):
    # 計算內容
    res = 0
    for i in range(10**7):
        res += i + i**2 + i**3
    
    # 一般狀態，不需要傳入 Queue 物件也可回傳值
    if q==None:
        return res

    # 多線程或多進程都會傳入 Queue 物件，此時 q 不為 None
    else:
        q.put(res)

# 一般狀態
def normal():
    res = 0
    for _ in range(2):
        res += calcu_job()
    print('結果:', res)


# 多線程
def multiThread():
    threads = []  # 建立放置線程的容器
    q = queue.Queue()  # 建立線程的隊列物件，其實用 multiprocessing.Queue() 也可以

    # 建立兩條線程
    for _ in range(2):
        td = threading.Thread(target=calcu_job, args=(q, ))
        td.start()
        threads.append(td)

    for td in threads:
        td.join()

    res = 0
    for _ in range(q.qsize()):
        res += q.get()

    print('結果:', res)


# 多進程
def multiProcess():
    processes = []  # 建立放置進程的容器
    q = multiprocessing.Queue()  # 建立進程的隊列物件，必需用 multiprocessing.Queue()

    # 建立兩條進程
    for _ in range(2):
        mp = multiprocessing.Process(target=calcu_job, args=(q, ))
        mp.start()
        processes.append(mp)

    for mp in processes:
        mp.join()

    res = 0
    for _ in range(q.qsize()):
        res += q.get()

    print('結果:', res)



if __name__ == '__main__':
    start = time.time()
    normal()
    end1 = time.time()

    multiThread()
    end2 = time.time()

    multiProcess()
    end3 = time.time()

    print('一般: %.3f\n' % (end1-start))
    print('Threading: %.3f\n' % (end2-end1))
    print('multiprocessing: %.3f\n' % (end3-end2))
