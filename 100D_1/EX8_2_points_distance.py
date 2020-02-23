# 2020/02/21  製作計算點的類別
# 
# 建立一個類別用以產生點物件
# 該物件之屬性包含其座標，方法要能計算與另一點的長度

class point():

    def __init__(self, x=0, y=0):
        self._x = x
        self._y = y

    # 指定移動座標
    def moveTo(self, newX, newY):
        self._x = newX
        self._y = newY

    # 指定移動增量
    def moveBy(self, dx, dy):
        self._x += dx
        self._y += dy

    # 計算與另一個點的距離
    def distanceWith(self, otherPoint):
        deltaX = self._x - otherPoint._x
        deltaY = self._y - otherPoint._y
        return (deltaX**2 + deltaY**2)**0.5

    def show(self):
        print('x: %.2f ; y: %.2f' % (self._x, self._y))

def main():
    p1 = point(1, 2)
    p1.show()
    
    p2 = point()
    p2.show()

    p1.moveTo(4, 5)
    p1.show()

    p1.moveBy(2, 1)
    p1.show()

    print(p1.distanceWith(p2))

if __name__ == '__main__':
    main()


