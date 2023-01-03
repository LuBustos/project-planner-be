CREATE SCHEMA `project_planner`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id`  int unsigned NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id`  int unsigned NULL,
  `title` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status_id` int unsigned DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `status_tasks`;
CREATE TABLE `status_tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id`  int unsigned NULL,
  `description` varchar(100) NOT NULL,
  `active` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `task` 
ADD COLUMN `dueDate` DATETIME NULL AFTER `created_by`;