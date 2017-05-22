-- phpMyAdmin SQL Dump
-- version 4.6.5.2deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2017 at 09:23 PM
-- Server version: 5.6.30-1
-- PHP Version: 7.0.16-3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo-list`
--

-- --------------------------------------------------------

--
-- Table structure for table `niveaux_importance`
--

CREATE TABLE `niveaux_importance` (
  `id` int(10) UNSIGNED NOT NULL,
  `importance` varchar(100) NOT NULL,
  `weight` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `niveaux_importance`
--

INSERT INTO `niveaux_importance` (`id`, `importance`, `weight`) VALUES
(1, 'important', 100),
(2, 'peu important', 50),
(6, 'Optionnel', -15);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(5) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `niveaux_importance_id` int(100) UNSIGNED NOT NULL,
  `details` text,
  `done` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `date`, `niveaux_importance_id`, `details`, `done`) VALUES
(1, 'tache1', '2017-05-30 22:00:00', 2, 'test', 1),
(2, 'Tache2', '2017-05-21 22:00:00', 1, 'test tache 2 test update', 0),
(18, 'tache 4', '2017-05-17 00:47:04', 1, 'beep boop', 0),
(20, 'Tache test', '2017-05-17 13:50:15', 2, 'fefz', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `niveaux_importance`
--
ALTER TABLE `niveaux_importance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `importance_id` (`niveaux_importance_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `niveaux_importance`
--
ALTER TABLE `niveaux_importance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`niveaux_importance_id`) REFERENCES `niveaux_importance` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
