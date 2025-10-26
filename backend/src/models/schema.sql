
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    gmat_score INTEGER CHECK (gmat_score BETWEEN 0 AND 800),
    gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0.00 AND 4.00),
    work_experience INTEGER CHECK (work_experience >= 0),
    program_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    avg_gmat INTEGER,
    avg_gpa DECIMAL(3,2),
    avg_work_exp INTEGER,
    acceptance_rate DECIMAL(4,2),
    ranking INTEGER,
    program_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    search_params JSONB,
    results JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
