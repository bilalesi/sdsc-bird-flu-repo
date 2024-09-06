CREATE TABLE `bird_flu_cases` (
	`id` text PRIMARY KEY NOT NULL,
	`latitude` real,
	`longitude` real,
	`species` text,
	`H5N1` real,
	`H5N2` real,
	`H7N2` real,
	`H7N8` real,
	`timestamp` text,
	`provenance` text
);
