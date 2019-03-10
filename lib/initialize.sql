create database innovation;
use innovation;
create table tax_rate (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "ID",
    `rate` float NOT NULL COMMENT "税率",
    `start_date` datetime NOT NULL COMMENT "開始日付"
);