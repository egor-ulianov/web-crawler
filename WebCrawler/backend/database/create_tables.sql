CREATE DATABASE backend;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(username),
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name)
);

CREATE TABLE WebsiteRecord (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    isActive BOOLEAN NOT NULL,
    boundaryRegExp VARCHAR(255) NOT NULL,
    periodicity INT NOT NULL
);

CREATE TABLE Tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE WebsiteRecordTag (
    websiteRecordId INT,
    tagId INT,
    PRIMARY KEY (websiteRecordId, tagId),
    FOREIGN KEY (websiteRecordId) REFERENCES WebsiteRecord(id),
    FOREIGN KEY (tagId) REFERENCES Tag(id)
);

CREATE TYPE ExecutionState AS ENUM ('Pending', 'Running', 'Completed', 'Failed');

CREATE TABLE WebsiteCrawlExecutionPlan (
    id SERIAL PRIMARY KEY,
    websiteRecordId INT,
    date TIMESTAMP NOT NULL,
    state ExecutionState NOT NULL,
    FOREIGN KEY (websiteRecordId) REFERENCES WebsiteRecord(id)
);

CREATE TABLE WebsiteCrawlExecutionNode (
    id SERIAL PRIMARY KEY,
    websiteCrawlExecutionPlanId INT,
    url VARCHAR(255) NOT NULL,
    crawlTime TIMESTAMP NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (websiteCrawlExecutionPlanId) REFERENCES WebsiteCrawlExecutionPlan(id)
);

CREATE TABLE CrawlNodesChildren (
    parentId INT,
    childId INT,
    PRIMARY KEY (parentId, childId),
    FOREIGN KEY (parentId) REFERENCES WebsiteCrawlExecutionNode(id),
    FOREIGN KEY (childId) REFERENCES WebsiteCrawlExecutionNode(id)
);

