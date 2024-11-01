#多表查询
SELECT userName,role,work,age,work_id,price 
From test02 person,user users,workList worklist    #可以起别名,但是起了就必须用
WHERE person.name = users.userName     #这些是关联条件,两个表里能连接的条件
AND person.work = worklist.work_name 
AND userName = '王惊涛';

#三张表,test02,user和workList




#等值连接和非等值连接






#自连接和非自连接


SELECT t.name,t.id,t.work,w.work_desc,w.price 
FROM test02 t JOIN workList w 
ON t.work = w.work_name 
JOIN user u ON t.name = u.userName;




#内连接和外连接

#左外连接   左边表的全部和右边表里面和左表对得上条件的数据
SELECT t.id,t.name,t.work,u.role,u.token 
FROM test02 t LEFT OUTER JOIN user u 
ON t.name = u.userName;

#右外连接同理

#满外连接
