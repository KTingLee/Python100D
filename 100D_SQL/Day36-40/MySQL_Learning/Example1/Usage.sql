-- 查看 tb_student 資料表的所有內容
SELECT * FROM tb_student;


-- 查看 tb_course 資料表內的 couname 與 coucredit 欄位
SELECT couname, coucredit FROM tb_course;

-- 查看 tb_course 資料表內的 couname 與 coucredit 欄位，並將其命名為 課程名稱 與 學分
SELECT couname as 課程名稱, coucredit as 學分 FROM tb_course;

-- 查看 tb_student 資料表的 stuname 欄位，若 stusex 為 1 則顯示為 男，否則為 女
SELECT stuname as 姓名, case stusex when 1 then '男' else '女' end as 性别 FROM tb_student;
SELECT stuname as 姓名, IF(stusex, '男', '女') as 性别 FROM tb_student;  # 另一種寫法


-- 查看 tb_student 中，stusex = 0 的內容(並只看 stuname 與 stubirth)
SELECT stuname, stubirth FROM tb_student WHERE stusex=0;

-- 查看 tb_student 中，stubirth 介於某一區間的內容(並只顯示 stuname、stusex、stubirth)
SELECT stuname, stusex, stubirth FROM tb_student WHERE stubirth>='1980-1-1' and stubirth<='1989-12-31';
SELECT stuname, stusex, stubirth FROM tb_student WHERE stubirth BETWEEN '1980-1-1' and '1989-12-31';


-- 查看 stuname 第一個字為 楊 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '楊%';

-- 查看 stuname 為兩個字，且第一個字為 黃 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '黃_';

-- 查看 stuname 為三個字，且第一個字為 黃 的內容，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '黃__';


-- 查看 stuname 中間為 國 或 英，並顯示 stuname 與 stusex
SELECT stuname, stusex FROM tb_student WHERE stuname LIKE '%國%' or stuname LIKE '%英%';

-- 查看 tb_student 中 stuaddr 為空值的 stuname 欄位
SELECT stuname FROM tb_student WHERE stuaddr is NULL;

-- 查看 tb_student 中 stuaddr 為不為空值的 stuname 欄位
SELECT stuname FROM tb_student WHERE stuaddr is NOT NULL;


-- 查詢 tb_score 中的 scdate 欄位
-- DISTINCT 可去除重複的
SELECT DISTINCT scdate FROM tb_score;


-- 輸出計算結果
-- 查看 stusex=1 的 stuname 欄位，並把 stubirth 欄位做計算，命名為 年齡 欄位
-- 並將結果以 年齡 欄位做遞減排列
-- ORDER BY 將結果進行排列
-- asc - ascending - 升冪(由小到大)
-- desc - descending - 降冪(由大到小)
SELECT stuname as 姓名, year(now())-year(stubirth) as 年齡 FROM tb_student WHERE stusex=1 ORDER BY 年齡 desc;


-- Aggregate 函數使用(這些函數都會忽略 NULL 值)
-- Aggregate functions：max() / min() / count() / sum() / avg()
-- 查看 stubirth 最小的資料(也就是年紀最大的)
SELECT min(stubirth) FROM tb_student;

-- 計算 stuid 的數量(忽略NULL)
select count(stuid) from tb_student;


-- 查看 stusex 欄位，並依照其結果做分組
SELECT stusex FROM tb_student GROUP BY stusex;

-- 查看 stusex 欄位，並依照其結果做分組，同時計算各組數量
SELECT stusex, count(*) FROM tb_student GROUP BY stusex;

-- 查看 stusex 欄位，並依照其結果做分組，同時顯示各組 stubirth 最小者
SELECT stusex, min(stubirth) FROM tb_student GROUP BY stusex;

-- 查看 tb_score 中，couid=1111 的 scmark 欄位，並計算其平均值、最小值
SELECT avg(scmark) FROM tb_score WHERE couid=1111;
SELECT min(scmark) FROM tb_score WHERE couid=1111;

-- 查看 tb_score 中，couid=1111 的 scid 數量
SELECT count(scid) FROM tb_score WHERE couid=1111;  # 修課學生數量，不會重複
-- 查看 tb_score 中，couid=1111 的 scmark 數量
SELECT count(scmark) FROM tb_score WHERE couid=1111;  # 修課學生成績，可能有重複，所以小於等於學生數量

-- 查看 tb_score 中，stuid=1001 的 scmark 欄位，並計算其平均值
SELECT avg(scmark) FROM tb_score WHERE stuid=1001;

-- 查看 tb_score，以 stuid 做分組，並計算各組 scmark 的平均
SELECT stuid as 學號, avg(scmark) as 平均分數 FROM tb_score GROUP BY stuid;

-- 查看 avg(scmark) >= 90 的 stuid 及其 avg(scmark)
-- 分組前的篩選使用 WHERE
-- 分組後的篩選使用 HAVING
SELECT stuid as 學號, avg(scmark) as 平均分數 FROM tb_score GROUP BY stuid HAVING 平均分數 >= 90;


-- 查看 min(stubirth) 的 stuname，在 WHERE 後來自另一個查詢結果，所以稱為子查詢、鑲嵌式查詢
# SELECT stuname FROM tb_student WHERE stubirth=min(stubirth);  # 錯誤，最後的 min(stubirth) 還要加上來源
SELECT stuname, stubirth FROM tb_student WHERE stubirth = (
    SELECT min(stubirth) FROM tb_student
    );


-- 查看 min(stubirth) 的 stuname，並將 stubirth 換成年齡
SELECT stuname as 姓名, year(now())-year(stubirth) as 年齡 FROM tb_student WHERE stubirth = (
    SELECT min(stubirth) FROM tb_student
    );


-- 查看 tb_score，以 stuid 做分組，並計算各組數量，顯示數量大於 2 者的 stuname
SELECT stuname as 姓名 FROM tb_student WHERE stuid in(
    SELECT stuid as 學號 FROM tb_score GROUP BY stuid HAVING count(stuid) > 2
    );



-- 連接查詢
-- 查詢 stuname、couname、scmark
SELECT stuname, couname, scmark FROM tb_student t1, tb_course t2, tb_score t3 WHERE t1.stuid=t3.stuid and t2.couid=t3.couid and scmark is not NULL;

-- NOT YET
select stuname, couname, scmark from tb_student t1 inner join tb_score t3 on t1.stuid=t3.stuid inner join tb_course t2 on t2.couid=t3.couid where scmark is not null order by scmark desc limit 5 offset 10;





























