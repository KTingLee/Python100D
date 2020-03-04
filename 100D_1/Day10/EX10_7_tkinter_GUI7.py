# 2020/02/29  透過 tkinter 建立 GUI 介面7
# 
# 建立一個簡單的GUI介面，具有checkbutton選項(能夠多重勾選的選項)
# 
# 該程式碼會用到 IntVar() 物件，該物件可以追蹤變數的更動，與 StringVar() 很像，但 StringVar 是紀錄字串
# 透過 Checkbutton() 建立勾選物件
# 與 Radiobutton 類似，但 Radiobutton 只能單一勾選
# 

import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x300+2800+400')
    window.title('具有多重選擇的GUI介面')

    # 產生 Label 物件：輸出選擇的結果
    print_window = tkinter.Label(window, text='Show the results...',
        font=('Arial', 12), fg='red', bg='yellow', 
        width=40
        )
    print_window.place(relx=0.5, rely=0.02, anchor='n')



    # 定義當 checkbutton 被勾選時能產生的功能
    def print_select():
        check_value = [cb1_var.get(), cb2_var.get(), cb3_var.get()]
        ans = ['Python', 'C/C++', 'Java']
        msg = []
        if sum(check_value) == 3:
            print_window.config(text='I want to learn all programming langrages.')
        elif sum(check_value) == 0:
            print_window.config(text='I don\'t like any programming langrage...')
        else:
            for i, item in enumerate(check_value):
                if item == 1:
                    msg.append(ans[i])
            if len(msg) > 1:
                msg = ' , '.join(msg)
            else:
                msg = msg[0]
            msg += '.'
            print_window.config(text='I want to learn '+msg)


    # 產生 Checkbutton 物件：能夠多重勾選
    cb1_var = tkinter.IntVar()  # 建立一個 IntVar 物件，該物件的值會因為選項被勾選與否而改變
    cb1 = tkinter.Checkbutton(window, text='Python',
        variable=cb1_var,  # checkbutton 也有 variable 參數，其指定的變數值會根據該選項的狀態而改變
        onvalue=1,   # 若該選像被勾選，則 variable 中指定的按鈕會得到 onvalue 的值
        offvalue=0,  # 若該選像被勾選，則 variable 中指定的按鈕會得到 offvalue 的值
        command=print_select
        )
    cb1.place(relx=0.5, rely=0.15, anchor='n')


    # 產生第二個 Checkbutton 物件
    cb2_var = tkinter.IntVar()  
    cb2 = tkinter.Checkbutton(window, text='C/C++',
        variable=cb2_var,
        onvalue=1,
        offvalue=0,
        command=print_select
        )
    cb2.place(relx=0.5, rely=0.25, anchor='n')


    # 產生第三個 Checkbutton 物件
    cb3_var = tkinter.IntVar()
    cb3 = tkinter.Checkbutton(window, text='Java',
        variable=cb3_var,
        onvalue=1,
        offvalue=0,
        command=print_select
        )
    cb3.place(relx=0.5, rely=0.35, anchor='n')


if __name__ == '__main__':
    main()



