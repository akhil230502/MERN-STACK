-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: library_management
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_status`
--

DROP TABLE IF EXISTS `book_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) DEFAULT NULL,
  `status_type` int DEFAULT NULL,
  `borrowdate` date DEFAULT NULL,
  `duedate` date DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_status_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `bookmain` (`id`),
  CONSTRAINT `fk_users_idnty` FOREIGN KEY (`user_id`) REFERENCES `users` (`identity`),
  CONSTRAINT `status_type_status` FOREIGN KEY (`id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_status`
--

LOCK TABLES `book_status` WRITE;
/*!40000 ALTER TABLE `book_status` DISABLE KEYS */;
INSERT INTO `book_status` VALUES (1,'Hero of India',1,'2025-03-25','2025-04-10','ffe4973b-7603-42ce-82bb-750800e307e5',4,'2025-04-04 07:21:40');
/*!40000 ALTER TABLE `book_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmain`
--

DROP TABLE IF EXISTS `bookmain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_name` varchar(255) DEFAULT NULL,
  `book_type` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Author` varchar(100) DEFAULT NULL,
  `bookimg` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_type` (`book_type`),
  CONSTRAINT `bookmain_ibfk_1` FOREIGN KEY (`book_type`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmain`
--

LOCK TABLES `bookmain` WRITE;
/*!40000 ALTER TABLE `bookmain` DISABLE KEYS */;
INSERT INTO `bookmain` VALUES (3,'Evil Dead',2,'2025-04-04 06:36:16','Tom Cruse',NULL),(4,'Hero of India',1,'2025-04-04 06:36:58','Justin Baber',NULL),(5,NULL,NULL,'2025-04-04 11:18:46',NULL,NULL),(6,'PURSUIT OF HAPPINESS',2,'2025-04-04 11:47:52','TOM BANRAN',NULL),(7,'AIR JORAN',1,'2025-04-04 11:58:53','NIKE TYSON',NULL),(11,'AIRTEL',1,'2025-04-04 12:02:10','ADANI',NULL),(12,'Test',1,'2025-04-04 12:07:19','Testing',NULL),(13,'Tst',2,'2025-04-04 12:08:04','Tested',NULL),(14,'qa',1,'2025-04-04 12:11:46','qa test',NULL);
/*!40000 ALTER TABLE `bookmain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Fiction','2025-04-04 06:09:11'),(2,'Historical Fiction','2025-04-04 06:22:43'),(3,'Fantasy','2025-04-04 06:23:17');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logindetails`
--

DROP TABLE IF EXISTS `logindetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logindetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `password_user` varchar(255) DEFAULT NULL,
  `role_type` int DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_type` (`role_type`),
  KEY `fk_user_idnty` (`user_id`),
  CONSTRAINT `fk_user_idnty` FOREIGN KEY (`user_id`) REFERENCES `users` (`identity`),
  CONSTRAINT `logindetails_ibfk_1` FOREIGN KEY (`role_type`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logindetails`
--

LOCK TABLES `logindetails` WRITE;
/*!40000 ALTER TABLE `logindetails` DISABLE KEYS */;
INSERT INTO `logindetails` VALUES (1,'ram@ispectratechnologies.com','rambalaji@ispec',1,'ffe4973b-7603-42ce-82bb-750800e307e5','2025-04-04 05:55:24');
/*!40000 ALTER TABLE `logindetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2025-04-02 10:26:50'),(2,'staff','2025-04-02 10:26:50'),(3,'student','2025-04-02 10:26:50');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'IN PROGRESS','2025-04-04 07:05:29'),(2,'NOT SUBMITTED YET ','2025-04-04 07:06:03'),(3,'SUBMITTED','2025-04-04 07:06:12');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `identity` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identity_UNIQUE` (`identity`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'akhil','CSE','akhilesh@ispectratechnologies.com','2025-04-04 05:04:39',NULL),(2,'akhil','CSE','akhilesh@ispectratechnologies.com','2025-04-04 05:22:03','500c7d47-3059-42e1-8066-4c7cfdd3e448'),(3,'akhil','CSE','akhilesh@ispectratechnologies.com','2025-04-04 05:28:05','9659243b-e941-4df3-a52c-72a6404a9a70'),(4,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:44:41','4e2780e9-f053-4d81-9e47-e3c84cdc443d'),(5,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:45:08','78ecdd67-617e-4b62-99e1-33e13e4248dd'),(6,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:47:43','f5bb7ddf-f8a9-49f7-a396-204a174ae6a3'),(7,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:48:17','a31da1a8-2840-429c-91ae-f90d30b34ea4'),(8,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:48:27','6ea1efda-e234-4703-99e3-e0eae56810c4'),(9,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:49:02','6891367a-80ba-4896-8be9-1ec4b12b51af'),(10,'akhil','CSE','akhilesh@ispectratechnologies.com','2025-04-04 05:50:41','4febb31a-180d-4a1c-b705-9f3774a333fb'),(11,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:52:55','210f67c9-6e00-490e-9818-857ac9d3102e'),(12,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:53:54','e9a60524-e1aa-4640-bc39-4cb323f80952'),(13,'rambalaji','CSE','ram@ispectratechnologies.com','2025-04-04 05:55:24','ffe4973b-7603-42ce-82bb-750800e307e5');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04 17:48:54
