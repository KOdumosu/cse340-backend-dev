DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    organization_id INT NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- ORGANIZATIONS
----------------------------------------------------
INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'Community infrastructure nonprofit.', 'info@brightfuture.org', 'brightfuture.png'),
('GreenHarvest Growers', 'Urban farming and sustainability group.', 'contact@greenharvest.org', 'greenharvest.png'),
('UnityServe Volunteers', 'Volunteer coordination organization.', 'hello@unityserve.org', 'unityserve.png');

----------------------------------------------------
-- CATEGORIES
----------------------------------------------------
INSERT INTO categories (category_name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

----------------------------------------------------
-- PROJECTS (5 PER ORGANIZATION = 15 TOTAL)
----------------------------------------------------

-- Organization 1
INSERT INTO projects (project_name, description, organization_id)
VALUES
('Food Drive Initiative', 'Monthly food distribution program.', 1),
('School Renovation', 'Repairing local public schools.', 1),
('Medical Outreach', 'Free health checkups.', 1),
('Clean Water Access', 'Borehole and water supply project.', 1),
('Youth Training Program', 'Skills development for youths.', 1);

-- Organization 2
INSERT INTO projects (project_name, description, organization_id)
VALUES
('Urban Farming Expansion', 'Community garden development.', 2),
('Tree Planting Campaign', 'Environmental restoration project.', 2),
('Farm Education Program', 'Teaching sustainable farming.', 2),
('Food Sustainability Drive', 'Reducing food waste.', 2),
('Green Market Initiative', 'Supporting local organic farmers.', 2);

-- Organization 3
INSERT INTO projects (project_name, description, organization_id)
VALUES
('Volunteer Recruitment Drive', 'Bringing in new volunteers.', 3),
('Community Cleanup', 'Neighborhood sanitation effort.', 3),
('Elderly Care Program', 'Support for senior citizens.', 3),
('Youth Mentorship Program', 'Guiding young leaders.', 3),
('Emergency Relief Support', 'Disaster response assistance.', 3);

----------------------------------------------------
-- PROJECT CATEGORY MAPPINGS (EVERY PROJECT HAS ≥1)
----------------------------------------------------

INSERT INTO project_categories (project_id, category_id)
VALUES
-- Org 1 projects (1–5)
(1, 3), (2, 2), (3, 4), (4, 1), (5, 2),

-- Org 2 projects (6–10)
(6, 1), (7, 1), (8, 2), (9, 3), (10, 1),

-- Org 3 projects (11–15)
(11, 3), (12, 3), (13, 4), (14, 2), (15, 3);