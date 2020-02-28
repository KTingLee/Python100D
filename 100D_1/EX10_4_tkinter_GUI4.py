# 2020/02/28  透過 tkinter 建立 GUI 介面4
# 
# 建立一個簡單的GUI介面，有清單選項可以選擇，並將選擇結果輸出於顯示列




import tkinter


def main():
    # 視窗基本設置
    window = tkinter.Tk()
    window.geometry(newGeometry='200x400+3000+200')
    window.title('具清單選項的GUI介面')


    # 按鈕1對應的函數：將文字回傳至標籤物件(print_Window)
    def print_your_select():
        pass

    # 產生按鈕1：能夠將選擇的清單選項輸出到顯示列
    button1 = tkinter.Button(window, text='Print your select', command=print_your_select)
    button1.place(relx=0.5, rely=0.3, anchor='center')


    # 產生標籤物件：顯示列視窗
    print_Window = tkinter.Label(window, text='', font=('Arial', 16), bg='yellow', width=6)
    print_Window.place(relx=0.5, rely=0.15, anchor='center')


    # 產生清單物件：提供選項清單
    select_list = ('A', 'B', 'C', 'D')  # 此範例清單用 tuple 型態(這樣值就不會被變更)
    list_box = tkinter.Listbox(window, list=select_list)
    list_box.place(relx=0.5, rely=0.4, anchor='n')  # 將上方點作為卯釘點







if __name__ == "__main__":
    main()