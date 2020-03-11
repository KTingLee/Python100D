# 2020/03/08  threading 練習 6 -- 基本概念6
# 
# 這篇程式碼說明如何建立自己的線程子類別(繼承自 Thread)
# 
# 首先我們定義一個帳戶的類別 `Account` 並在其中定義存款方法 `deposit()`。
# 再來定義一個線程類別 `AddMoneyThread`，該類別主要用來產生線程，
# 並用 更方便的方式讓線程執行工作，也就是覆寫 `Thread` 本身的物件方法 `run()`。
# 
# 在 `main()` 中，會先建立 `Account` 物件，並建立多個線程，每一條線程都進行存款的動作。

import threading
import time
import queue

# 定義帳戶類別
class Account():
    def __init__(self):
        self._balance = 0  # 初始化結餘為 0
        self._lock = threading.Lock()

    # 定義物件方法，存款
    def deposit(self, money):
        self._lock.acquire()
        new_balance = self._balance + money
        time.sleep(0.01)  # 加入延遲，讓線程有機會互搶變數
        self._balance = new_balance
        self._lock.release()

    @property
    def balance(self):
        return self._balance


# 定義線程類別，繼承自 Thread，所以在參數中必須打上 Thread
class AccountThread(threading.Thread):
    def __init__(self, account, money):     # 不確定是不是可以不加父類別的參數
        super().__init__()  # 不確定父類別的初始函數是不是可以不加參數
        self._account = account
        self._money = money

    # 覆寫 Thread 類別的物件方法 run()，提供線程要執行的功能
    def run(self):
        self._account.deposit(self._money)


def main():
    account = Account()
    print('存款前結餘:', account.balance)
    threads = []  # 建立存放線程的容器

    for _ in range(100):
        td = AccountThread(account, 1)  # 建立線程，並提供初始參數
        td.start()
        threads.append(td)

    for td in threads:
        td.join()

    print('存款後結餘:', account.balance)


if __name__ == "__main__":
    main()












