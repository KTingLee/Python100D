# 2020/03/06  學習正規表達式使用方法
# 
# 檢驗帳號、學號是否符合格式
# 帳號必須由英文字母大小寫、數字或下底線組成，不包含特殊字元，例如 `!@#$%^&*;,.()[] 等
# 長度介於 6 ~ 20 個字元
# 
# 學號共9碼，開頭必為大寫英文，其餘 8 碼為任意數字

import re

# 定義檢查帳號
def check_user_id(user_id):
    pattern = r'^[0-9A-Za-z_]{6,20}$'
    return re.match(pattern, user_id)


# 定義檢查學號
def check_school_id(school_id):
    pattern = r'^[A-Z]\d{8}$'
    return re.match(pattern, school_id)


def main():
    user_id = input('請輸入帳號...  ')
    res_user = check_user_id(user_id)
    if not res_user:
        raise ValueError('請輸入正確格式的帳號！')
    else:
        print(f'你的帳號 {user_id} 符合格式要求，請接著輸入學號\n')

    school_id = input('請輸入學號...  ')
    res_school = check_school_id(school_id)
    if not res_school:
        raise ValueError('請輸入正確格式的學號！')
    else:
        print(f'你的學號 {school_id} 符合要求，恭喜你完成輸入。')




if __name__ == '__main__':
    main()