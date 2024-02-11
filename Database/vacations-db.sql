-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2024 at 01:39 PM
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
-- Database: `vacations-db-test`
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

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(1, 17),
(1, 48),
(1, 53),
(1, 54),
(1, 56);

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(2000) NOT NULL,
  `userId` int(11) NOT NULL,
  `clientUUID` varchar(36) NOT NULL COMMENT 'Unique for a client login',
  `addDate` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Not expiry date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, 'John', 'Bryce', 'jb@gmail.com', '2c14b168ed74dea4f7d73a3b9abb03240c8897965b77f2fce96073894d91a6fa0b5f4e044d40fa223c1641a6feb0ac5b99e19aecd89776042c629e64421d742f', 1),

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
  `imageName` varchar(100) NOT NULL,
  `followerCount` int(11) NOT NULL DEFAULT 0 COMMENT 'Count of users following this vacation'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vacations the website offers.';

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`, `followerCount`) VALUES
(16, 'Santorini, Greece', 'Indulge in an unforgettable Mediterranean getaway on the picturesque island of Santorini. Wander through charming white-washed villages adorned with iconic blue-domed roofs,all while enjoying breathtaking sunsets over the Aegean Sea. With pristine beaches, ancient ruins, and delectable local cuisine, Santorini promises an idyllic escape for romance and relaxation.', '2024-01-13', '2024-01-20', 1500, '6e604b07-1274-4167-a2a2-9d28e0e3c35d.jpg', 0),
(17, 'Oslo, Norway', 'Embark on a journey of Scandinavian elegance in Oslo, Norway\'s vibrant capital. Discover a city where modernity seamlessly merges with its rich historical roots. Explore the fascinating Viking Ship Museum, stroll through lush green parks, and be captivated by the beauty of Oslo\'s fjords. Savor the delights of Nordic cuisine and witness a burgeoning arts scene. Oslo invites culture and nature enthusiasts to revel in its unique charm.', '2024-02-10', '2024-02-17', 1200, 'ff3609e0-2af7-4629-90a6-796f0df23619.jpg', 1),
(18, 'London, United Kingdom', 'Dive into the heart of London, a city teeming with history, culture, and iconic landmarks. Visit Buckingham Palace, explore the British Museum, and take a ride on the iconic London Eye. Delight in West End theater shows, indulge in world-class shopping, and savor the diverse culinary scene. London promises a dynamic blend of tradition and innovation.', '2024-02-05', '2024-02-12', 1800, 'ed8caf31-b224-4c26-a6a6-6636ddcbb592.jpg', 0),
(20, 'Toronto, Canada', 'Experience the energetic vibes of Toronto, Canada\'s largest metropolis. Discover the awe-inspiring CN Tower, explore the eclectic neighborhoods, and take a stroll along the picturesque Lake Ontario waterfront. Immerse yourself in multicultural delights, from global cuisine to vibrant festivals. Toronto offers a perfect mix of urban adventure and natural beauty.', '2024-03-20', '2024-03-27', 1000, '7f4bc2a8-534b-4007-8530-df4fc3203545.jpg', 0),
(48, 'Tel Aviv, Israel', 'Immerse yourself in Tel Aviv\'s energetic atmosphere! Experience golden beaches, savor delectable cuisine, and explore a city that seamlessly marries tradition with modernity. Discover your perfect Tel Aviv getaway today!', '2024-01-30', '2024-02-18', 2500, '7c746065-d53a-48fa-98f0-0c00133759e8.jpg', 1),
(53, 'Kyoto, Japan', 'Immerse yourself in the timeless beauty of Kyoto, where ancient temples meet modern charm. Explore historic shrines, stroll through serene bamboo forests, and savor authentic Japanese cuisine in this cultural gem.', '2024-02-06', '2024-02-12', 2000, '309d0e7d-8594-4c64-a90e-e3ff34dc3f09.jpg', 1),
(54, 'Bali, Indonesia', 'Escape to the paradise of Bali, where lush landscapes meet stunning beaches. Discover vibrant markets, tranquil rice terraces, and indulge in traditional Balinese spa treatments, all amidst breathtaking natural beauty.', '2024-02-08', '2024-02-14', 800, '6673f0c7-8ca6-4e23-ae9c-1c1123903587.jpg', 1),
(55, 'Malé, Maldives', 'Experience ultimate luxury in the Maldives, a tropical haven of overwater bungalows and crystal-clear waters. Snorkel with vibrant marine life, unwind on pristine beaches, and create unforgettable memories in this idyllic destination.', '2024-02-10', '2024-02-17', 3500, 'f6372672-2f29-404e-b7c7-429c75add4f0.jpg', 0),
(56, 'Sydney, Australia', 'Explore the vibrant heart of Australia in Sydney. Iconic landmarks like the Sydney Opera House and Bondi Beach await you. Enjoy a blend of urban adventures, coastal beauty, and world-class dining experiences.', '2024-02-12', '2024-02-18', 2000, 'fd10efb0-ade8-4d83-b875-27506d5f82fe.jpg', 1),
(57, 'Rio de Janeiro, Brazil', 'Discover the rhythm of Rio de Janeiro, where samba beats and stunning landscapes captivate your senses. Witness the Christ the Redeemer statue, dance to the lively music, and relax on the famous Copacabana Beach.', '2024-02-20', '2024-02-25', 1900, '021f9aed-7dab-4c9e-abaf-37f22d8b02d3.jpg', 0),
(58, 'Cape Town, South Africa', 'Discover the beauty of Cape Town, nestled beneath the iconic Table Mountain. Explore diverse landscapes, from pristine beaches to lush vineyards. Dive into history, wildlife, and a vibrant cultural scene in this South African gem.', '2024-02-29', '2024-03-04', 1100, '4770e86b-86cc-42ae-b7e3-f7b08adf0e57.jpg', 0),
(59, 'Phuket, Thailand', 'Embark on an exotic adventure in Phuket, Thailand\'s largest island. Experience a blend of vibrant nightlife, serene beaches, and lush jungles. Explore ancient temples, savor mouthwatering Thai cuisine, and unwind in a tropical paradise.', '2024-04-09', '2024-04-15', 600, '5acc32e5-4a57-4af2-ab43-d1e588ab08d7.jpg', 0);

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
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

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
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_4` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
