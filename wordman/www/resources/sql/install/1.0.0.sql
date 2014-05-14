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
  `times` int(11) NOT NULL,
  `selected` int(11) NOT NULL,
  `learned` int(11) NOT NULL,
  `finished` int(11) NOT NULL
);
----
CREATE TABLE IF NOT EXISTS `classwords` (
  `id` char(32) NOT NULL,
  `wordId` char(32) NOT NULL,
  `classId` char(32) NOT NULL
);
----
CREATE TABLE IF NOT EXISTS `plan` (
  `id` char(32) NOT NULL,
  `classId` char(32) NOT NULL,
  `wordId` char(32) NOT NULL,
  `date` char(8) NOT NULL,
  `done` char(8) NOT NULL,
  `type` int(1) NOT NULL
);
