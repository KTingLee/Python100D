# 2020/02/27  透過 tkinter 建立 GUI 介面3
# 
# 建立一個簡單的GUI介面，可以輸入並顯示文字
# 會使用到 tkinter.Entry()

import tkinter
import tkinter.messagebox


def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='400x400+3000+250')
    window.title('可輸入文字的GUI介面')

    # 根據指標閃爍位置，將輸入框(input)的內容展現在顯示框(result)
    def insert_point():
        msg = user_input.get()  # Entry 物件可以被 get()
        user_result.insert('insert', msg)  # Text 物件可以用 insert() 插入文字

    # 將輸入框(input)的內容展現在顯示框(result)最後的文字後方
    def insert_end():
        msg = user_input.get()  # Entry 物件可以被 get()
        user_result.insert('end', msg)  # Text 物件可以用 insert() 插入文字

    # Entry 是能夠讓使用者輸入內容的對話框
    # show 參數能夠改變使用者輸入的文字外表，例如 show='*' 便會有輸入密碼的效果
    user_input = tkinter.Entry(window, show=None, width=50)
    user_input.place(relx=0.5, rely=0.1, anchor='center')

    # Text 能夠顯示內容
    user_result = tkinter.Text(window, height=3, width=50)
    user_result.place(relx=0.5, rely=0.75, anchor='center')

    # 產生按鈕 1：根據指標閃爍位置，將輸入框(input)的內容展現在顯示框(result)
    button_point = tkinter.Button(window, text='將文字顯示在指標閃爍處', command=insert_point)
    button_point.place(relx=0.5, rely=0.2, anchor='center')

    # 產生按鈕 2:將輸入框(input)的內容展現在顯示框(result)最後的文字後方
    button_end = tkinter.Button(window, text='於文字末端接續輸出', command=insert_end)
    button_end.place(relx=0.5, rely=0.3, anchor='center')    


    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()
