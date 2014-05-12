CREATE TABLE IF NOT EXISTS `option` (
  `id` char(32) NOT NULL,
  `key` varchar(128) NOT NULL,
  `value` varchar(1024) NOT NULL 
);
----
CREATE TABLE IF NOT EXISTS `class` (
  `id` char(32) NOT NULL,
  `name` varchar(128) NOT NULL,
  `size` int(11) NOT NULL,
  `learned` int(11) NOT NULL,
  `compeleted` int(11) NOT NULL
);
----
CREATE TABLE IF NOT EXISTS `classwords` (
  `id` char(32) NOT NULL,
  `wordId` char(32) NOT NULL,
  `classId` char(32) NOT NULL
);
----
CREATE TABLE IF NOT EXISTS `word` (
  `id` char(32) NOT NULL,
  `word` varchar(55) NOT NULL,
  `phon` varchar(255) NOT NULL,
  `pron` varchar(255) NOT NULL,
  `para` varchar(512) NOT NULL,
  `build` varchar(512) NOT NULL,
  `example` varchar(1024) NOT NULL
);

