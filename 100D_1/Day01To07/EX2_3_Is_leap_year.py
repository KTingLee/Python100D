# 2020/02/18  Is Leap year?
# 該程式碼會根據輸入的 年分 判斷該年分是否為 閏年
#
# 閏年規則：
# 1.  可被 4 整除，但不可被 100 整除。 或，
# 2.  可被 400 整除

def is_leap(year):
    if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
        print('leap year!')
        return 1
    else:
        print('ordinary year.')
        return 0

if __name__ == "__main__":
    year = int(input('請輸入年分：'))
    print(is_leap(year))

