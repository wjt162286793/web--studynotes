--创建数据库
CREATE DATABASE [IF NOT EXISTS] wjt_db1;

--删除数据库
DROP DATABASE [IF EXISTS] wjt_db1;

--使用数据库
#如果表名或者字段名是特殊字符,需要带``
use wjt_db1;

--查看数据库
SHOW DATABASES;