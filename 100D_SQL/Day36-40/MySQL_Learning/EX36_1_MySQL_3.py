# 2020/03/08  MySQL 練習 3 -- 修改資料庫內容
# 
# 該程式碼將學習如何透過 Python 連接資料庫，
# 並修改 school 資料庫中的資料表，
# 利用 Python 修改資料表時須注意，每次更動的最後的要 cursor.commit() 來提交結果


import pymysql
from os import getpid

print('該程式 pid:', getpid())  # 打印出執行程式的 pid，用來對照是否連線成功
db = pymysql.connect(
    host = "localhost",  # 欲連接的 Server IP
    port = 3306,  # 該 Server 的 port
    user = "root",  # 要連接該 Server 的使用者名稱
    password = "123456",  # 要連接該 Server 的使用者密碼
    database = 'school'   # 先轉換至 school 資料庫
    )


# 建立操作游標
cursor = db.cursor()

# 執行 MySQL 語法
# 讀取 school 資料庫中的資料表 tb_student，並透過 fetchone() 回傳第一列結果
cursor.execute('SELECT * FROM tb_student')
res = cursor.fetchone()
print(res)

# 插入新內容
new_row = "INSERT into tb_student (stuid, stuname, stusex, stubirth, stuaddr, collid) values (5278, '老臣樂隊', 1, '1901-1-5', '台灣嗨嗨', 2)"

ans = cursor.execute(new_row)
if ans:
    print('輸入成功！')


# 最後要 commit() 才會真正修改資料庫
db.commit()

# 連線解除
db.close()

# 如同讀取文件，游標操作完也要進行釋放
# cursor.close()

