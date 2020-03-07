# 2020/03/06  學習正規表達式使用方法2
# 
# 替換文字，將一段常字串中的部分字串做替換。

import re

def main():
    string = \
    '''
        韓國瑜提到自己「晚上在American Club當Security Guard，他的工作就是check the card，
        看來的人是不是member」，「If you are not member please just go away」
        還說「我的大學生活費都是American Chamber pay me！」
    '''

    # 將所有英文都替換成 *
    pattern = r'[A-z]*[A-z]'
    res = re.sub(pattern, '***', string)
    # res = re.findall(pattern, string)

    print('原始內容\n', string)
    print('把英文隱藏\n',res)


if __name__ == '__main__':
    main()