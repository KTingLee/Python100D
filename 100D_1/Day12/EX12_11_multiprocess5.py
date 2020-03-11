# 2020/03/10  multiprocessing 練習 5 -- 基本概念5
# 
# 這篇介紹多進程如何產生各進程都可訪問的變數

import multiprocessing

# 保存一個值的變數
# Value(typecode_or_type, *args, lock=True)
value = multiprocessing.Value('i', 12)  # 'i': int, 'd': double, 'f': float
print(value.value)


# 儲存一維向量的變數
# Array(typecode_or_type, size_or_initializer, *, lock=True)
array = multiprocessing.Array('d', [3.14, 0.4771])
print(array)
