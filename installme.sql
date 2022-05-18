CREATE DATABASE spicebot;
USE spicebot;

CREATE TABLE settings (
  guildId VARCHAR(100) PRIMARY KEY,
  cmdPrefix VARCHAR(10) DEFAULT('!'),
  modLogId VARCHAR(100),
  memberId VARCHAR(100),
  verifiedId VARCHAR(100)
  );

CREATE TABLE xp (
  id VARCHAR(30) NOT NULL,
  xp INT NOT NULL,
  level VARCHAR(30) NOT NULL
);

CREATE TABLE users (
    userId VARCHAR(100),
    warns INT,
    kicks INT,
    bans INT,
    mutes INT
);