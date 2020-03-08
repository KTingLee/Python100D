# 2020/03/08  threading 練習 1 -- 基本概念
# 
# 這邊會講述 threading 的基本函數
# 例如 Tread(target= , args= ) 能夠建立函數，參數 target 提供該線程執行功能，
# 若參數欲執行之功能(函數)需要傳入參數，則再輸入 args 提供參數 
# 
# 其餘基本函數如 active_count()、cuttrent_thread() 也一併介紹



import threading

def job():
    print(f'新增的線程名稱 {threading.current_thread()}\n')


def main():
    # 建立新線程，透過參數 target 提供線程執行內容
    # 與 tkinter 的 button command 相同，只要輸入名稱即可
    td1 = threading.Thread(target=job)

    # Thread() 只是建立線程，必須透過 start() 來啟用
    td1.start()


    print('我是分隔線'.center(20, '='))
    # 計算當前啟用的線程數目
    print(threading.active_count())  # 1，表示只有一條線程
    # 顯示線程名稱
    print(threading.enumerate())  # [<_MainThread(MainThread, started 4644640192)>]
    # 顯示執行程式時的線程名稱
    print(threading.current_thread())  # <_MainThread(MainThread, started 4644640192)>


if __name__ == "__main__":
    main()