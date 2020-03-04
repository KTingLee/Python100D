# 2020/02/18  Temprature Convert
# 該程式碼用以轉換 攝氏 與 華氏 溫度
#
# 華氏轉攝氏公式
# C = 5/9 * (F -32)

def Comp_Trans(degree, string='F'):
    return 5/9 * (degree - 32) if string=='F' else degree*(9/5) + 32

degree = float(input("輸入華氏溫度: "))  # 注意，input() 會回傳 'str' 型態
print(Comp_Trans(degree))
