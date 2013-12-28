-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 18, 2013 at 12:46 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `map`
--
CREATE DATABASE IF NOT EXISTS `map` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `map`;

-- --------------------------------------------------------

--
-- Table structure for table `base`
--

CREATE TABLE IF NOT EXISTS `base` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `sizeX` int(11) DEFAULT NULL,
  `sizeY` int(11) DEFAULT NULL,
  `currentTurn` varchar(100) NOT NULL COMMENT 'The player that is currently doing his turn',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `base`
--

INSERT INTO `base` (`index`, `sizeX`, `sizeY`, `currentTurn`) VALUES
(1, 25, 25, 'Firefox');

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE IF NOT EXISTS `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posX` int(11) DEFAULT NULL,
  `posY` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `owner` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `oil` int(11) NOT NULL,
  `crystal` int(11) NOT NULL,
  `metal` int(11) NOT NULL,
  `food` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`ID`, `Name`, `oil`, `crystal`, `metal`, `food`) VALUES
(1, 'Firefox', 2000, 200, 2000, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `tile`
--

CREATE TABLE IF NOT EXISTS `tile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posX` int(11) DEFAULT NULL,
  `posY` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=627 ;

--
-- Dumping data for table `tile`
--

INSERT INTO `tile` (`id`, `posX`, `posY`, `type`) VALUES
(1, 0, 0, 2),
(2, 1, 0, 1),
(3, 2, 0, 3),
(4, 3, 0, 1),
(5, 4, 0, 1),
(6, 5, 0, 2),
(7, 6, 0, 1),
(8, 7, 0, 1),
(9, 8, 0, 1),
(10, 9, 0, 1),
(11, 10, 0, 1),
(12, 11, 0, 1),
(13, 12, 0, 2),
(14, 13, 0, 1),
(15, 14, 0, 1),
(16, 15, 0, 1),
(17, 16, 0, 1),
(18, 17, 0, 1),
(19, 18, 0, 1),
(20, 19, 0, 1),
(21, 20, 0, 1),
(22, 21, 0, 1),
(23, 22, 0, 1),
(24, 23, 0, 1),
(25, 24, 0, 1),
(26, 0, 1, 1),
(27, 1, 1, 1),
(28, 2, 1, 1),
(29, 3, 1, 2),
(30, 4, 1, 1),
(31, 5, 1, 1),
(32, 6, 1, 1),
(33, 7, 1, 1),
(34, 8, 1, 1),
(35, 9, 1, 1),
(36, 10, 1, 1),
(37, 11, 1, 1),
(38, 12, 1, 1),
(39, 13, 1, 1),
(40, 14, 1, 1),
(41, 15, 1, 1),
(42, 16, 1, 1),
(43, 17, 1, 1),
(44, 18, 1, 1),
(45, 19, 1, 1),
(46, 20, 1, 1),
(47, 21, 1, 1),
(48, 22, 1, 1),
(49, 23, 1, 1),
(50, 24, 1, 1),
(51, 0, 2, 1),
(52, 1, 2, 1),
(53, 2, 2, 2),
(54, 3, 2, 1),
(55, 4, 2, 1),
(56, 5, 2, 1),
(57, 6, 2, 1),
(58, 7, 2, 1),
(59, 8, 2, 1),
(60, 9, 2, 1),
(61, 10, 2, 1),
(62, 11, 2, 1),
(63, 12, 2, 2),
(64, 13, 2, 2),
(65, 14, 2, 3),
(66, 15, 2, 1),
(67, 16, 2, 1),
(68, 17, 2, 1),
(69, 18, 2, 1),
(70, 19, 2, 1),
(71, 20, 2, 1),
(72, 21, 2, 1),
(73, 22, 2, 1),
(74, 23, 2, 1),
(75, 24, 2, 1),
(76, 0, 3, 1),
(77, 1, 3, 1),
(78, 2, 3, 1),
(79, 3, 3, 1),
(80, 4, 3, 1),
(81, 5, 3, 1),
(82, 6, 3, 1),
(83, 7, 3, 1),
(84, 8, 3, 1),
(85, 9, 3, 1),
(86, 10, 3, 1),
(87, 11, 3, 1),
(88, 12, 3, 1),
(89, 13, 3, 1),
(90, 14, 3, 1),
(91, 15, 3, 1),
(92, 16, 3, 1),
(93, 17, 3, 2),
(94, 18, 3, 1),
(95, 19, 3, 1),
(96, 20, 3, 1),
(97, 21, 3, 2),
(98, 22, 3, 1),
(99, 23, 3, 1),
(100, 24, 3, 1),
(101, 0, 4, 1),
(102, 1, 4, 1),
(103, 2, 4, 1),
(104, 3, 4, 1),
(105, 4, 4, 2),
(106, 5, 4, 1),
(107, 6, 4, 1),
(108, 7, 4, 1),
(109, 8, 4, 1),
(110, 9, 4, 1),
(111, 10, 4, 1),
(112, 11, 4, 1),
(113, 12, 4, 1),
(114, 13, 4, 1),
(115, 14, 4, 1),
(116, 15, 4, 1),
(117, 16, 4, 1),
(118, 17, 4, 1),
(119, 18, 4, 1),
(120, 19, 4, 1),
(121, 20, 4, 1),
(122, 21, 4, 2),
(123, 22, 4, 1),
(124, 23, 4, 1),
(125, 24, 4, 1),
(126, 0, 5, 1),
(127, 1, 5, 1),
(128, 2, 5, 1),
(129, 3, 5, 1),
(130, 4, 5, 1),
(131, 5, 5, 1),
(132, 6, 5, 1),
(133, 7, 5, 1),
(134, 8, 5, 1),
(135, 9, 5, 1),
(136, 10, 5, 2),
(137, 11, 5, 1),
(138, 12, 5, 1),
(139, 13, 5, 1),
(140, 14, 5, 1),
(141, 15, 5, 1),
(142, 16, 5, 1),
(143, 17, 5, 1),
(144, 18, 5, 1),
(145, 19, 5, 1),
(146, 20, 5, 1),
(147, 21, 5, 1),
(148, 22, 5, 1),
(149, 23, 5, 3),
(150, 24, 5, 1),
(151, 0, 6, 1),
(152, 1, 6, 1),
(153, 2, 6, 1),
(154, 3, 6, 1),
(155, 4, 6, 1),
(156, 5, 6, 1),
(157, 6, 6, 1),
(158, 7, 6, 1),
(159, 8, 6, 1),
(160, 9, 6, 1),
(161, 10, 6, 1),
(162, 11, 6, 1),
(163, 12, 6, 2),
(164, 13, 6, 1),
(165, 14, 6, 1),
(166, 15, 6, 1),
(167, 16, 6, 3),
(168, 17, 6, 1),
(169, 18, 6, 1),
(170, 19, 6, 1),
(171, 20, 6, 1),
(172, 21, 6, 1),
(173, 22, 6, 1),
(174, 23, 6, 2),
(175, 24, 6, 1),
(176, 0, 7, 3),
(177, 1, 7, 1),
(178, 2, 7, 1),
(179, 3, 7, 1),
(180, 4, 7, 1),
(181, 5, 7, 1),
(182, 6, 7, 1),
(183, 7, 7, 2),
(184, 8, 7, 1),
(185, 9, 7, 1),
(186, 10, 7, 1),
(187, 11, 7, 1),
(188, 12, 7, 1),
(189, 13, 7, 1),
(190, 14, 7, 1),
(191, 15, 7, 3),
(192, 16, 7, 1),
(193, 17, 7, 1),
(194, 18, 7, 1),
(195, 19, 7, 1),
(196, 20, 7, 1),
(197, 21, 7, 1),
(198, 22, 7, 3),
(199, 23, 7, 1),
(200, 24, 7, 1),
(201, 0, 8, 1),
(202, 1, 8, 1),
(203, 2, 8, 1),
(204, 3, 8, 1),
(205, 4, 8, 1),
(206, 5, 8, 1),
(207, 6, 8, 1),
(208, 7, 8, 1),
(209, 8, 8, 1),
(210, 9, 8, 1),
(211, 10, 8, 1),
(212, 11, 8, 1),
(213, 12, 8, 1),
(214, 13, 8, 1),
(215, 14, 8, 1),
(216, 15, 8, 1),
(217, 16, 8, 1),
(218, 17, 8, 1),
(219, 18, 8, 3),
(220, 19, 8, 1),
(221, 20, 8, 1),
(222, 21, 8, 1),
(223, 22, 8, 1),
(224, 23, 8, 1),
(225, 24, 8, 1),
(226, 0, 9, 3),
(227, 1, 9, 1),
(228, 2, 9, 1),
(229, 3, 9, 1),
(230, 4, 9, 1),
(231, 5, 9, 1),
(232, 6, 9, 1),
(233, 7, 9, 1),
(234, 8, 9, 3),
(235, 9, 9, 1),
(236, 10, 9, 1),
(237, 11, 9, 1),
(238, 12, 9, 1),
(239, 13, 9, 1),
(240, 14, 9, 1),
(241, 15, 9, 1),
(242, 16, 9, 1),
(243, 17, 9, 1),
(244, 18, 9, 1),
(245, 19, 9, 1),
(246, 20, 9, 1),
(247, 21, 9, 1),
(248, 22, 9, 1),
(249, 23, 9, 1),
(250, 24, 9, 1),
(251, 0, 10, 1),
(252, 1, 10, 1),
(253, 2, 10, 1),
(254, 3, 10, 1),
(255, 4, 10, 1),
(256, 5, 10, 1),
(257, 6, 10, 1),
(258, 7, 10, 1),
(259, 8, 10, 3),
(260, 9, 10, 1),
(261, 10, 10, 1),
(262, 11, 10, 1),
(263, 12, 10, 1),
(264, 13, 10, 1),
(265, 14, 10, 1),
(266, 15, 10, 1),
(267, 16, 10, 1),
(268, 17, 10, 1),
(269, 18, 10, 1),
(270, 19, 10, 1),
(271, 20, 10, 1),
(272, 21, 10, 1),
(273, 22, 10, 1),
(274, 23, 10, 1),
(275, 24, 10, 1),
(276, 0, 11, 1),
(277, 1, 11, 1),
(278, 2, 11, 1),
(279, 3, 11, 1),
(280, 4, 11, 1),
(281, 5, 11, 1),
(282, 6, 11, 1),
(283, 7, 11, 1),
(284, 8, 11, 2),
(285, 9, 11, 3),
(286, 10, 11, 1),
(287, 11, 11, 1),
(288, 12, 11, 1),
(289, 13, 11, 1),
(290, 14, 11, 1),
(291, 15, 11, 1),
(292, 16, 11, 1),
(293, 17, 11, 1),
(294, 18, 11, 1),
(295, 19, 11, 1),
(296, 20, 11, 1),
(297, 21, 11, 1),
(298, 22, 11, 1),
(299, 23, 11, 2),
(300, 24, 11, 1),
(301, 0, 12, 1),
(302, 1, 12, 1),
(303, 2, 12, 1),
(304, 3, 12, 1),
(305, 4, 12, 1),
(306, 5, 12, 1),
(307, 6, 12, 1),
(308, 7, 12, 1),
(309, 8, 12, 1),
(310, 9, 12, 1),
(311, 10, 12, 1),
(312, 11, 12, 1),
(313, 12, 12, 1),
(314, 13, 12, 1),
(315, 14, 12, 1),
(316, 15, 12, 1),
(317, 16, 12, 1),
(318, 17, 12, 1),
(319, 18, 12, 1),
(320, 19, 12, 1),
(321, 20, 12, 3),
(322, 21, 12, 1),
(323, 22, 12, 1),
(324, 23, 12, 1),
(325, 24, 12, 2),
(326, 0, 13, 1),
(327, 1, 13, 1),
(328, 2, 13, 1),
(329, 3, 13, 1),
(330, 4, 13, 1),
(331, 5, 13, 1),
(332, 6, 13, 1),
(333, 7, 13, 1),
(334, 8, 13, 1),
(335, 9, 13, 3),
(336, 10, 13, 1),
(337, 11, 13, 1),
(338, 12, 13, 1),
(339, 13, 13, 1),
(340, 14, 13, 1),
(341, 15, 13, 1),
(342, 16, 13, 1),
(343, 17, 13, 1),
(344, 18, 13, 1),
(345, 19, 13, 1),
(346, 20, 13, 1),
(347, 21, 13, 1),
(348, 22, 13, 1),
(349, 23, 13, 1),
(350, 24, 13, 1),
(351, 0, 14, 1),
(352, 1, 14, 1),
(353, 2, 14, 1),
(354, 3, 14, 1),
(355, 4, 14, 1),
(356, 5, 14, 1),
(357, 6, 14, 1),
(358, 7, 14, 1),
(359, 8, 14, 1),
(360, 9, 14, 1),
(361, 10, 14, 1),
(362, 11, 14, 2),
(363, 12, 14, 1),
(364, 13, 14, 1),
(365, 14, 14, 1),
(366, 15, 14, 2),
(367, 16, 14, 2),
(368, 17, 14, 1),
(369, 18, 14, 1),
(370, 19, 14, 1),
(371, 20, 14, 3),
(372, 21, 14, 1),
(373, 22, 14, 1),
(374, 23, 14, 1),
(375, 24, 14, 1),
(376, 0, 15, 1),
(377, 1, 15, 1),
(378, 2, 15, 1),
(379, 3, 15, 1),
(380, 4, 15, 1),
(381, 5, 15, 3),
(382, 6, 15, 1),
(383, 7, 15, 1),
(384, 8, 15, 1),
(385, 9, 15, 1),
(386, 10, 15, 1),
(387, 11, 15, 1),
(388, 12, 15, 1),
(389, 13, 15, 1),
(390, 14, 15, 1),
(391, 15, 15, 1),
(392, 16, 15, 1),
(393, 17, 15, 1),
(394, 18, 15, 1),
(395, 19, 15, 1),
(396, 20, 15, 1),
(397, 21, 15, 1),
(398, 22, 15, 1),
(399, 23, 15, 1),
(400, 24, 15, 1),
(401, 0, 16, 1),
(402, 1, 16, 1),
(403, 2, 16, 2),
(404, 3, 16, 1),
(405, 4, 16, 1),
(406, 5, 16, 1),
(407, 6, 16, 1),
(408, 7, 16, 1),
(409, 8, 16, 1),
(410, 9, 16, 1),
(411, 10, 16, 3),
(412, 11, 16, 2),
(413, 12, 16, 1),
(414, 13, 16, 1),
(415, 14, 16, 1),
(416, 15, 16, 1),
(417, 16, 16, 1),
(418, 17, 16, 1),
(419, 18, 16, 1),
(420, 19, 16, 3),
(421, 20, 16, 2),
(422, 21, 16, 1),
(423, 22, 16, 1),
(424, 23, 16, 1),
(425, 24, 16, 1),
(426, 0, 17, 1),
(427, 1, 17, 1),
(428, 2, 17, 1),
(429, 3, 17, 1),
(430, 4, 17, 1),
(431, 5, 17, 1),
(432, 6, 17, 1),
(433, 7, 17, 1),
(434, 8, 17, 1),
(435, 9, 17, 1),
(436, 10, 17, 1),
(437, 11, 17, 3),
(438, 12, 17, 1),
(439, 13, 17, 1),
(440, 14, 17, 1),
(441, 15, 17, 1),
(442, 16, 17, 1),
(443, 17, 17, 1),
(444, 18, 17, 1),
(445, 19, 17, 1),
(446, 20, 17, 1),
(447, 21, 17, 1),
(448, 22, 17, 1),
(449, 23, 17, 2),
(450, 24, 17, 1),
(451, 0, 18, 3),
(452, 1, 18, 1),
(453, 2, 18, 1),
(454, 3, 18, 2),
(455, 4, 18, 1),
(456, 5, 18, 1),
(457, 6, 18, 1),
(458, 7, 18, 1),
(459, 8, 18, 1),
(460, 9, 18, 1),
(461, 10, 18, 1),
(462, 11, 18, 1),
(463, 12, 18, 1),
(464, 13, 18, 1),
(465, 14, 18, 3),
(466, 15, 18, 1),
(467, 16, 18, 1),
(468, 17, 18, 1),
(469, 18, 18, 1),
(470, 19, 18, 1),
(471, 20, 18, 1),
(472, 21, 18, 2),
(473, 22, 18, 1),
(474, 23, 18, 1),
(475, 24, 18, 1),
(476, 0, 19, 1),
(477, 1, 19, 1),
(478, 2, 19, 1),
(479, 3, 19, 1),
(480, 4, 19, 3),
(481, 5, 19, 1),
(482, 6, 19, 1),
(483, 7, 19, 2),
(484, 8, 19, 1),
(485, 9, 19, 2),
(486, 10, 19, 1),
(487, 11, 19, 1),
(488, 12, 19, 1),
(489, 13, 19, 1),
(490, 14, 19, 1),
(491, 15, 19, 1),
(492, 16, 19, 1),
(493, 17, 19, 1),
(494, 18, 19, 3),
(495, 19, 19, 1),
(496, 20, 19, 1),
(497, 21, 19, 1),
(498, 22, 19, 1),
(499, 23, 19, 1),
(500, 24, 19, 1),
(501, 0, 20, 1),
(502, 1, 20, 1),
(503, 2, 20, 1),
(504, 3, 20, 1),
(505, 4, 20, 3),
(506, 5, 20, 1),
(507, 6, 20, 1),
(508, 7, 20, 1),
(509, 8, 20, 1),
(510, 9, 20, 1),
(511, 10, 20, 2),
(512, 11, 20, 1),
(513, 12, 20, 1),
(514, 13, 20, 1),
(515, 14, 20, 1),
(516, 15, 20, 1),
(517, 16, 20, 1),
(518, 17, 20, 3),
(519, 18, 20, 1),
(520, 19, 20, 1),
(521, 20, 20, 1),
(522, 21, 20, 1),
(523, 22, 20, 1),
(524, 23, 20, 1),
(525, 24, 20, 1),
(526, 0, 21, 3),
(527, 1, 21, 1),
(528, 2, 21, 1),
(529, 3, 21, 1),
(530, 4, 21, 1),
(531, 5, 21, 1),
(532, 6, 21, 1),
(533, 7, 21, 1),
(534, 8, 21, 1),
(535, 9, 21, 1),
(536, 10, 21, 1),
(537, 11, 21, 1),
(538, 12, 21, 1),
(539, 13, 21, 3),
(540, 14, 21, 1),
(541, 15, 21, 1),
(542, 16, 21, 1),
(543, 17, 21, 3),
(544, 18, 21, 1),
(545, 19, 21, 1),
(546, 20, 21, 1),
(547, 21, 21, 1),
(548, 22, 21, 1),
(549, 23, 21, 1),
(550, 24, 21, 1),
(551, 0, 22, 2),
(552, 1, 22, 1),
(553, 2, 22, 1),
(554, 3, 22, 1),
(555, 4, 22, 1),
(556, 5, 22, 1),
(557, 6, 22, 1),
(558, 7, 22, 1),
(559, 8, 22, 1),
(560, 9, 22, 1),
(561, 10, 22, 1),
(562, 11, 22, 1),
(563, 12, 22, 1),
(564, 13, 22, 1),
(565, 14, 22, 1),
(566, 15, 22, 1),
(567, 16, 22, 1),
(568, 17, 22, 1),
(569, 18, 22, 1),
(570, 19, 22, 1),
(571, 20, 22, 3),
(572, 21, 22, 1),
(573, 22, 22, 1),
(574, 23, 22, 1),
(575, 24, 22, 1),
(576, 0, 23, 1),
(577, 1, 23, 1),
(578, 2, 23, 1),
(579, 3, 23, 1),
(580, 4, 23, 1),
(581, 5, 23, 1),
(582, 6, 23, 1),
(583, 7, 23, 1),
(584, 8, 23, 1),
(585, 9, 23, 1),
(586, 10, 23, 3),
(587, 11, 23, 2),
(588, 12, 23, 1),
(589, 13, 23, 1),
(590, 14, 23, 1),
(591, 15, 23, 1),
(592, 16, 23, 1),
(593, 17, 23, 1),
(594, 18, 23, 1),
(595, 19, 23, 1),
(596, 20, 23, 3),
(597, 21, 23, 1),
(598, 22, 23, 1),
(599, 23, 23, 3),
(600, 24, 23, 1),
(601, 0, 24, 1),
(602, 1, 24, 1),
(603, 2, 24, 1),
(604, 3, 24, 1),
(605, 4, 24, 1),
(606, 5, 24, 3),
(607, 6, 24, 1),
(608, 7, 24, 1),
(609, 8, 24, 1),
(610, 9, 24, 1),
(611, 10, 24, 1),
(612, 11, 24, 1),
(613, 12, 24, 1),
(614, 13, 24, 1),
(615, 14, 24, 1),
(616, 15, 24, 1),
(617, 16, 24, 1),
(618, 17, 24, 1),
(619, 18, 24, 1),
(620, 19, 24, 1),
(621, 20, 24, 3),
(622, 21, 24, 1),
(623, 22, 24, 1),
(624, 23, 24, 1),
(625, 24, 24, 1),
(626, 24, 24, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;