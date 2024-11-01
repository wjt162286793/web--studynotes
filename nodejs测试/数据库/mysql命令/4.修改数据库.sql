--修改表名
# 格式:  ALTER TABLE 原表名 RENAME AS 新表名
ALTER TABLE wjt_1 RENAME AS wjt_01

--增加表的字段
# 格式: ALTER TABLE 表名 ADD 字段名 列属性[属性]
ALTER TABLE wjt_01 ADD love VARCHAR(20)

--修改表的字段(重命名,修改约束)
# 重命名:  ALTER TABLE 表名 CHANGE 原名称 新名称 [列属性]
# 修改约束: ALTER TABLE 表名 MODIFY 字段名 [列属性]
ALTER TABLE wjt_01 CHANGE love like VARCHAR(20)
ALTER TABLE wjt_01 MODIFY like VARCHAR(30)

--删除表的字段
# 格式 :ALTER TABLE 表名 DROP 字段名
ALTER TABLE wjt_01 DROP like

--删除表 如果存在再删除
DROP TABLE IF EXISTS wjt_01;

