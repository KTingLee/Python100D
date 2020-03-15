# 2020/03/08  MySQL 練習 2 -- 讀取資料庫內容
# 
# 該程式碼將學習如何透過 Python 連接資料庫，
# 並讀取 school 資料庫中的資料表


import pymysql
from os import getpid

print('該程式 pid:', getpid())  # 打印出執行程式的 pid，用來對照是否連線成功
db = pymysql.connect(
    host = "localhost",  # 欲連接的 Server IP
    port = 3306,  # 該 Server 的 port
    user = "root",  # 要連接該 Server 的使用者名稱
    password = "123456",  # 要連接該 Server 的使用者密碼
    )


# 建立操作游標
cursor = db.cursor()

# 執行 MySQL 語法
# 先轉換至目標資料庫
cursor.execute('USE school')

# 顯示 school 資料庫中包含幾個資料表，並透過 fetchall() 回傳結果
cursor.execute('SHOW tables')
res = cursor.fetchall()
for row in res:
    print(row)


# 讀取 school 資料庫中的資料表 tb_student，並透過 fetchall() 回傳結果
cursor.execute('SELECT * FROM tb_student')
res = cursor.fetchall()
for row in res:
    print(row)


# 如同讀取文件，游標操作完也要進行釋放
cursor.close()

# 除了釋放游標紀錄的內容，連線也要解除
# db.close()