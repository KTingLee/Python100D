# 2020/02/29  透過 tkinter 建立 GUI 介面6
# 
# 建立一個簡單的GUI介面，能透過捲動的方式快速調整數值
# 
# 該程式碼會用到 StringVar() 物件，該物件可以追蹤變數的更動
# 透過 Scale() 建立捲動物件
# 

import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x300+2800+400')
    window.title('具有捲動物件的GUI介面')

    # 產生 Label 物件：顯示捲動結果
    print_window = tkinter.Label(window, text='顯示捲動軸結果', 
        bg='yellow', font=('Arial', 18), fg='red',
        width=20
        )
    print_window.place(relx=0.04, rely=0.04, anchor='nw')

    
    # 捲動軸的功能
    def slide_result(value):
        temp = 'Now value is ' + value
        print_window.config(text=temp, font=('Arial', 18))


    # 產生 Scale 物件：捲動軸
    scale1 = tkinter.Scale(window,
        orien='horizontal',  # 捲動的方向
        length=200,  # 捲動軸的長度以像素為單位
        activebackground='gray',  # 當滑鼠點選捲動紐的時候，其反應顏色
        from_=0,  # 設定捲動軸起始大小，可用 to 決定最後範圍，間距則以 tickinterval 決定
        to=90,
        tickinterval=30,
        resolution=0.01,  # 顯示值的位數，若只顯示整數則為 1，若小數第一位則 0.1，第二位則 0.01
        label='Try me',  # 顯示捲動軸文字
        command=slide_result  # 捲動軸在捲動時的函數處理(每次捲動都會回傳對應數值(以str型式)，所以函數必須傳入參數)
        )
    scale1.place(relx=0.04, rely=0.15, anchor='nw')


    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()
