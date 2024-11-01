#1.插入数据(增)

--普通用法
INSERT INTO `coder`(`name`) VALUES ('王惊涛')

--插入多条数据
INSERT INTO `coder`(`name`,`workName`) VALUES ('王惊涛','前端开发'),('王港旗','后端开发')

--省略字段
INSERT INTO `coder` VALUES ('王惊涛','前端开发')

--语法
# INSERT INTO 表名([字段1,字段2])VALUES('值1','值2')
# 字段与字段之间使用英文逗号分开
# 字段是可以省略的,但是值必须完整并一一对应
# 可以同时插入多条数据,VALUES后面的值需要使用逗号分开


#2.修改数据(改)
--指定修改条件
UPDATE `coder` SET `name`='wjt' WHERE id=1;

--不指定条件,会改动全局
UPDATE `coder` SET `name`='wjt';

--修改多个属性
UPDATE `coder` SET `name`='wjt',`workName`='web前端开发' WHERE id=1;

--修改多个条件定位数据
UPDATE `coder` SET `name`='wjt' WHERE `name`='王惊涛' AND `workName`='前端开发'

--语法
# UPDATE 表名 SET 字段1=值1 WHERE 条件

#3.删除数据(删)

--删除数据
DELETE FROM `coder`  

--删除指定数据
DELETE FROM `coder`WHERE id=1

#语法: DELETE FROM 表名 [WHERE 条件]
