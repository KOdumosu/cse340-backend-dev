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
    organization_id INT REFERENCES organizations(organization_id)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'Urban farming and sustainability organization.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'Volunteer coordination group.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO projects (project_name, description, organization_id)
VALUES
('Park Cleanup', 'Cleaning and restoring public parks.', 1),
('Community Tutoring', 'Tutoring students in local communities.', 2),
('Health Awareness Campaign', 'Promoting community health awareness.', 3);

INSERT INTO categories (category_name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 4);