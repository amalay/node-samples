CREATE DATABASE  IF NOT EXISTS `mysqldb`
USE `mysqldb`;

--=================================================================================
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  `DisplayName` varchar(25) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--=================================================================================
LOCK TABLES `role` WRITE;
INSERT INTO `role` VALUES 
(1, 'Admin', 'Admin'), 
(2, 'User', 'User');
UNLOCK TABLES;

--=================================================================================
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(25) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `RoleId` int NOT NULL DEFAULT '2',
  `IsActive` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `FK_Role_User_idx` (`RoleId`),
  CONSTRAINT `FK_Role_User` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--==================================================================================
LOCK TABLES `user` WRITE;
INSERT INTO `user` (Id, UserName, Password, FirstName, LastName, Email, RoleId, IsActive) VALUES 
(1, 'admin', '$2a$08$UTr5G3B.3iGfwodXyU2RIeCH69xbHCKBnWOk38V6lHq5dh8Wo83Mm', 'Test', 'Admin', 'admin@abc.com', 1, 1),
(2, 'user', '$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS', 'Test', 'User', 'user@abc.com', 2, 1);
UNLOCK TABLES;

--================================================================================
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsActive` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;