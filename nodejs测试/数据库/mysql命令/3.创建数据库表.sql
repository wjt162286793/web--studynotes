CREATE TABLE IF NOT EXISTS `coder`(
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '工号',
    `name` VARCHAR(10) NOT NULL DEFAULT '佚名' COMMENT '姓名',
    `work` VARCHAR(20) NOT NULL DEFAULT '待业' COMMENT '工作岗位',
    `age` INT NOT NULL DEFAULT 0 COMMENT '年龄',
    `birth_day` DATETIME DEFAULT NULL COMMENT '出生日期',
    PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

/*
创建一个数据表
工号 不能为空,自增长,数字类型
姓名 不能为空,没输入就是佚名,字符串类型
工作岗位 不能为空,没输入就是待岗,字符串类型
年龄 不能为空,不输入就是0,数字类型
出生日期 可以空,时间类型
工号作为主键
开启中文识别
*/