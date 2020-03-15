# 2020/03/08  MySQL 練習 4 -- rollback()
# 
# 每次更動的最後的要 cursor.commit() 來提交結果
# 但當更動失敗的時候，可以透過 rollback() 來返回


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


# 新內容
new_info = [(5279, '老G樂隊', 1, '1901-1-5', '台灣嗨嗨', 2),
            (5245, '老科樂隊', 0, '1901-1-5', '台灣嗨嗨', 2),
            (5245, '老科樂隊', 0, '1901-1-5', '台灣嗨嗨', 2, 6)]  # 多一個輸入

# 執行 MySQL 語法
for data in new_info:
    new_row = "INSERT into tb_student (stuid, stuname, stusex, stubirth, stuaddr, collid) values " + str(data)

    try:
        with db.cursor() as cursor:  # 這樣就不需要用 cursor.close() 釋放
            ans = cursor.execute(new_row)
            if ans:
                print(data,'\n輸入成功！\n')

            db.commit()  # 提交結果以修改資料庫

    except:
        # 發生錯誤回復到上一次 commit 狀態
        db.rollback()

# 連線解除
db.close()

