# 2020/03/08  threading 練習 3 -- 基本概念3
# 
# 這邊介紹，當線程執行的函數需要傳入參數時該怎麼辦？
# 

import threading
import time


# 定義線程需執行的任務
def job(i):
    print(f'第 {i} 個線程，輸出文字 {i}')
    time.sleep(3-0.1*i)
    print(f'且第 {i} 個線程休息 {3-0.1*i:3.2f} 秒')


def main():
    # 用以存放線程的容器
    threads=[]

    td_num = 4  # 指定線程數目

    for i in range(td_num):
        # 若線程執行函數要傳入參數，則必須提供 args=
        # 且當傳入的參數只有一個時，結尾的逗號不可省略
        td = threading.Thread(target=job, args=(i,))

        td.start()
        threads.append(td)

    for td in threads:
        td.join()

    print(f'All done!')


if __name__ == "__main__":
    main()

