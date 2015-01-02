CREATE TABLE IF NOT EXISTS `new_word` (
  `id` char(32) NOT NULL,
  `wordId` varchar(55) NOT NULL,
  `classId` varchar(32) NOT NULL
);
----
CREATE TABLE IF NOT EXISTS `option` (
  `id` char(32) NOT NULL,
  `category` char(32) NOT NULL,
  `key` varchar(128) NOT NULL,
  `value` varchar(1024) NOT NULL 
);
----
CREATE TABLE IF NOT EXISTS `class` (
  `id` char(32) NOT NULL,
  `name` varchar(128) NOT NULL,
  `size` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `times` int(11) NOT NULL,
  `selected` int(11) NOT NULL,
  `learned` int(11) NOT NULL,
  `finished` int(11) NOT NULL
);
----
INSERT INTO `class` VALUES ('12','六级必备词汇',2087,1,0,0,0,0);
----
INSERT INTO class VALUES ('11','四级必备词汇',4509,1,0,0,0,0);
----
INSERT INTO class VALUES ('140','高考大纲词汇',3874,1,0,0,0,0);
----
INSERT INTO class VALUES ('141','高考常用短语词汇',362,1,0,0,0,0);
----
INSERT INTO class VALUES ('13','考研必备词汇',5475,1,0,0,0,0);
----
INSERT INTO class VALUES ('14','TOEFL必备词汇',4883,1,0,0,0,0);
----
INSERT INTO class VALUES ('16','GRE考试必备词汇',7496,1,0,0,0,0);
----
INSERT INTO class VALUES ('15','雅思必备词汇',4541,1,0,0,0,0);
----
CREATE TABLE IF NOT EXISTS `learn_plan` (
  `id` char(32) NOT NULL,
  `num` int NOT NULL,
  `classId` char(32) NOT NULL,
  `wordIds` varchar(3300) NOT NULL,
  `date` char(8) NOT NULL,
  `done` char(8)
);
----
CREATE TABLE IF NOT EXISTS `review_plan` (
  `id` char(32) NOT NULL,
  `num` int NOT NULL,
  `roundNum` int NOT NULL,
  `roundId` char(32) NOT NULL,
  `classId` char(32) NOT NULL,
  `wordIds` varchar(3300) NOT NULL,
  `date` char(8) NOT NULL,
  `done` char(8)
);
