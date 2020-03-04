# 2020/02/29  透過 tkinter 建立 GUI 介面9
# 
# 建立一個簡單的GUI介面，為自己的GUI介面建立工作列
# 
# 該程式碼會用到 
# 透過 Menu() 以產生工作列(Menu)物件
# 以 Menu() 的物件方法 add_casecade() 建構工作列選項，例如常見的 'File', 'Edit', 'Help' 等等
# 
# 一般，我們在點選 'File' 欄會跳出更多選項，例如 'New File', 'Load File' 等等
# 這種點選後會產生功能的是透過 Menu() 的物件方法 add_command() 來達成
# 
# 最重要的是，在建立完各種清單後，要透過 window.config(menu=basic_menu)
# 將創造的清單掛在基礎視窗中

import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x400+3000+300')
    window.title('具有工作列的GUI介面')


    # 建立基礎 Menu 物件：用以放置其他子清單，例如 'File', 'Edit', 'Help' 等等
    basic_menu = tkinter.Menu(window)  # 這個基礎工作列是放在 window 上

    # 建立子 Menu 的容器：例如 'File', 'Edit', 'Help'
    # 容器是指說，這些 menu 還沒被真正放在 basic_menu 上，要出現在 basic_menu 必須透過 add_casecade() 來完成
    file_menu = tkinter.Menu(basic_menu)  # 這些子清單是建立於基礎menu上(basic_menu)
    edit_menu = tkinter.Menu(basic_menu)
    help_menu = tkinter.Menu(basic_menu, tearoff=False)  # tearoff 是沒用的功能(虛線)選項


    # 將 'File', 'Edit', 'Help' 子清單，透過 add_casecade() 掛在 basic_menu 物件中
    basic_menu.add_cascade(menu=file_menu, label='File')  # menu 要提供 Menu() 物件，label 是指如何命名該清單
    basic_menu.add_cascade(menu=edit_menu, label='Edit')
    basic_menu.add_cascade(menu=help_menu, label='Help')



    # 在子清單中加上細部功能
    # File 清單的 功能函數 與 創建過程
    def New_file():
        pass
    def Load_file():
        pass
    def Save_file():
        pass

    file_menu.add_command(label='New File', command=New_file)
    file_menu.add_command(label='Load File', command=Load_file)
    file_menu.add_command(label='Save File', command=Save_file)
    file_menu.add_separator()  # add_separator() 能做分隔線
    file_menu.add_command(label='Exit', command=window.quit)  # 使用 tkinter 內件函數 quit 離開視窗


    # Edit 清單
    # 在 Edit 清單中，我們添加一個子清單，製作方法與 "在 basic_menu 中添加子清單" 的過程相同
    edit_sub_comment = tkinter.Menu(edit_menu, tearoff=False)  # 建立子清單容器，該容器是要建立在 edit_menu 下，並關閉虛線選項
    edit_menu.add_cascade(label='Comment', menu=edit_sub_comment)  # 添加子清單至 edit_menu 中，並命名為 'Comment'

    # 建立 Edit 清單的功能函數與創建過程
    def cut_word():
        pass
    def toggle_comment():
        pass

    edit_menu.add_command(label='Cut', command=cut_word)  # 在 Edit 清單中新增 Cut 功能
    edit_sub_comment.add_command(label='Toggle Comment', command=toggle_comment)  # 在 Edit 子清單 Comment 中，新增 Toggle Comment 功能


    # 將以上的 menu 掛回 GUI 介面
    window.config(menu=basic_menu)

    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()


