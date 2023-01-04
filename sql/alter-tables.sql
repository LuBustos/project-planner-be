CREATE SCHEMA `project_planner`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `active` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status_id` int unsigned DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `dueDate` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `status_tasks`;
CREATE TABLE `status_tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `active` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_task`;
CREATE TABLE `user_task` (
  `taskId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`taskId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Status tasks

INSERT INTO `project_planner`.`status_tasks` (`description`, `active`) VALUES ('STARTED', '1');
INSERT INTO `project_planner`.`status_tasks` (`description`, `active`) VALUES ('COMPLETED', '1');
INSERT INTO `project_planner`.`status_tasks` (`description`, `active`) VALUES ('REMOVED', '1');
INSERT INTO `project_planner`.`status_tasks` (`description`, `active`) VALUES ('EXPIRED', '1');

-- Guest user
INSERT INTO `project_planner`.`user` (`username`, `password`, `active`) VALUES ('guest', 'guest', '1');
