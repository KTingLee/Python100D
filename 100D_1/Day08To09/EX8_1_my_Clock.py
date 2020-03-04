# 2020/02/21  自製時鐘
# 
# 這次學習怎麼建立一個 class，
# 建立一個時鐘物件，該物件包含 時、分、秒 三個屬性，
# 且能夠不停顯示時間
#
# 該程式碼以終端機運行

import time

class clock():
    def __init__(self, hour=0, minute=0, second=0):
        # 習慣上，讓屬性屬於受保護或是私有的
        self._hour = hour
        self._minute = minute
        self._second = second

    # 秒針運行
    def run(self):
        self._second += 1
        if self._second == 60:
            self._minute += 1
            self._second = 0
            if self._minute == 60:
                self._hour += 1
                self._minute = 0
                if self._hour == 24:
                    self._hour = 0

    def show_time(self):
        print('%2d：%2d：%2d' % (self._hour, self._minute, self._second))

def main():
    now_hour   = int(input('請輸入時：'))
    now_minute = int(input('請輸入分：'))
    now_second = int(input('請輸入秒：'))

    my_clock = clock(now_hour, now_minute, now_second)
    while True:
        my_clock.run()
        my_clock.show_time()
        time.sleep(1)

if __name__ == '__main__':
    main()




