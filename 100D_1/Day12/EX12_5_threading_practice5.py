# 2020/03/08  threading 練習 5 -- 基本概念5
# 
# 多線程在使用時，可能要處理同一個變數，例如 線程1 將結果寫入該變數後再由 線程2 做進一步計算
# 但線程執行速度不一，可能 線程1 寫到一半時 線程2 就已經開始計算
# 這個時候到底該怎麼決定變數被哪條線程掌控？
# 
# 透過 Lock() 便可以將變數鎖定在同一條線程，如此一來，
# 線程在操作上鎖的變數時，該變數就不會被其他線程使用

import threading
import time
import queue


def job1(A):
    # global A  # 要改寫全域變數 A
    for i in range(10):
        A += 1
        print(f'td1 {A} ')


def job2(A):
    # global A  # 要改寫全域變數 A
    for i in range(10):
        A += 10
        print(f'td2 {A} ')

def main():
    A = 0
    td1 = threading.Thread(target=job1, args=(A, ))
    td2 = threading.Thread(target=job2, args=(A, ))

    td1.start()
    td2.start()

    td1.join()
    td2.join()

    print('All done!')


if __name__ == "__main__":
    # A = 0
    main()
    