#1.创建表的时候给添加约束

--工作人员数据表
CREATE TABLE IF NOT EXISTS `coder`(
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '工号',
    `name` VARCHAR NOT NULL DEFAULT '佚名' COMMENT '姓名',
    `workName` VARCHAR NOT NULL DEFAULT '待岗' COMMENT '工作岗位',
    PRIMARY KEY(`id`)
    KEY `coder_workid`(`workName`) --定义外键
    CONSTRAINT `coder_workid` FOREIGN KEY (`workName`) REFERENCES `work`(`workid`)   --添加约束关系coder_workid和外表work里面的workid字段关联
)ENGINE=INNODB DEFAULT CHARSET=utf8
--工作类型表
CREATE TABLE `work`(
    `workid` INT(10) NOT NULL COMMENT '工作岗位id',
    `workName` VARCHAR(20) NOT NULL COMMENT '工作岗位名称',
    PRIMARY KEY(`workid`)
)ENGINE=INNODB DEFAULT CHARSET=utf8




#2.创建表之后,再添加约束


CREATE TABLE IF NOT EXISTS `coder`(
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '工号',
    `name` VARCHAR NOT NULL DEFAULT '佚名' COMMENT '姓名',
    `workName` VARCHAR NOT NULL DEFAULT '待岗',
    PRIMARY KEY(`id`)
    KEY `coder_workid`
)ENGINE=INNODB DEFAULT CHARSET=utf8

ALTER TABLE `coder`
ADD CONSTRAINT `coder_workid` FOREIGN KEY(`workName`) REFERENCES `work`(`workid`)

CREATE TABLE `work`(
    `workid` INT(10) NOT NULL COMMENT '工作岗位id',
    `workName` VARCHAR(20) NOT NULL COMMENT '工作岗位名称',
    PRIMARY KEY (`workid`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

