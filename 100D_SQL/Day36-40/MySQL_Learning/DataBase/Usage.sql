-- 查看所有學生資料
-- 查看 tb_student 資料表的所有內容
SELECT * FROM tb_student;


-- 查看課程資料表中，各課程的學分數
-- 查看 tb_course 資料表內的 couname 與 coucredit 欄位
SELECT couname, coucredit FROM tb_course;

-- 查看課程資料表中，各課程的學分數，並將其命名為 課程名稱 與 學分
-- 查看 tb_course 資料表內的 couname 與 coucredit 欄位，並將其命名為 課程名稱 與 學分
SELECT couname as 課程名稱, coucredit as 學分 FROM tb_course;



-- 查看學生性別
-- 查看 tb_student 資料表的 stuname 欄位，若 stusex 為 1 則顯示為 男，否則為 女
-- 判別式 case...WHEN...then...else...end
SELECT stuname as 姓名, case stusex when 1 then '男' else '女' end as 性别 FROM tb_student;
SELECT stuname as 姓名, IF(stusex, '男', '女') as 性别 FROM tb_student;  # 另一種寫法


-- 查看女學生生日
-- 查看 tb_student 中，stusex = 0 的內容(並只看 stuname 與 stubirth)
SELECT stuname, stubirth FROM tb_student WHERE stusex=0;


-- 查詢特定出生範圍的學生
-- 查看 tb_student 中，stubirth 介於某一區間的內容(並只顯示 stuname、stusex、stubirth)
SELECT stuname, stusex, stubirth FROM tb_student WHERE stubirth>='1980-1-1' and stubirth<='1989-12-31';
SELECT stuname, stusex, stubirth FROM tb_student WHERE stubirth BETWEEN '1980-1-1' and '1989-12-31';


-- 查詢姓楊的學生
-- 查看 stuname 第一個字為 楊 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '楊%';

-- 查詢姓黃且為兩個字的學生
-- 查看 stuname 為兩個字，且第一個字為 黃 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '黃_';

-- 查詢姓黃且為三個字的學生
-- 查看 stuname 為三個字，且第一個字為 黃 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '黃__';

-- 查詢名字有 國 或 英 的學生
-- 查看 stuname 中間為 國 或 英，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '%國%' or stuname LIKE '%英%';


-- 查詢尚未填寫住址的學生
-- 查看 tb_student 中 stuaddr 為空值的 stuname 欄位
SELECT stuname FROM tb_student WHERE stuaddr is NULL;

-- 查詢有填住址的學生
-- 查看 tb_student 中 stuaddr 為不為空值的 stuname 欄位
SELECT stuname FROM tb_student WHERE stuaddr is NOT NULL;


-- 查詢哪幾天有學生選課
-- 查詢 tb_score 中的 scdate 欄位
-- DISTINCT 可去除重複的
SELECT DISTINCT scdate FROM tb_score;



-- 輸出計算結果
-- 計算男學生年齡，並以降冪排列
-- 查看 stusex=1 的 stuname 欄位，並把 stubirth 欄位做計算，命名為 年齡 欄位
-- 並將結果以 年齡 欄位做遞減排列
-- ORDER BY 將結果進行排列
-- asc - ascending - 升冪(由小到大)
-- desc - descending - 降冪(由大到小)
SELECT stuname as 姓名, year(now())-year(stubirth) as 年齡 FROM tb_student WHERE stusex=1 ORDER BY 年齡 desc;


-- 查詢最早出生的學生
-- Aggregate 函數使用(這些函數都會忽略 NULL 值)
-- Aggregate functions：max() / min() / count() / sum() / avg()
-- 查看 stubirth 最小的資料(也就是年紀最大的)
SELECT min(stubirth) FROM tb_student;


-- 查詢學生數量
-- 計算 stuid 的數量(忽略NULL)
select count(stuid) from tb_student;


-- 查看 stusex 欄位，並依照其結果做分組
SELECT stusex FROM tb_student GROUP BY stusex;

-- 查看 stusex 欄位，並依照其結果做分組，同時計算各組數量
SELECT stusex, count(*) FROM tb_student GROUP BY stusex;

-- 查看 stusex 欄位，並依照其結果做分組，同時顯示各組 stubirth 最小者
SELECT stusex, min(stubirth) FROM tb_student GROUP BY stusex;


-- 查詢課程id為1111的平均分數以及最低分
-- 查看 tb_score 中，couid=1111 的 scmark 欄位，並計算其平均值、最小值
SELECT avg(scmark) FROM tb_score WHERE couid=1111;
SELECT min(scmark) FROM tb_score WHERE couid=1111;


-- 查看 tb_score 中，couid=1111 的 scid 數量
SELECT count(scid) FROM tb_score WHERE couid=1111;  # 修課學生數量，不會重複
-- 查看 tb_score 中，couid=1111 的 scmark 數量
SELECT count(scmark) FROM tb_score WHERE couid=1111;  # 修課學生成績，可能有重複，所以小於等於學生數量

-- 查看 tb_score 中，stuid=1001 的 scmark 欄位，並計算其平均值
SELECT avg(scmark) FROM tb_score WHERE stuid=1001;


-- 查看各學生該學期的平均分數
-- 查看 tb_score，以 stuid 做分組，並計算各組 scmark 的平均
SELECT stuid as 學號, avg(scmark) as 平均分數 FROM tb_score GROUP BY stuid;

-- 查看學期平均分數大於90分的學生
-- 查看 avg(scmark) >= 90 的 stuid 及其 avg(scmark)
-- 分組前的篩選使用 WHERE
-- 分組後的篩選使用 HAVING
SELECT stuid as 學號, avg(scmark) as 平均分數 FROM tb_score GROUP BY stuid HAVING 平均分數 >= 90;


-- 查看最早出生的學生生日以及其名稱
-- 查看 min(stubirth) 的 stuname，在 WHERE 後來自另一個查詢結果，所以稱為子查詢、鑲嵌式查詢
# SELECT stuname FROM tb_student WHERE stubirth=min(stubirth);  # 錯誤，最後的 min(stubirth) 還要加上來源
SELECT stuname, stubirth FROM tb_student WHERE stubirth = (
    SELECT min(stubirth) FROM tb_student
    );

-- 查看 min(stubirth) 的 stuname，並將 stubirth 換成年齡
SELECT stuname as 姓名, year(now())-year(stubirth) as 年齡 FROM tb_student WHERE stubirth = (
    SELECT min(stubirth) FROM tb_student
    );


-- 查看修超過2門課的學生姓名及修課數
-- 查看 tb_score，以 stuid 做分組，並計算各組數量，顯示數量大於 2 者的 stuname
SELECT stuname as 姓名 FROM tb_student WHERE stuid in(
    SELECT stuid as 學號 FROM tb_score GROUP BY stuid HAVING count(stuid) > 2
    );


-- 連接查詢
-- 查詢 stuname、couname、scmark
-- 這邊將 tb_student 稱為 t1，tb_course 稱為　t2，且這兩個資料表彼此有關連性，
-- 例如 tb_score 的兩個外鍵 fk 分別為 tb_student 與 tb_course 的主鍵
SELECT stuname, couname, scmark FROM tb_student t1, tb_course t2, tb_score t3 WHERE t1.stuid=t3.stuid and t2.couid=t3.couid and scmark is not NULL;

-- 使用 INNER JOIN 方式(INNER JOIN 與 JOIN 相同)
-- INNER JOIN 可以對多個表取交集，下面以分隔式的方式進行寫，方便閱讀
SELECT stuname, couname, scmark 
FROM tb_student t1 
INNER JOIN tb_score t3 on t1.stuid=t3.stuid 
INNER JOIN tb_course t2 on t2.couid=t3.couid 
WHERE scmark is not NULL;

-- limit N, M  或  limit M offset N
-- 從 index=N 的資料開始顯示，並顯示 M 筆
SELECT stuname, couname, scmark 
FROM tb_student t1 
INNER JOIN tb_score t3 on t1.stuid=t3.stuid 
INNER JOIN tb_course t2 on t2.couid=t3.couid 
WHERE scmark is not NULL 
ORDER BY scmark desc 
LIMIT 3 offset 10;  # 略過前10筆，並顯示接下來的3筆資料，也可寫成 limit 10, 5
                    # 也可說從 index=10 的資料開始回傳(MySQL 的 index 由 0 開始)
                    # 若只有 limit 3 表示回傳前 3 筆



-- 查詢學生姓名與平均成績(利用子查詢與連接查詢)
-- 對 tb_score 以 stuid 進行分組，並計算 avg(scmark)
SELECT stuid, avg(scmark)
FROM tb_score
GROUP BY stuid;

-- 查詢學生姓名
SELECT stuid, stuname
FROM tb_student;

-- 結合兩個資料(JOIN 方式)
SELECT t1.stuname, t2.avg_score
FROM tb_student t1
INNER JOIN (
    SELECT stuid, avg(scmark) as avg_score
    FROM tb_score
    GROUP BY stuid
) t2
on t1.stuid = t2.stuid;

-- 結合兩個資料(WHERE 方式)
SELECT t1.stuid, t1.stuname, avg_score
FROM tb_student t1,
     (SELECT stuid, avg(scmark) as avg_score FROM tb_score t2 GROUP BY stuid) t2
WHERE t1.stuid = t2.stuid;


-- 查詢學生姓名、選課數量(LEFT JOIN 與連接查詢)
-- 選課數量中，有些學生沒選到課，所以結果不會有他的 stuid
-- 若用 INNER JOIN 則沒選到課的學生會直接不在表上，而非選課數量為 0
-- 也就是說
-- LEFT JOIN 會把第一個資料表的 column 做保留，並把第二個資料表加入，
-- 若第二個資料表於第一個資料表沒有對應，就給定 NULL 值

-- 先瞭解 學生選課數量
SELECT stuid, count(stuid) as couNum
FROM tb_score
GROUP BY stuid;

-- 建立學生姓名與上表關係
SELECT t1.stuid, t1.stuname, ifnull(couNum, 0)  # ifnull(col, num) 若 col 存在 null 則令其為 0
FROM tb_student t1
LEFT JOIN (
    SELECT stuid, count(stuid) as couNum 
    FROM tb_score 
    GROUP BY stuid
    ) t2
on t1.stuid = t2.stuid;
