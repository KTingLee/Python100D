# 2020/03/10  multiprocessing 練習 6 -- 基本概念6
# 
# 這篇將介紹多進程的 Lock 使用
# 其實與 多線程 差異不大，比較有問題的部分反而是 共享變數 如何設置以及取值

import multiprocessing
import time

def job(globalValue, num, lock):
    lock.acquire()  # 將要保護的範圍上鎖，如此某一進程執行時，其他線程、進程便無法使用
    for _ in range(10):
        globalValue.value += num  # Value()產生的共享變數要用 value 取值
        time.sleep(0.1)
        print(globalValue.value)
    lock.release()


def main():
    # 定義一個共享變數，該變數為 int 型態，初始值為 0
    GV = multiprocessing.Value('i', 0)

    # 建立 Lock 物件，並將該物件一起傳入目標函數
    lock = multiprocessing.Lock()

    mp1 = multiprocessing.Process(target=job, args=(GV, 1, lock))
    mp2 = multiprocessing.Process(target=job, args=(GV, 2, lock))

    mp1.start()
    mp2.start()

    mp1.join()
    mp2.join()
    

if __name__ == '__main__':
    main()



