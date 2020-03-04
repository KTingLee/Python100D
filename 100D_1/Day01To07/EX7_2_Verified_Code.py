# 2020/02/20  Make a verified code
# 
# 輸入驗證碼長度，該驗證碼由大小寫英文以及數字組成

import random
def Make_Code(code_len=6):
    """
    指定驗證碼長度，回傳驗證碼

    :param code_len: 驗證碼長度，預設為6碼

    :return: 回傳由大小寫英文以及數字組成的驗證碼
    """

    all_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    your_code=''

    for i in range(code_len):
        # 注意 randint 的範圍是到 len(all_chars)-1
        # 因為 all_char 最後一個 index 為 len(all_chars)-1
        num = random.randint(0, len(all_chars)-1)  
        your_code += all_chars[num]

    return your_code

if __name__ == "__main__":
    your_code = Make_Code()
    print(your_code)