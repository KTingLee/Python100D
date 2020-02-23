# 2020/02/20  文字跑馬燈
# 
# 該程式碼要透過終端機執行～
# 

import os
import time

def Marquee_word():
    content = '我在練習python...'
    while True:
        # 清除終端機顯示內容
        os.system('cls')
        
        print(content)
        # 等待1毫秒
        time.sleep(0.5)
        content = content[1:] + content[0]  # 將第一個字移到最後

if __name__ == '__main__':
    Marquee_word()