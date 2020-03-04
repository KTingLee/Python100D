# 2020/02/20  Return the extension of file
# 
# 給定文件名稱，回傳其副檔名

def return_suffix(file_name):
    suffix = filename

    index = suffix.find('.')
    if index == -1:
        print('檔案名稱沒有副檔名餒...')

    while index != -1:
        suffix = suffix[index+1:]
        index = suffix.find('.')
    return suffix

if __name__ == "__main__":
    filename = 'abc.efg.fet.txt'
    print(return_suffix(filename))