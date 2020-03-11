# 2020/03/10  multiprocessing 練習 1 -- 基本概念1
# 
# 這篇程式碼對 單核心、多核心 做個簡單範例
# 模擬下載檔案的過程，比較兩者花費時間

import multiprocessing
import time
from os import getpid

# 定義檔案類別
class MyFile():
    def __init__(self, fileName=None, downloadTime=1):
        self._name = fileName
        self._downloadTime = downloadTime

    def download(self, processName='Main'):
        print(f'透過 {processName} 下載，其 pid: {getpid()}')
        print(f'開始下載 {self._name} ... 預期花費 {self._downloadTime} 秒')
        time.sleep(self._downloadTime)
        print(f'下載完成！\n')



def main():
    # 建立下載檔案
    fileA = MyFile('小片片', 2)
    fileB = MyFile('論文', 3)

    print('單核心下載過程...')
    start = time.time()  # 紀錄時間起點
    fileA.download()
    fileB.download()
    end = time.time()  # 時間終點
    print('實際花費時間 %.2f' % (end - start), '\n'*3)


    print('多核心下載過程...')
    # 建立兩個進程，用來下載兩檔案
    mp1 = multiprocessing.Process(target=fileA.download, args=('mp1', ))  # target 可以放物件方法？
    mp2 = multiprocessing.Process(target=fileB.download, args=('mp2', ))

    start = time.time()  # 紀錄時間起點
    mp1.start()  # 進程開始執行
    mp2.start()
    mp1.join()   # 說明必需等待該進程結束，下一段程式碼才能結束
    mp2.join()
    end = time.time()  # 時間終點
    print('實際花費時間 %.2f' % (end - start))

if __name__ == '__main__':
    main()

