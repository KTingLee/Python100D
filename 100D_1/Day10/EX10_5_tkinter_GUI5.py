# 2020/02/28  透過 tkinter 建立 GUI 介面5
# 
# 建立一個簡單的GUI介面，提供選項做選擇(但不是清單)，並會根據選擇的對象不同而輸出不同文字
# 
# 該程式碼會用到 StringVar() 物件，該物件可以追蹤變數的更動
# 透過 Radiobutton() 建立選項物件
# 
# 這邊要注意 Radiobutton 的參數 variable 與 value
# 例如 rb1 的 variable=rb_result, value='A'
# 表示變數 rb_result 會取得 'A' 這個值


import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='400x500+3000+400')
    window.title('具有選項的GUI介面')


    # 建立 label 物件：將選項結果輸出的視窗
    print_window = tkinter.Label(window, width=30, bg='gray', fg='white')
    print_window.place(relx=0.5, rely=0.05, anchor='n')


    # 將選項的結果輸出
    def hit_rb():
        msg = 'You have selected ' + rb_result.get()  # 透過 get() 以獲取 StringVar 物件的值
        print_window.config(text=msg)

    rb_result = tkinter.StringVar()  # 用以儲存選項的結果

    # 建立 radiobutton 物件：可點選的選項
    rb1 = tkinter.Radiobutton(window, text='Option A',
        variable=rb_result, value='A',  # variable 給定的變數會獲得 value 的值
        command=hit_rb)
    rb1.place(relx=0.5, rely=0.15, anchor='center')


    # 建立第二的選項
    rb2 = tkinter.Radiobutton(window, text='Option B', 
        state='disabled', # state 參數可以讓選項無法被使用
        relief='sunken',  # relief 參數表示該選項的外觀
        variable=rb_result, value='第二個選項',  # variable 給定的變數會獲得 value 的值
        command=hit_rb)
    rb2.place(relx=0.5, rely=0.2, anchor='center')


    # 建立第三個選項
    rb3 = tkinter.Radiobutton(window, text='Option A',
        variable=rb_result, value='Third',  # variable 給定的變數會獲得 value 的值
        command=hit_rb)
    rb3.place(relx=0.5, rely=0.25, anchor='center')    


    # 不斷刷新視窗
    window.mainloop()



if __name__ == '__main__':
    main()



