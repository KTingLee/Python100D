# 2020/03/08  MySQL 練習 1 -- 連接資料庫 1
# 
# 該程式碼將學習如何透過 Python 連接資料庫


import pymysql
from os import getpid

print(getpid())  # 打印出執行程式的 pid，用來對照是否連線成功
db = pymysql.connect(
    host = "localhost",  # 欲連接的 Server IP
    port = 3306,  # 該 Server 的 port
    user = "root",  # 要連接該 Server 的使用者名稱
    password = "123456",  # 要連接該 Server 的使用者密碼
    # database = 'school'  # 要連接的資料庫名稱
    )


# 建立操作游標
cursor = db.cursor()

#執行 MySQL 語法 - 顯示 MySQL 版本
cursor.execute('SELECT VERSION()')
#選取第一筆結果
data = cursor.fetchone()

print ("Database version : %s " % data)

# 如同讀取文件，游標操作完也要進行釋放
cursor.close()