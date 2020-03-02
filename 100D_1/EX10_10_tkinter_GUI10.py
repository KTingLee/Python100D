# 2020/03/01  透過 tkinter 建立 GUI 介面10
# 
# 建立一個簡單的GUI介面，該介面主要練習的是 Frame(框架)
# 
# 在設計 GUI 介面時，通常會區分成數個區塊
# 例如某個區塊是放置勾選的、顯示結果的
# 此時如果各個物件是獨立的，那要移動的話便要逐一移動
# 而透過 Frame 就可將數個物件框住，這樣要移動的話就能成群移動囉
# 
# 該程式碼會用到 
# 透過 Frame() 以產生框架

import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x400+3000+300')
    window.title('透過框架歸納GUI介面')


    # 第一個 Frame
    fram1 = tkinter.Frame(window)  # 顯示框架外框
    fram1.pack(side='left')
    
    # 於框架中放置其他物件，例如清單、按鈕
    label1 = tkinter.Label(fram1, text='位於第一個框架的label')
    label1.pack(side='top')

    button1 = tkinter.Button(fram1, text='button in Frame1')
    button1.pack()

    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()



