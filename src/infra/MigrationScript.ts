const migrationScript = `
  CREATE TABLE IF NOT EXISTS stores (
    id VARCHAR(16) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    store_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS offers (
    id VARCHAR(16) PRIMARY KEY,
    store_id VARCHAR(16) NOT NULL,
    offer_title VARCHAR(255) NOT NULL,
    offer_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    valid_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE
  );

  ALTER TABLE offers ADD COLUMN destination_link VARCHAR(255);
`;

export default migrationScript;