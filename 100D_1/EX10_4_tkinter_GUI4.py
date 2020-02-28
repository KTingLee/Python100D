# 2020/02/28  透過 tkinter 建立 GUI 介面4
# 
# 建立一個簡單的GUI介面，有清單選項可以選擇，並將選擇結果輸出於顯示列
# 
# 該程式碼會用到 StingVar() 物件，該物件可以追蹤變數的更動
# 以 ListBox() 建立清單物件，並透過該物件方法 get() 以及 curselection()
# 獲取當前選擇的清單內容
# 
# 以 Label() 產生標籤物件，並透過其物件方法 config() 以修改該物件之內容

import tkinter
import time


def main():
    # 視窗基本設置
    window = tkinter.Tk()
    window.geometry(newGeometry='300x400+3000+200')
    window.title('具清單選項的GUI介面')


    # 按鈕1對應的函數：將文字回傳至標籤物件(print_Window)
    def print_your_select():
        temp = list_box.get(list_box.curselection())  # curselection() 可以回傳當前的選擇
        time.sleep(0.1)  # 加入延遲，不然 temp 可能還未取值就進行下一個動作，會導致報錯
        print_Window.config(text=temp)  # 修改 print_Window 物件內容

    # 產生按鈕1：能夠將選擇的清單選項輸出到顯示列
    button1 = tkinter.Button(window, text='Print your select', command=print_your_select)
    button1.place(relx=0.4, rely=0.3, anchor='ne')


    # 產生標籤物件：顯示列視窗
    print_Window = tkinter.Label(window, text='', font=('Arial', 16), bg='yellow', width=6)
    print_Window.place(relx=0.5, rely=0.15, anchor='center')


    # 產生清單物件：提供選項清單
    content = ['A', 'B', 'C', 'D']
    select_list = tkinter.StringVar()
    select_list.set(tuple(content))  # 此範例清單用 tuple 型態(這樣值就不會被變更)
    list_box = tkinter.Listbox(window, listvariable=select_list)
    list_box.place(relx=0.5, rely=0.4, anchor='n')  # 將上方點作為卯釘點


    def add_new_item():
        msg = user_input.get()
        if msg != '' and msg not in select_list.get():
            list_box.insert('end', msg)

    # 產生按鈕2：能夠新增選項至清單中
    button2 = tkinter.Button(window, text='add new item', command=add_new_item)
    button2.place(relx=0.6, rely=0.3, anchor='nw')


    # 產生 Entry 物件：能輸入文字
    user_input = tkinter.Entry(window, show=None)
    user_input.place(relx=0.5, rely=0.25, anchor='center')


    # 不斷刷新視窗
    window.mainloop()


if __name__ == "__main__":
    main()