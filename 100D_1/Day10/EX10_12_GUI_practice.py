# 2020/03/02  透過 tkinter 建立 GUI 介面 - 練習
# 
# 建立一個簡單的GUI登入介面，
# 初始畫面能輸入使用者帳號、密碼
# 並能 Log in 與 Sign up
# Lon in 後，會跳出登入是否成功的訊息視窗
# Sign up 會跳出註冊視窗
# 
# 這個練習會修改影像大小，要先安裝 pillow 模組(PIL)
# 此處特別用到 PIL 內的函數 ImageTk.PhotoImage，該函數回傳之物件可與 tkinter.PhotoImage 相容



import tkinter
import tkinter.messagebox
import pickle

# 登入主畫面的圖片尺寸稍做調整
def change_pic_size(image_path, window_width):
    from PIL import Image, ImageTk
    im = Image.open(image_path)  # 讀取圖片
    (x,y) = im.size  # 圖片的尺寸(像素)大小 x, y -- 寬x高。  回傳為 Tuple 型態
    new_x = int(window_width)  # 根據畫布寬度做調整
    new_y = int(y * (new_x/x))
    resize_im = im.resize((new_x, new_y),Image.ANTIALIAS) # 重新調整圖片大小，Image.ANTIALIAS 表示輸出為高品質
    # resize_im.show()  # show()能顯示圖片
    tk_image = ImageTk.PhotoImage(resize_im)  # PIL中能夠與tkinter相容的形式
    return tk_image


def main():
    # 點選登入按鈕的功能函數
    def log_in():
        user_id = var_id.get()
        user_pwd = var_password.get()
        try:
            with open('./res/user_info.pickle', 'rb') as user_file:  # 利用 with open 就不用再 close
                user_info = pickle.load(user_file)
        except FileNotFoundError as error:
            tkinter.messagebox.showwarning(title='警告', message='尚未擁有任何使用者資料，準備開始建立...')
            with open('./res/user_info.pickle', 'wb') as user_file:
                user_info = {'admin':'admin'}  # 建立管理者帳密，帳密皆採字串格式，儲存採用字典形式
                pickle.dump(user_info, user_file)

        if user_id in user_info:
            if user_pwd == user_info[user_id]:
                tkinter.messagebox.showinfo(title='登入成功', message=user_id.capitalize()+'\n歡迎回來這個甚麼都沒有的地方！')
            else:
                tkinter.messagebox.showerror(title='登入失敗', message='帳號密碼錯誤，沒有該用戶名稱或密碼錯誤，請再試一次！')
        elif user_pwd == '':
            tkinter.messagebox.showwarning(title='警告', message='請輸入密碼...')
        else:
            tkinter.messagebox.showerror(title='登入失敗', message='帳號密碼錯誤，沒有該用戶名稱或密碼錯誤，請再試一次！')

        if user_id == 'admin':
            members_window = tkinter.Toplevel(window)
            members_window.geometry(newGeometry='500x600+3200+300')
            members_window.title('會員清單')

            # 製作會員清單
            with open('./res/user_info.pickle', 'rb') as user_file:
                    user_info = pickle.load(user_file)
            var_member_list = tkinter.StringVar()
            var_member_list.set(tuple(user_info.keys()))
            member_list = tkinter.Listbox(members_window, listvariable=var_member_list, relief='raised')
            member_list.pack(side='left', expand=False, fill='y')

            var_member_pwd = tkinter.StringVar()
            var_member_pwd.set(tuple(user_info.values()))
            member_pwd_list = tkinter.Listbox(members_window, listvariable=var_member_pwd, relief='solid')
            member_pwd_list.pack(side='left', expand=False, fill='y')




    # 點選註冊按鈕的功能函數
    def sign_up():
        # 註冊為新會員
        def add_member():
            new_id = var_new_id.get()
            new_pwd = var_new_password.get()
            new_conf_pwd = var_conf_password.get()
            try:
                with open('./res/user_info.pickle', 'rb') as user_file:
                    user_info = pickle.load(user_file)
            except FileNotFoundError as error:
                tkinter.messagebox.showwarning(title='警告', message='尚未擁有任何使用者資料，準備開始建立...')
                with open('./res/user_info.pickle', 'wb') as user_file:
                    user_info = {'admin':'admin'}  # 建立管理者帳密，帳密皆採字串格式，儲存採用字典形式
                    pickle.dump(user_info, user_file)
            finally:
                with open('./res/user_info.pickle', 'rb') as user_file:
                    user_info = pickle.load(user_file)

            if new_pwd == '':
                tkinter.messagebox.showwarning(title='警告', message='密碼不能空白')
            elif new_pwd != new_conf_pwd:
                tkinter.messagebox.showwarning(title='警告', message='請輸入相同密碼')
            elif '@gmail.com' not in new_id:
                tkinter.messagebox.showerror(title='註冊失敗', message='請使用Gmail註冊。')
            elif new_id in user_info:
                tkinter.messagebox.showerror(title='註冊失敗', message='該用戶已存在，請使用其他用戶名稱。')
            elif new_pwd == new_conf_pwd:
                user_info[new_id] = new_pwd
                with open('./res/user_info.pickle', 'wb') as user_file:
                    pickle.dump(user_info, user_file)
                tkinter.messagebox.showinfo(title='註冊成功', message='回到登入畫面！')
                sign_up_window.destroy()  # 關閉視窗


        # 取消註冊
        def cancel_sign_up():
            keep_sign_up = tkinter.messagebox.askquestion(title='離開', message='你依依不捨地離開註冊畫面...')
            if keep_sign_up == 'yes':
                sign_up_window.destroy()  # 關閉視窗


        sign_up_window = tkinter.Toplevel(window)  # 於主視窗下，彈出新的視窗
        sign_up_window.geometry(newGeometry='500x300+3200+300')
        sign_up_window.title('註冊新用戶')

        # 帳號密碼Label
        id_label = tkinter.Label(sign_up_window, text='User ID:')
        id_label.place(relx=0.1, rely=0.1, anchor='nw')

        password_label = tkinter.Label(sign_up_window, text='Password:')
        password_label.place(relx=0.1, rely=0.25, anchor='nw')

        conf_password_label = tkinter.Label(sign_up_window, text='Confirm\nPassword:')
        conf_password_label.place(relx=0.1, rely=0.4, anchor='nw')

        # 帳號密碼Entry
        var_new_id = tkinter.StringVar()  # 追蹤字串的變數
        var_new_id.set('YOURNAME@gmail.com')  # 預設文字，帳號常會提供預設形式
        id_entry = tkinter.Entry(sign_up_window, textvariable=var_new_id, show=None, width=30)
        id_entry.place(relx=0.3, rely=0.1, anchor='nw')
        
        var_new_password = tkinter.StringVar()
        password_entry = tkinter.Entry(sign_up_window, textvariable=var_new_password, show='*', width=30)
        password_entry.place(relx=0.3, rely=0.25, anchor='nw')

        var_conf_password = tkinter.StringVar()
        password_entry = tkinter.Entry(sign_up_window, textvariable=var_conf_password, show='*', width=30)
        password_entry.place(relx=0.3, rely=0.43, anchor='nw')

        # 確認新增按鈕
        add_bt = tkinter.Button(sign_up_window, text='Add member', command=add_member)
        add_bt.place(relx=0.45, rely=0.6, anchor='e')

        # 取消註冊按鈕
        cancel_bt = tkinter.Button(sign_up_window, text='Cancel', command=cancel_sign_up)
        cancel_bt.place(relx=0.5, rely=0.6, anchor='w')



    window = tkinter.Tk()
    window.geometry(newGeometry='500x400+3000+300')
    window.title('GUI練習 - 登入系統')

    # 1. 登入主畫面
    # 1-1. 產生 Canvas 物件：建構畫布
    canvas_width = 400
    wall = tkinter.Canvas(window, height=200, width=canvas_width, bg='gray')
    wall.pack()

    pic_path = './res/gui12_1.png'
    image_file = change_pic_size(pic_path, canvas_width)
    image = wall.create_image(0, 0, anchor='nw', image=image_file)


    # 1-2. 建立框架，用以存放使用者帳號、密碼輸入
    user_frame = tkinter.Frame(window)
    user_frame.pack(side='top')

    # 帳號密碼Label
    id_label = tkinter.Label(user_frame, text='User ID:')
    id_label.grid(row=0, column=0, columnspan=2, sticky='nw')
    password_label = tkinter.Label(user_frame, text='Password:')
    password_label.grid(row=1, column=0, columnspan=2, sticky='nw')

    # 帳號密碼Entry
    var_id = tkinter.StringVar()  # 追蹤字串的變數
    var_id.set('YOURNAME@gmail.com')  # 預設文字，帳號常會提供預設形式
    id_entry = tkinter.Entry(user_frame, textvariable=var_id, show=None, width=30)
    id_entry.grid(row=0, column=2, columnspan=2, sticky='nw')
    
    var_password = tkinter.StringVar()
    password_entry = tkinter.Entry(user_frame, textvariable=var_password, show='*', width=30)
    password_entry.grid(row=1, column=2, columnspan=2, sticky='nw')


    # 1-3. 放置 Log in 與 sign up 按鈕
    login_bt = tkinter.Button(window, text='Log in', command=log_in)
    login_bt.place(relx=0.47, rely=0.66, anchor='e')
    signup_bt = tkinter.Button(window, text='Sign up', command=sign_up)
    signup_bt.place(relx=0.52, rely=0.66, anchor='w')



    # 不斷刷新視窗
    window.mainloop()



if __name__ == '__main__':
    # pic_path = './res/gui12_1.png'
    # change_pic_size(pic_path, 500)
    main()

