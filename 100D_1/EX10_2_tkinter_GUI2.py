# 2020/02/27  透過 tkinter 建立 GUI 介面2
# 
# 建立一個簡單的GUI介面，能夠點擊按鈕而改變文字輸出

import tkinter
import tkinter.messagebox


def main():

    # 建立按鈕功能，注意下方的 value 是全域變數
    # 但函數內會變成局部變數，所以加上關鍵字 nonlocal 告知函數內的 value 不為局部變數
    value = True
    def hit_me():
        nonlocal value
        if value == True:
            value = False
            msg, color, font = ('未來要做成計算機！', 'red', ('Arial', 24))
        else:
            value = True
            msg, color, font = ('No problem.', 'white', ('Arial', 18))
        label.config(text=msg, fg=color, font=font)  # 這邊的 label 是在後面定義的

    def quit_button():
        if tkinter.messagebox.askokcancel('第一個參數是標題', '確定離開？'):
            window.quit()  # window 是後面定義的


    window = tkinter.Tk()
    window.geometry(newGeometry='520x300+3300+200')
    window.title(string='按鈕影響輸出練習')


    label = tkinter.Label(window, bg='black')
    label.pack(expand=True)

    # 注意，command 接的函數不加小括號
    button = tkinter.Button(window, text='點擊我', width=12, height=3, command=hit_me)
    button.pack(side='bottom')

    button2 = tkinter.Button(window, text='離開點我', comman=quit_button)
    button2.pack(side='right')

    # 因為文字會改變，所以要依值刷新視窗
    window.mainloop()




if __name__ == '__main__':
    main()





