#1.基础查询

--查询全部
SELECT * FROM coder;

--查询指定字段
SELECT `name`,`id`,`workName` FROM coder;

--别名AS(可以给字段起别名,也可以给表起别名)
SELECT `name` AS 姓名,`id` AS 编号 FROM coder AS 开发人员表;

--函数 CONCAT(str1,str2)
SELECT CONCAT('姓名',`name`) AS 名字 FROM coder;

--查询系统版本
SELECT VERSION();

--用来计算(计算表达式)
SELECT 100*10-20 AS 结果

--查询自增长步长(变量)
SELECT @@auto_increment_increment;

--查询去重
SELECT DISTINCT `jsCoder` FROM result;



#2.条件查询
#语法: SELECT 表字段 FROM 表名 WHERE 筛选条件;

--查询符合年龄在25到60之间的数据
SELECT `name`,`id`,`workName` FROM coder WHERE `age`>=25 AND `age`<=60;  
SELECT `name`,`id`,`workName` FROM coder WHERE `age`>=25 && `age`<=60;
SELECT `name`,`id`,`workName` FROM coder WHERE `age`BETWEEN 25 AND 60;

--排除不符合的项
SELECT `name`,`id`,`workName` FROM coder WHERE `age`!=26;
SELECT `name`,`id`,`workName` FROM coder WHERE NOT `age`=26;

--查询姓名带王的人
SELECT `name`,`id`,`workName` FROM coder WHERE `name` LIKE '%王%';

--查询名字倒数第二个为惊的人
SELECT `name`,`id`,`workName` FROM coder WHERE `name` LIKE '%惊_';

--查询10,20的人
SELECT `name`,`id`,`workName` FROM coder `name` IN (10,20);

#3.分组查询


#4.连接查询
