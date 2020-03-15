-- 判斷是否存在 school 的資料庫，若有則刪除
DROP Database if exists school;

-- 建立 school 資料庫，預設其編碼為 utf-8，而排序方式為 utf8_bin
-- utf8_bin 是讓字串能以二進制方式判斷，這樣搜尋字串時便可以區分大小寫
CREATE Database school DEFAULT CHARSET utf8 COLLATE utf8_bin;

-- 切換到 school 資料庫
USE school;

-- 建立學院資料表
CREATE Table tb_college
(
collid int not null auto_increment comment '編號',  # auto_increment 可以讓數字自動增加
collname varchar(50) not null comment '名稱',
collmaster varchar(20) not null comment '院長',
collweb varchar(511) default '' comment '學院網站',
primary key (collid)  # 設定主鍵為 collid
);

-- 建立學生資料表
CREATE Table tb_student
(
stuid int not null comment '學號',
stuname varchar(20) not null comment '姓名',
stusex bit default 1 comment '性別',
stubirth date not null comment '出生日期',
stuaddr varchar(255) default '' comment '地址',
collid int not null comment '所屬學院',
primary key (stuid),  # 建立主鍵為 stuid
foreign key (collid) references tb_college (collid)  # 建立外鍵 collid 其連接至 tb_college 的 collid
);

-- 另一種增加外鍵的方法
# alter table tb_student add constraint fk_student_collid foreign key (collid) references tb_college (collid);

-- 建立教師表
CREATE Table tb_teacher
(
teaid int not null comment '教師編號',
teaname varchar(20) not null comment '姓名',
teatitle varchar(10) default '助教' comment '職稱',
collid int not null comment '所屬學院',
primary key (teaid),
foreign key (collid) references tb_college (collid)
);

-- 建立課程表資料表
CREATE Table tb_course
(
couid int not null comment '課程編號',
couname varchar(50) not null comment '名稱',
coucredit int not null comment '學分數',
teaid int not null comment '授課老師',
primary key (couid),
foreign key (teaid) references tb_teacher (teaid)
);

-- 建立選課記錄資料表
CREATE Table tb_score
(
scid int auto_increment comment '選課紀錄編號',
stuid int not null comment '選課學生',
couid int not null comment '所選課程',
scdate datetime comment '選課時間日期',
scmark decimal(4,1) comment '考試成績',
primary key (scid),
foreign key (stuid) references tb_student (stuid),
foreign key (couid) references tb_course (couid)
);

-- 增加唯一性約束(同一堂課程，學生只能選一次)
-- UNIQUE 會限制該欄的值不能重複，例如 stuname 被 UNIQUE，那就不能有兩個相同名稱的學生
-- 修改(ALTER)資料表 tb_score，對其增加限制(add constraint)
-- UNIQUE (stuid, couid) 表示 (stuid 與 couid) 的結果不能出現兩次，例如不能出現兩列 (1234, 5678)
ALTER Table tb_score add constraint uni_score_stuid_couid UNIQUE (stuid, couid);



-- 新增學院數據
INSERT into tb_college (collname, collmaster, collweb) values 
('北部發展院', '黃大生', 'http://www.Taipei'),
('中部發展院', '鄭書豪', 'http://www.Taichung'),
('雄部發展院', '顏濃眉', 'http://www.Kaohsiung');

-- 新增學生數巨
INSERT into tb_student (stuid, stuname, stusex, stubirth, stuaddr, collid) values
(1001, '黃杯杯', 1, '1990-3-4', '台南永康', 1),
(1002, '陳阿姨', 1, '1992-2-2', '台南永康', 1),
(1033, '邱顯至', 0, '1989-12-3', '台北高雄', 1),
(1572, '黃國昌', 1, '1993-7-19', '台北新竹', 1),
(1378, '蔡英文', 0, '1995-8-12', '台北台北', 1),
(1954, '顏清標', 1, '1994-9-20', '台中海線', 1),
(2035, '陳柏為', 1, '1988-6-30', null, 2),
(3011, '周湯豪', 1, '1985-12-12', '台東泰碼', 3),
(3755, '韓國瑜', 1, '1993-1-25', null, 3),
(3923, '黃靜瑩', 0, '1985-4-17', '台北高雄', 3);

-- 新增老師數據
INSERT into tb_teacher (teaid, teaname, teatitle, collid) values 
(1122, '蕭氏菌', '教授', 1),
(1133, '堂起召', '副教授', 1),
(1144, '蔡英文', '教授', 1),
(2255, '核清鄭', '副教授', 2),
(3366, '陳章零', '講師', 3);

-- 新增課程數據
insert into tb_course (couid, couname, coucredit, teaid) values 
(1111, 'Python程式設計', 3, 1122),
(2222, 'Web前端開發', 2, 1122),
(3333, '操作系統', 4, 1122),
(4444, '計算機網路', 2, 1133),
(5555, '波浪力學', 4, 1144),
(6666, '演算法與數據結構', 3, 1144),
(7777, '流體力學', 3, 2255),
(8888, '水文學', 2, 3366),
(9999, '數值模擬', 3, 3366);

-- 新增學生選課數據
insert into tb_score (stuid, couid, scdate, scmark) values 
(1001, 1111, '2017-09-01', 95),
(1001, 2222, '2017-09-01', 87.5),
(1001, 3333, '2017-09-01', 100),
(1001, 4444, '2018-09-03', null),
(1001, 6666, '2017-09-02', 100),
(1002, 1111, '2017-09-03', 65),
(1002, 5555, '2017-09-01', 42),
(1033, 1111, '2017-09-03', 92.5),
(1033, 4444, '2017-09-01', 78),
(1033, 5555, '2017-09-01', 82.5),
(1572, 1111, '2017-09-02', 78),
(1378, 1111, '2017-09-05', 82),
(1378, 7777, '2017-09-02', 65.5),
(2035, 7777, '2018-09-03', 88),
(2035, 9999, curdate(), null),  # curdate() 回傳當前 yyyy-mm-dd
(3755, 1111, date(now()), null),  # now() 回傳當前 yyyy-mm-dd HH:MM:SS
(3755, 8888, date(now()), null),
(3755, 9999, '2017-09-01', 92);