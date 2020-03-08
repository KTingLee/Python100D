# 2020/03/08  threading 練習 2 -- 基本概念2
# 
# 這邊會講述 threading 的基本函數 join()
# 由於多線程是將任務分派給多條線，並同時運行
# 因此可能產生「搶拍」的問題，也就是原本應該先執行完 A 段，再執行 B 段
# 結果多線程使得 B 段在 A 段「尚未完整結束」時就起步
# 這時候就要透過 join() 讓 B 段乖乖等待 A 段的結束

import threading
import time

# 定義線程需執行的任務
def job():
    print(f'長線程執行 {threading.current_thread()}...\n')
    for i in range(10):
        time.sleep(0.1)
    print(f'長線程結束')


def main():
    # 建立新線程，透過參數 target 提供線程執行內容
    # 與 tkinter 的 button command 相同，只要輸入名稱即可
    td1 = threading.Thread(target=job, name='td1')

    # Thread() 只是建立線程，必須透過 start() 來啟用
    td1.start()


    print('All Done.')


if __name__ == "__main__":
    main()




