# 2020/03/08  threading 練習 4 -- 基本概念4
# 
# 本程式碼介紹，當線程執行的函數要回傳值的時候該如何處理？
# 可透過 Queue() 產生的隊列物件，取得線程執行的結果


import threading
import time
import queue


# 若要將線程結果回傳，則傳入參數時要包含Queue物件
def cubic_job(list_, q):
    for i in range(len(list_)):
        list_[i] = list_[i]**3

    # return list_  # 線程無法直接回傳值
    q.put(list_)  # 將結果放入Queue物件中


def main():
    # 用以存放線程的容器
    threads=[]

    # 建立Queue物件，用來存放線程結果
    q = queue.Queue()

    data = [[1,2], [2,3,4], [1,1,2], [1,1,6]]
    for i in range(len(data)):
        # 連同Queue物件一同傳入線程要執行的函數中
        td = threading.Thread(target=cubic_job, args=(data[i], q))

        td.start()
        threads.append(td)

    for td in threads:
        td.join()

    # 從 Queue 物件將值取回來
    res=[]
    for _ in range(q.qsize()):
        res.append(q.get())  # Queue物件要透過 get() 取值

    print(res)


if __name__ == "__main__":
    main()





