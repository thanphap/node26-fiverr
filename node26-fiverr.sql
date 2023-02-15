/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_comment` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) NOT NULL,
  `comment_rate` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comments_jobId_userId_unique` (`job_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_287` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_288` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hire_job`;
CREATE TABLE `hire_job` (
  `hire_job_id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `user_id` int NOT NULL,
  `hire_date` datetime NOT NULL,
  `complete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`hire_job_id`),
  UNIQUE KEY `hire_job_jobId_userId_unique` (`job_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `hire_job_ibfk_147` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hire_job_ibfk_148` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `job_detail`;
CREATE TABLE `job_detail` (
  `job_detail_id` int NOT NULL AUTO_INCREMENT,
  `job_detail_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job_type_id` int NOT NULL,
  PRIMARY KEY (`job_detail_id`),
  KEY `job_type_id` (`job_type_id`),
  CONSTRAINT `job_detail_ibfk_1` FOREIGN KEY (`job_type_id`) REFERENCES `job_type` (`job_type_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `job_type`;
CREATE TABLE `job_type` (
  `job_type_id` int NOT NULL AUTO_INCREMENT,
  `job_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`job_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_Name` varchar(255) NOT NULL,
  `assess` int DEFAULT NULL,
  `price` float NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `job_rate` int DEFAULT NULL,
  `job_detail_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`job_id`),
  KEY `job_detail_id` (`job_detail_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `jobs_ibfk_483` FOREIGN KEY (`job_detail_id`) REFERENCES `job_detail` (`job_detail_id`) ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_484` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('user','admin') DEFAULT 'user',
  `skill` varchar(255) NOT NULL,
  `certification` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `job_id`, `user_id`, `created_comment`, `content`, `comment_rate`) VALUES
(1, 1, 2, '2023-02-05 04:41:15', 'ok', 3);
INSERT INTO `comments` (`comment_id`, `job_id`, `user_id`, `created_comment`, `content`, `comment_rate`) VALUES
(2, 2, 2, '2023-02-05 14:03:06', 'ok all', 2);
INSERT INTO `comments` (`comment_id`, `job_id`, `user_id`, `created_comment`, `content`, `comment_rate`) VALUES
(3, 3, 1, '2023-02-11 14:40:45', 'ok', 1);
INSERT INTO `comments` (`comment_id`, `job_id`, `user_id`, `created_comment`, `content`, `comment_rate`) VALUES
(4, 4, 1, '2023-02-11 14:44:18', 'good', 1),
(5, 2, 1, '2023-02-11 14:44:42', 'bad', 1),
(6, 6, 1, '2023-02-11 14:46:01', 'ok', 4);

INSERT INTO `hire_job` (`hire_job_id`, `job_id`, `user_id`, `hire_date`, `complete`) VALUES
(1, 1, 2, '2023-02-04 21:41:15', 0);
INSERT INTO `hire_job` (`hire_job_id`, `job_id`, `user_id`, `hire_date`, `complete`) VALUES
(2, 2, 2, '2023-02-07 00:00:00', 1);


INSERT INTO `job_detail` (`job_detail_id`, `job_detail_name`, `image`, `job_type_id`) VALUES
(1, 'Social', 'https://fiverrnew.cybersoft.edu.vn/images/lcv3.jpg', 2);
INSERT INTO `job_detail` (`job_detail_id`, `job_detail_name`, `image`, `job_type_id`) VALUES
(2, 'Advertising', 'https://fiverrnew.cybersoft.edu.vn/images/lcv4.jpg', 2);
INSERT INTO `job_detail` (`job_detail_id`, `job_detail_name`, `image`, `job_type_id`) VALUES
(3, 'Content Writing & Editing', 'https://fiverrnew.cybersoft.edu.vn/images/lcv5.jpg', 3);
INSERT INTO `job_detail` (`job_detail_id`, `job_detail_name`, `image`, `job_type_id`) VALUES
(4, 'Business Copy', 'https://fiverrnew.cybersoft.edu.vn/images/lcv6.jpg', 3),
(5, 'Business Copy 5', 'http://localhost:4000/static/imageDetailJob/1676128589545-904437926-hot girl.jpeg', 3),
(6, 'Business Copy 7', 'https://fiverrnew.cybersoft.edu.vn/images/lcv7.jpg', 3);

INSERT INTO `job_type` (`job_type_id`, `job_type_name`) VALUES
(1, 'Graphics & Design');
INSERT INTO `job_type` (`job_type_id`, `job_type_name`) VALUES
(2, 'Digital Marketing');
INSERT INTO `job_type` (`job_type_id`, `job_type_name`) VALUES
(3, 'Writing & Translation');
INSERT INTO `job_type` (`job_type_id`, `job_type_name`) VALUES
(4, 'Video & Animation'),
(5, 'Music & Audio'),
(6, 'Music & Audio 2');

INSERT INTO `jobs` (`job_id`, `job_Name`, `assess`, `price`, `image`, `description`, `short_desc`, `job_rate`, `job_detail_id`, `user_id`) VALUES
(1, 'I will design an outstanding logo', 100, 15, 'http://localhost:4000/static/imageJob/1676128403320-317686172-chan usb.png', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', 'Plus - MOST SELLING!\r\nUS$65\r\n3 logo options + source file in Ai, EPS, SVG, PDF, and PSD\r\n\r\n2 Days Delivery\r\n5 Revisions\r\n3 concepts included\r\nLogo transparency\r\nVector file\r\nPrintable file\r\nSource file', 1, 2, 1);
INSERT INTO `jobs` (`job_id`, `job_Name`, `assess`, `price`, `image`, `description`, `short_desc`, `job_rate`, `job_detail_id`, `user_id`) VALUES
(2, 'I will design 3 modern minimalist flat logo designs', 99, 30, 'https://fiverrnew.cybersoft.edu.vn/images/cv2.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', 'US$30\r\nSave up to 15% with Subscribe to Save\r\nSTANDARD Package - Recommended 5 ULTRA HQ logos + Free Revisions + Vector Source files(Ai, EPS, PDF) for final design\r\n\r\n2 Days Delivery\r\nUnlimited Revisions', 2, 2, 1);
INSERT INTO `jobs` (`job_id`, `job_Name`, `assess`, `price`, `image`, `description`, `short_desc`, `job_rate`, `job_detail_id`, `user_id`) VALUES
(3, 'I will design minimal logo with complete corporate brand identity', 66, 10, 'https://fiverrnew.cybersoft.edu.vn/images/cv3.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', 'US$10\r\nSave up to 20% with Subscribe to Save\r\nBASIC CORPORATE BRAND IDENTITY Business Card + Letterhead + Compliment Design\r\n\r\n2 Days Delivery\r\nUnlimited Revisions\r\nIncludes logo design\r\nLogo usage guidelines\r\nColor palette\r\nTypography guidelines', 4, 3, 1);
INSERT INTO `jobs` (`job_id`, `job_Name`, `assess`, `price`, `image`, `description`, `short_desc`, `job_rate`, `job_detail_id`, `user_id`) VALUES
(4, 'I will do modern logo design with premium brand identity', 442, 35, 'https://fiverrnew.cybersoft.edu.vn/images/cv4.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', 'US$10\r\nSave up to 20% with Subscribe to Save\r\nBASIC CORPORATE BRAND IDENTITY Business Card + Letterhead + Compliment Design\r\n\r\n2 Days Delivery\r\nUnlimited Revisions\r\nIncludes logo design\r\nLogo usage guidelines\r\nColor palette\r\nTypography guidelines', 3, 3, 2),
(5, 'I will create an effective instagram hashtag growth strategy', 542, 40, 'https://fiverrnew.cybersoft.edu.vn/images/cv5.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', '#40 + organic growth strategy\r\nUS$20\r\n🎯 40# + Personalized Growth Strategy + Hashtag Guide + News List & Tools + Account Optimization\r\n\r\n3 Days Delivery\r\nPage/channel evaluation\r\nAction plan', 5, 4, 3),
(6, 'I will do modern logo design with premium brand identity 1', 442, 35, 'https://fiverrnew.cybersoft.edu.vn/images/cv4.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', 'US$10\r\nSave up to 20% with Subscribe to Save\r\nBASIC CORPORATE BRAND IDENTITY Business Card + Letterhead + Compliment Design\r\n\r\n2 Days Delivery\r\nUnlimited Revisions\r\nIncludes logo design\r\nLogo usage guidelines\r\nColor palette\r\nTypography guidelines', 3, 3, 2),
(7, 'I will create an effective instagram hashtag growth strategy 4', 542, 20, 'https://fiverrnew.cybersoft.edu.vn/images/cv5.jpg', '\nHi There,\r\n\r\n\r\n\r\nHave You Been Looking for a Brand Logo with Complete Corporate Brand Identity?\r\n\r\n\r\n\r\nHi, I am Talha, a Passionate Professional Graphic Designer designing brand logos & brand Identity for many Years, I have successfully designed brand logos with the complete corporate brand identity for different brands around the world.\r\n\r\n\r\n\r\nI also would love to do demanded designs, Just leave your request, I will respond instantly.', '#40 + organic growth strategy\r\nUS$20\r\n🎯 40# + Personalized Growth Strategy + Hashtag Guide + News List & Tools + Account Optimization\r\n\r\n3 Days Delivery\r\nPage/channel evaluation\r\nAction plan', 5, 4, 1);

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$RvE4wUKRALMudGFt6qQE3OU9xGuHchctCN0ybR4X.OdfTkUsBXDG.', NULL, '0', 1, 'admin', '', '', 'http://localhost:4000/static/avatar/1676128211822-555965217-hot girl.jpeg');
INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(2, 'long', 'long@gmail.com', '$2b$10$lqYsKixMZ/UOxoDF.s7c6.qo2ivgX7saFzqG56pp49IXYcnbXRALG', NULL, '0', 1, 'user', '', '', NULL);
INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(3, 'nam', 'nam@gmail.com', '$2b$10$HqASEaZq/tcdTSgm6f5pEepKewSxshboUc00OwHihjoW8wdeKfsyK', NULL, '18', 1, 'user', '', '', NULL);
INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(4, 'thien', 'thien@gmail.com', '$2b$10$AOzRP0qyv./O9ZrKNjrzk.V5k.PsQOuD8F316Ipqms1tE6qMf4ktC', NULL, '0', 1, 'user', '', '', NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;