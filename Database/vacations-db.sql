-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 05:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations-db`
--
CREATE DATABASE IF NOT EXISTS `vacations-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations-db`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Many to many - users to vacations.';

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  `isAdmin` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Users or Admins of the website.';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `isAdmin`) VALUES
(1, 'Silvia', 'Imperva', 'impervia@gmail.com', '11ab08fc77516e1c9e61fe8a66a0d87fd9e1bd84dbe680acd89d23297e8cbf00c45df21a901ae1f1674a78dca32627aaf8cc2597c1ca22a942e92e6928c3205d', 0),
(2, 'John', 'Bryce', 'jb@gmail.com', '2c14b168ed74dea4f7d73a3b9abb03240c8897965b77f2fce96073894d91a6fa0b5f4e044d40fa223c1641a6feb0ac5b99e19aecd89776042c629e64421d742f', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vacations the website offers.';

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(16, 'Santorini, Greece', 'Indulge in an unforgettable Mediterranean getaway on the picturesque island of Santorini. Wander through charming white-washed villages adorned with iconic blue-domed roofs,all while enjoying breathtaking sunsets over the Aegean Sea. With pristine beaches, ancient ruins, and delectable local cuisine, Santorini promises an idyllic escape for romance and relaxation.', '2023-09-15', '2023-09-22', 1500, '6e604b07-1274-4167-a2a2-9d28e0e3c35d.jpg'),
(17, 'Oslo, Norway', 'Embark on a journey of Scandinavian elegance in Oslo, Norway\'s vibrant capital. Discover a city where modernity seamlessly merges with its rich historical roots. Explore the fascinating Viking Ship Museum, stroll through lush green parks, and be captivated by the beauty of Oslo\'s fjords. Savor the delights of Nordic cuisine and witness a burgeoning arts scene. Oslo invites culture and nature enthusiasts to revel in its unique charm.', '2023-10-10', '2023-10-17', 1200, 'ff3609e0-2af7-4629-90a6-796f0df23619.jpg'),
(18, 'London, United Kingdom', 'Dive into the heart of London, a city teeming with history, culture, and iconic landmarks. Visit Buckingham Palace, explore the British Museum, and take a ride on the iconic London Eye. Delight in West End theater shows, indulge in world-class shopping, and savor the diverse culinary scene. London promises a dynamic blend of tradition and innovation.', '2023-11-05', '2023-11-12', 1800, 'ed8caf31-b224-4c26-a6a6-6636ddcbb592.jpg'),
(20, 'Toronto, Canada', 'Experience the energetic vibes of Toronto, Canada\'s largest metropolis. Discover the awe-inspiring CN Tower, explore the eclectic neighborhoods, and take a stroll along the picturesque Lake Ontario waterfront. Immerse yourself in multicultural delights, from global cuisine to vibrant festivals. Toronto offers a perfect mix of urban adventure and natural beauty.', '2023-12-20', '2023-12-27', 1000, '7f4bc2a8-534b-4007-8530-df4fc3203545.jpg'),
(23, 'Maldives', 'Escape to paradise in the Maldives where crystal-clear waters and overwater bungalows await. Explore vibrant coral reefs, relax on pristine white-sand beaches, and savor exquisite seafood cuisine.', '2023-11-15', '2023-11-22', 3000, 'db27e126-e93f-4269-acc2-13b62f4deca8.jpg'),
(24, 'Kyoto, Japan', 'Discover the timeless beauty of Kyoto, Japan\'s cultural gem. Visit ancient temples, stroll through serene bamboo groves, and experience the traditional tea ceremony.', '2024-04-10', '2024-04-17', 2500, '3e4ddbd0-68a0-4991-a699-f3170cac420e.jpg'),
(25, 'Bali, Indonesia', 'Explore the tropical paradise of Bali, known for its lush landscapes, stunning beaches, and vibrant culture. Immerse yourself in Balinese traditions, visit ancient temples, and relax in luxurious resorts. This exotic getaway awaits you.', '2024-05-10', '2024-05-17', 1800, 'eafa3ed2-f73b-4417-a54c-888e57ede8b1.jpg'),
(26, 'Sydney, Australia', 'Experience the cosmopolitan charm of Sydney, with its iconic landmarks like the Sydney Opera House and the Sydney Harbour Bridge. Enjoy the vibrant city life, explore beautiful beaches, and savor delicious seafood. Sydney offers an unforgettable adventure.', '2024-06-05', '2024-06-12', 2200, '511cb113-9262-44f7-9071-0cf6f6bae2b5.jpg'),
(27, 'Rio de Janeiro, Brazil', 'Experience the lively spirit of Rio de Janeiro, known for its Carnival, beautiful beaches, and iconic Christ the Redeemer statue. Enjoy samba music, explore lush rainforests, and savor Brazilian cuisine.', '2024-08-15', '2024-08-22', 1900, 'ce04472c-598f-4a46-8fa9-afa9f5eb16d4.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
