# 2020/02/19  Fibonacci sequence
# 
# 費波那契數(Fibonacci sequence)又稱為黃金分割數列
# 該數列是由 0 與 1 開始，下一個數即為前兩個數之和
#
# 該數列展開如下：
# 0, 1, 1, 2, 3, 5, 8, 13, ...
# 
# 注意，最前方的 0 稱為"第零項"，而非第一項。

def Fibonacci_seq(length):
    Fib_list = [0, 1]
    if length < 3:
        return Fib_list[0:length]
    else:
        for i in range(length-2):
            Fib_list.append(sum(Fib_list[-2:]))
        return Fib_list[0:length]

res = Fibonacci_seq(20)
print(len(res))
print(res)