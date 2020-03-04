# 2020/02/27  透過 tkinter 建立 GUI 介面1
# 
# 建立一個簡單的GUI介面，顯示文字以及按鈕(但該按鈕沒有功用)

import tkinter

# 供按鈕物件使用的函數
def hit_me():
    pass

def main():
    # 建立基礎視窗
    basic_window = tkinter.Tk()
    # 設定視窗大小(寬度x高度+起始X位置+起始Y位置)
    basic_window.geometry(newGeometry='520x300+3300+200')
    # 設定視窗標題
    basic_window.title(string='tkinter建立GUI介面')
    

    # 產生標籤物件(能顯示於視窗中)，有許多參數可給定
    # 最基本的就是該標籤要顯示於哪裡(master)、標籤內容(text)、字體(font)、
    # 標籤長度與寬度(都用字元為單位width,height)、背景顏色(bg)、字體顏色(fg)
    text1 = 'Calculator.'
    label1 = tkinter.Label(basic_window,
        text=text1,
        font=('Arial', 24),
        bg='black',
        fg='white'
        )

    # 產生完標籤物件後，接著可決定要置於視窗何處
    # 有許多放置方式，如 pack()--自動選擇適當位置、place()--給定座標放置、Grid()--基於網格座標放置
    label1.place(relx=0.35)


    # 建立按鈕物件
    button1 = tkinter.Button(basic_window, 
        text='點擊',
        width=15,
        height=2,
        command=hit_me  # command表示該按鈕能提供的功能，可以接函數，不加小括號
        )
    button1.pack(side='bottom')  # 放置按鈕物件


    text2 = '之後要做計算機哦！'
    label2 = tkinter.Label(basic_window, 
        text=text2, 
        font=('console', 12), 
        width=19+10, 
        height=3, 
        bg='blue', 
        fg='red'
        )
    label2.pack(expand=True)
  

    # 讓視窗不停刷新
    tkinter.mainloop()


if __name__ == '__main__':
    main()



