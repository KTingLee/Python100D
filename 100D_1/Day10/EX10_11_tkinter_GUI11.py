# 2020/03/01  透過 tkinter 建立 GUI 介面11
# 
# 建立一個簡單的GUI介面，該介面會顯示彈出視窗
# 對話視窗分成
# showinfo()
# showwarning()
# showerror ()
# askquestion()
# askokcancel()
# askyesno ()
# askretrycancel ()


import tkinter
from tkinter import messagebox
import time

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x400+3000+300')
    window.title('具對話視窗的GUI介面')

    # 建立框架
    frame1 = tkinter.Frame(window)
    frame1.pack()

    
    # 對話視窗函數
    def show_info():
        tkinter.messagebox.showinfo(title='Show Info', message='展示資訊的對話視窗...')

    def show_warning():
        tkinter.messagebox.showwarning(title='Show Warning', message='展示警告的對話視窗...')

    def show_error():
        tkinter.messagebox.showerror(title='Show Error', message='展示錯誤的對話視窗...')

    # 會回傳字串 'yes' 或 'no'
    def ask_ques():
        tkinter.messagebox.askquestion(title='Ask Question', message='提供選擇的對話視窗...')

    # 回傳布林值 True 或 False
    def ok_cancel():
        tkinter.messagebox.askokcancel(title='Ask OK or Cancel', message='提供選擇的對話視窗2...')

    # 回傳布林值 True 或 False
    def yes_no():
        tkinter.messagebox.askokcancel(title='Ask Yes or No', message='提供選擇的對話視窗3...')

    # 回傳布林值 True 或 False
    def retry_cancel():
        tkinter.messagebox.askretrycancel(title='Ask Retry or Cancel', message='提供選擇的對話視窗4...')
   

    # 於框架中建立對話視窗的按鈕
    bt_info = tkinter.Button(window, text='Show Info', command=show_info)
    bt_warning = tkinter.Button(window, text='Show Warning', command=show_warning)
    bt_error = tkinter.Button(window, text='Show Error', command=show_error)
    bt_question = tkinter.Button(window, text='Ask Question', command=ask_ques)
    bt_ok_cancel = tkinter.Button(window, text='Ask OK or Cancel', command=ok_cancel)
    bt_yes_no = tkinter.Button(window, text='Ask Yes or No', command=yes_no)
    bt_retry_cancel = tkinter.Button(window, text='Ask Retry or Cancel', command=retry_cancel)

    # 排列各按鈕位置
    bt_info.pack()
    bt_warning.pack()
    bt_error.pack()
    bt_question.pack()
    bt_ok_cancel.pack()
    bt_yes_no.pack()
    bt_retry_cancel.pack()


    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()

