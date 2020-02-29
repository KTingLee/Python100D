# 2020/02/29  透過 tkinter 建立 GUI 介面8
# 
# 建立一個簡單的GUI介面，能顯示圖片，並控制圖片
# 
# 該程式碼會用到 
# 透過 Canvas() 產生畫布，之後能把各種圖樣放至該畫布上
# 若要輸入圖片可以透過 tkinter 的方法 PhotoImage() 導入圖片，
# 再透過畫布(Canvas)的方法 create_image() 放置到畫布中
# 
# 其餘一般幾何圖形，例如 直線(line)、扇形(arc)、圓形(oval)、矩形(rect)等，都可由畫布的方法建構
# 
# 若要移動畫布中的物件，可透過畫布的物件方法 move()

import tkinter

def main():
    window = tkinter.Tk()
    window.geometry(newGeometry='500x800+2800+100')
    window.title('具有畫布的GUI介面')

    # 產生 Canvas 物件：建構畫布
    wall = tkinter.Canvas(window, height=600, width=400, bg='gray')
    wall.pack()

    # 透過 PhotoImage() 導入圖片：注意，無法讀取 jpg 格式
    # 此外，如果要顯示圖片，記得要在最後加上 mainloop()
    image_file = tkinter.PhotoImage(file='./res/gui8.gif')
    image = wall.create_image(50, 200, anchor='se', image=image_file)

    # 產生幾何物件
    x0, x1, y0, y1 = 50, 200, 70, 80  # x0, y0 為左上點；x1, y1 為右下點
    line = wall.create_line(x0, x1, y0, y1)  # 產生線段
    circle = wall.create_oval(x0, x1, y0, y1)  # 產生圓形
    rect = wall.create_rectangle(x0, x1, y0, y1)  # 產生矩形
    arc = wall.create_arc(x0+100, x1, y0, y1, start=35, extent=60)  # 產生扇形，起始角度為35，結束角度為60


    # 定義移動物件的函數
    def move_it():
        wall.move(circle,  # 畫布的物件方法 move，要給定欲移動的物件名稱
            2,  # 每次移動的 x 距離
            8   # 每次移動的 y 距離
            )


    # 產生 button 物件：用以移動畫布中的物件
    move_button = tkinter.Button(window, text='move element', command=move_it)
    move_button.place(relx=0.5, rely=0.8, anchor='n')



    # 不斷刷新視窗
    window.mainloop()


if __name__ == '__main__':
    main()