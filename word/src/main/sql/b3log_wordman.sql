-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 10 日 10:25
-- 服务器版本: 5.5.16
-- PHP 版本: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `b3log_wordman`
--

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `id` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL COMMENT '单词数'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='词库表';

-- --------------------------------------------------------

--
-- 表的结构 `classwords`
--

CREATE TABLE IF NOT EXISTS `classwords` (
  `id` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `wordId` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `classId` char(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='词库单词关联表';

-- --------------------------------------------------------

--
-- 表的结构 `word`
--

CREATE TABLE IF NOT EXISTS `word` (
  `id` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `word` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `phon` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '音标',
  `pron` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '语音路径',
  `para` varchar(512) COLLATE utf8_unicode_ci NOT NULL COMMENT '释义',
  `build` varchar(512) COLLATE utf8_unicode_ci NOT NULL COMMENT '构词法',
  `example` varchar(1024) COLLATE utf8_unicode_ci NOT NULL COMMENT 'JSON 格式例句'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='单词表';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
