# 2020/03/04  利用 pyGame 學習物件導向概念
# 
# 透過 pyGame 來開發遊戲，
# 該遊戲是 大球吃小球
# 透過開發遊戲的過程學習物件導向的概念
# 
# 球的反彈效果是判斷 "球的座標是否落於畫面外"
# 當 "兩球球心距離" < "兩球半徑和"，便會觸發吃掉的動作，此時半徑較小者被吃掉
# 
# 有個要注意的部分，在這邊我們定義了 Color 為列舉類別
# Ball 類別在進行初始化時，參數傳入 color=Color.RED，並讓 Ball 屬性 self.color 取得
# 基本上 print(color) 的結果為 Color.RED
# 但我們在 Ball 類別中，print(self.color) 卻會得到 (255, 0, 0) 的結果，這個值在 Color 列舉類別中定義的
# 也就是 self.color 是得到 (255, 0, 0) 而不是 Color.RED
# 
# 然而在 main() 中，window.fill(Color.BLACK) 會報錯，因為傳入的內容為 Color.BLACK 而不是 (0, 0, 0)
# 必須改為 window.fill(Color.BLACK.value) 才不會報錯


from enum import Enum, unique
from random import randint

import pygame


# 定義顏色列舉，方便選擇顏色
# @unique 能夠檢查列舉是否有重複的列舉值
# 在參數中填上 Enum 宣告為列舉型態
@unique
class Color(Enum):
    # 定義一些基本顏色作為列舉名稱，而列舉值是其對應的RGB數值
    RED = (255, 0, 0)
    GREEN = (0, 255, 0)
    BLUE = (0, 0, 255)
    BLACK = (0, 0, 0)
    WHITE = (255, 255, 255)

    # 定義靜態方法，可以由外部直接使用
    @staticmethod
    def random_color():
        r = randint(0, 255)
        g = randint(0, 255)
        b = randint(0, 255)
        return (r, g, b)



# 定義球類別
class Ball():
    def __init__(self, x, y, radius, ux, uy, color=Color.RED):
        self.x = x  # 球的 x 座標
        self.y = y
        self.radius = radius
        self.ux = ux  # 球的 x 方向速度
        self.uy = uy
        self.color = color
        self.alive = True  # 辨別球是否存活
        # print(self.color)


    # 球會有移動行為，因為要作反彈效果，所以要引入畫面
    def move(self, screen):
        self.x += self.ux  # 球下一刻的 x 座標
        self.y += self.uy
        # 判斷新座標是否會導致球外圍超出畫面，若超出就會反彈(反彈就是令速度方向相反)
        if self.x - self.radius <= 0 or self.x + self.radius >= screen.get_width():
            self.ux = -self.ux
        if self.y - self.radius <= 0 or self.y + self.radius >= screen.get_height():
            self.uy = -self.uy


    # 球也有吃掉對方的動作，所以要引入另一顆球作參數
    def eat(self, other):
        if self.alive and other.alive and self != other:
            # 計算兩球球心距離
            dx, dy = self.x - other.x , self.y - other.y
            distance = (dx**2 + dy**2)**0.5
            # 判斷是否發生吃掉動作，以及吃掉的後續
            if distance < (self.radius + other.radius) and self.radius > other.radius:
                other.alive = False
                self.radius = self.radius + int(other.radius * 0.12)


    # 每隔一幀，都要在螢幕上重新繪製球
    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius, 0)  # 參數 0 表示是一個實心園




def main():
    # 建立一個存放所有球的容器
    ball_list = []

    # 初始化導入的 pygame 模塊
    pygame.init()
    # 建立視窗，並設置大小
    window = pygame.display.set_mode((800, 600))
    # 設定視窗標題
    pygame.display.set_caption('大球吃小球')


    # 建立事件監控循環
    running = True
    while running:
        for event in pygame.event.get():   # 獲取事件
            if event.type == pygame.QUIT:  # 透過 .type 來檢查事件種類
                running = False

            # 滑鼠造成的事件
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                x, y = event.pos  # 透過 .pos 獲取滑鼠位置
                radius = randint(10, 50)
                ux, uy = randint(-10, 10) , randint(-10, 10)
                color = Color.random_color()
                # 於滑鼠點擊處產生一顆新的球
                ball = Ball(x, y, radius, ux, uy, color)
                # 將新產生的球放入紀錄球的容器內
                ball_list.append(ball)

        # 設定視窗背景
        window.fill(Color.BLACK.value)

        # 檢查球存活的狀況
        for ball in ball_list:
            if ball.alive:
                ball.draw(window)
            else:
                ball_list.remove(ball)

        # 刷新視窗
        pygame.display.flip()
        # 間隔時間(毫秒, ms)
        pygame.time.delay(50)

        # 球進行移動與吃的動作
        for ball in ball_list:
            ball.move(window)
            for other in ball_list:  # 因為 eat() 有排除自己吃自己，所以沒事
                ball.eat(other)


if __name__ == '__main__':
    a = Color.RED
    print(a)
    main()
