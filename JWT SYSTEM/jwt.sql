-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2025 at 08:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eticaret`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `passwd` varchar(255) NOT NULL,
  `approved` tinyint(1) DEFAULT 0,
  `approved_code` varchar(6) DEFAULT NULL,
  `VIP` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `phone`, `email`, `name`, `surname`, `passwd`, `approved`, `approved_code`, `VIP`, `created_at`, `updated_at`) VALUES
(1, 'SEMIHSAYGIN', '5538828009', 'semihsaygin3021@outlook.com', 'SEMİH', 'SAYGIN', '$2b$10$Nc7t9Fge6zTlfO0MT/6CReVmrL2O3SYLFP3k5oWvkvsOx4BiFvszy', 1, 'HFTJSm', 0, '2024-08-22 00:00:42', '2025-05-31 18:34:39'),
(3, 'TESTUSER', '5538828000', 'semihsaygin3020@outlook.com', 'TEST', 'TEST', '$2b$10$Nc7t9Fge6zTlfO0MT/6CReVmrL2O3SYLFP3k5oWvkvsOx4BiFvszy', 1, 'HFTJSm', 1, '2024-08-22 00:00:42', '2024-08-22 02:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `userscode`
--

CREATE TABLE `userscode` (
  `code_id` int(11) NOT NULL,
  `cpcode` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userscode`
--

INSERT INTO `userscode` (`code_id`, `cpcode`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'hnMbmI', 1, '2024-08-22 02:18:52', '2024-08-22 02:18:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `userscode`
--
ALTER TABLE `userscode`
  ADD PRIMARY KEY (`code_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userscode`
--
ALTER TABLE `userscode`
  MODIFY `code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userscode`
--
ALTER TABLE `userscode`
  ADD CONSTRAINT `userscode_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
