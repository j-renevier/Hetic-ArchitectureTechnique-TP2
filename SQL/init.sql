CREATE TABLE IF NOT EXISTS historique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation VARCHAR(255) NOT NULL,
    resultat VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);