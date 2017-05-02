DROP DATABASE IF EXISTS fund_me;
CREATE DATABASE fund_me;
USE fund_me;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `Project_update`;
DROP TABLE IF EXISTS `User_project`;
DROP TABLE IF EXISTS `Comment_project`;
DROP TABLE IF EXISTS `Fellow_user`;
DROP TABLE IF EXISTS `Project`;
DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `Users`;

-- Entity

-- status can be `funding`, `failed`, `working`,  `completed`   
CREATE TABLE `Users`(
    uname VARCHAR(40) NOT NULL,
    address VARCHAR(40),
    credict_card VARCHAR(40),
    picture VARCHAR(500),
    PRIMARY KEY(uname)
);

CREATE TABLE `Account`(
    uname VARCHAR(40) NOT NULL,
    password VARCHAR(512),
    PRIMARY KEY(uname)
--    FOREIGN KEY (`uname`) REFERENCES `Users` (`uname`)
);

-- TODO: create trigger end_time => (funding -> failed| working).
-- TODO: trigger enforce min_fund < max_fund and start_time < end_time
CREATE TABLE `Project`(
    pname VARCHAR(40) NOT NULL,
    uname VARCHAR(40) NOT NULL,
    description VARCHAR(200) NOT NULL,
    category VARCHAR(20) NOT NULL,
    min_fund DOUBLE NOT NULL,
    max_fund DOUBLE NOT NULL,
    current_fund DOUBLE NOT NULL,
    start_time DATETIME NOT NULL, 
    end_time DATETIME NOT NULL, 
    status VARCHAR(20) NOT NULL,
    picture VARCHAR(500) NOT NULL,
    FOREIGN KEY (`uname`) REFERENCES `Users` (`uname`),
    PRIMARY KEY(pname)
);

-- TODO: trigger, only when project is in 'funding' status
CREATE TABLE `Pledge`(
    uname VARCHAR(40) NOT NULL,
    pname VARCHAR(40) NOT NULL,
    time DATETIME NOT NULL, 
    amount DOUBLE NOT NULL,
    PRIMARY KEY(uname, pname, time),
    FOREIGN KEY (`pname`) REFERENCES `Project` (`pname`),
    FOREIGN KEY (`uname`) REFERENCES `Users` (`uname`)
);

-- TODO: trigger, rate should be a value between 0-5
CREATE TABLE `Rate`(
    uname VARCHAR(40) NOT NULL,
    pname VARCHAR(40) NOT NULL,
    time DATETIME NOT NULL, 
    rate INT NOT NULL,
    PRIMARY KEY(uname, pname),
    FOREIGN KEY (`pname`) REFERENCES `Pledge` (`pname`),
    FOREIGN KEY (`uname`) REFERENCES `Pledge` (`uname`)
);

CREATE TABLE `Comment_project`(
    uname VARCHAR(40) NOT NULL,
    pname VARCHAR(40) NOT NULL,
    time DATETIME NOT NULL, 
    comment VARCHAR(200) NOT NULL,
    PRIMARY KEY(uname, pname, time),
    FOREIGN KEY (`pname`) REFERENCES `Project` (`pname`),
    FOREIGN KEY (`uname`) REFERENCES `Users` (`uname`)
);

-- TODO: trigger : auto drop when project not exist
CREATE TABLE `Tag`(
    pname VARCHAR(40) NOT NULL,
    tag VARCHAR(40) NOT NULL,
    PRIMARY KEY(pname, tag),
    FOREIGN KEY (`pname`) REFERENCES `Project` (`pname`)
);

-- type can be `text`, `video`, `picture`. content is a url link when type is `video` or `picture`
CREATE TABLE `Project_update`(
    pname VARCHAR(40) NOT NULL,
    time DATETIME NOT NULL, 
    type VARCHAR(40) NOT NULL,
    content VARCHAR(500) NOT NULL,
    PRIMARY KEY(pname, time),
    FOREIGN KEY (`pname`) REFERENCES `Project` (`pname`)
);

-- Project User Relation 
-- relation can be `fellow`, `like`
CREATE TABLE `User_project`(
    uname VARCHAR(40) NOT NULL,
    pname VARCHAR(40) NOT NULL,
    time DATETIME NOT NULL, 
    relation VARCHAR(20) NOT NULL,
    PRIMARY KEY(uname, pname, relation),
    FOREIGN KEY (`pname`) REFERENCES `Project` (`pname`),
    FOREIGN KEY (`uname`) REFERENCES `Users` (`uname`)
);

-- User User Relation
CREATE TABLE `Fellow_user`(
    fellowed_uname VARCHAR(40) NOT NULL,
    fellower_uname VARCHAR(40) NOT NULL,
    PRIMARY KEY(fellowed_uname, fellower_uname),
    FOREIGN KEY (`fellowed_uname`) REFERENCES `Users` (`uname`),
    FOREIGN KEY (`fellower_uname`) REFERENCES `Users` (`uname`)
);

