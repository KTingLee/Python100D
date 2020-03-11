# 2020/03/10  multiprocessing 練習 2 -- 基本概念2
# 
# 與 EX12_4 一樣，用來說明進程如何取得函數執行後的結果
# 
# 一樣透過 Queue 物件，但與線程不同的是，
# 線程是使用 queue 模組的 Queue()
# 進程是使用 multiprocessing 的 Queue()


import multiprocessing
import time

# 定義進程執行函數
def cubic_job(list_, queue_obj):
    for i in range(len(list_)):
        list_[i] = list_[i]**3

    # return list_  # 一樣回傳後無法獲取
    queue_obj.put(list_)  # 將結果放入對列物件中


def main():
    # 用以存放進程的容器
    processes = []

    # 產生隊列物件，注意，採用的模組是 multiprocessing
    q = multiprocessing.Queue()

    data = [[1,2], [2,3,4], [1,1,2]]
    for i in range(len(data)):
        mp = multiprocessing.Process(target=cubic_job, args=(data[i], q))  # 連同隊列物件一同傳入
        mp.start()
        processes.append(mp)

    for mp in processes:
        mp.join()

    # 從 Queue 物件中將值取回
    res = []
    for _ in range(q.qsize()):
        res.append(q.get())

    print(res)

if __name__ == '__main__':
    main()