# 2020/02/20  輸入的日期是當年的第幾天？
# 
# 回顧 EX2_3 所寫的閏年函數
# 閏年的 2月 有 29天。
# 平年的 2月 有 28天。

from EX2_3_Is_leap_year import is_leap

def which_day(year, month, day):
    m_dict = {'1':31, '2':28, '3':31, '4':30, '5':31, '6':30, '7':31, '8':31, '9':30, '10':31, '11':30, '12':31}
    this_day = day

    if is_leap(year):
        m_dict['2'] = 29

    for m in range(1, month):
        this_day += m_dict[str(m)]

    return this_day

if __name__ == "__main__":
    # print(which_day(1995,2,25))
    print(which_day(1980, 11, 28))
    print(which_day(1981, 12, 31))
    print(which_day(2018, 1, 1))
    print(which_day(2016, 3, 1))




