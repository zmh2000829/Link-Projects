-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-02-04 04:49:51
-- 服务器版本： 10.1.36-MariaDB
-- PHP 版本： 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `luckdraw`
--

-- --------------------------------------------------------

--
-- 表的结构 `gift`
--

CREATE TABLE `gift` (
  `type` varchar(50) NOT NULL,
  `number` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `gift`
--

INSERT INTO `gift` (`type`, `number`, `id`) VALUES
('notebook', 0, 1),
('calendar', 2, 2);

-- --------------------------------------------------------

--
-- 表的结构 `winner`
--

CREATE TABLE `winner` (
  `name` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `studentID` varchar(50) NOT NULL,
  `giftType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `winner`
--

INSERT INTO `winner` (`name`, `phoneNumber`, `studentID`, `giftType`) VALUES
('0', '111111111', '122222222', 1),
('而为人', '214134', '123', 2),
('往往', '123', '12312', 2),
('0', '1888888888', '1888888888', 1),
('3424', '234234', '2234', 2);

--
-- 转储表的索引
--

--
-- 表的索引 `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `winner`
--
ALTER TABLE `winner`
  ADD PRIMARY KEY (`studentID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `gift`
--
ALTER TABLE `gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
