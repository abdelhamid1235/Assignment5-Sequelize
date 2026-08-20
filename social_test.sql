SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `social_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `c_id` int(11) NOT NULL,
  `c_content` text NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`c_id`, `c_content`, `userId`, `postId`, `createdAt`, `updatedAt`) VALUES
(22, 'Updated comment', 2, 8, '2026-08-20 21:28:15', '2026-08-20 21:30:08'),
(23, 'I really like this post.', 1, 9, '2026-08-20 21:28:15', '2026-08-20 21:28:15'),
(24, 'Very useful information.', 1, 9, '2026-08-20 21:28:15', '2026-08-20 21:28:15'),
(25, 'Thanks for sharing this post', 5, 10, '2026-08-20 21:28:15', '2026-08-20 21:28:15'),
(26, 'Keep going, great work!', 1, 11, '2026-08-20 21:28:15', '2026-08-20 21:28:15'),
(28, 'This is find or create', 1, 9, '2026-08-20 21:32:54', '2026-08-20 21:32:54');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `p_id` int(11) NOT NULL,
  `p_title` varchar(255) NOT NULL,
  `p_content` text NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`p_id`, `p_title`, `p_content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(8, 'My First Post', 'this is my first post.', 1, '2026-08-20 21:08:55', '2026-08-20 21:08:55', NULL),
(9, 'My Second Post', 'this is my second post.', 2, '2026-08-20 21:12:19', '2026-08-20 21:16:58', '2026-08-20 21:16:58'),
(10, 'My three Post', 'this is my thired post.', 1, '2026-08-20 21:21:17', '2026-08-20 21:21:17', NULL),
(11, 'My four Post', 'this is my four post.', 2, '2026-08-20 21:21:30', '2026-08-20 21:21:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_password` varchar(255) NOT NULL,
  `u_role` enum('user','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_name`, `u_email`, `u_password`, `u_role`, `createdAt`, `updatedAt`) VALUES
(1, 'abdelhamid', 'abdelhamid@gmail.com', '12300000007', 'admin', '2026-08-20 20:45:49', '2026-08-20 20:45:49'),
(2, 'UpdateNmae', 'Update@gmail.com', '111111', 'user', '2026-08-20 20:50:42', '2026-08-20 20:56:49'),
(5, 'Ahmed Mohamed', 'ahmed@gmail.com', '12345678', 'user', '2026-08-20 20:43:46', '2026-08-20 20:43:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`),


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,
COMMIT;