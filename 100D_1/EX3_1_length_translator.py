# 2020/02/18  Translation of between cm and inch
# 該程式碼會轉換 公分 與 英吋
#
# 英吋、公分換算：
# 1 inch = 2.54 cm

def inch_cm(length, unit):
    if unit == 'inch':
        return 2.54* length
    elif unit == 'cm':
        return 1/2.54* length
    else:
        print('請輸入正確單位!')

all_unit = ['inch', 'cm']

unit = input('欲輸入之長度單位( inch 或 cm ): ')
length = float(input('請輸入長度: '))

all_unit.remove(unit)

print(inch_cm(length, unit), all_unit[0])

