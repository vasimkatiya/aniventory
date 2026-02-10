const { Client } = require("pg");
require('dotenv').config();

const SQL = `CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  genre_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS animes (
  id SERIAL PRIMARY KEY,
  anime_name VARCHAR(150) UNIQUE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('series', 'movie')) NOT NULL,
  ep INTEGER NOT NULL CHECK (ep >= 1),
  dubbed VARCHAR(10) CHECK (dubbed IN ('yes', 'no')) NOT NULL,
  genres_id INTEGER NOT NULL,
  CONSTRAINT fk_genres
    FOREIGN KEY (genres_id)
    REFERENCES genres(id)
    ON DELETE CASCADE
);

INSERT INTO genres (genre_name) VALUES
('Action'),
('Romance'),
('Thriller'),
('Fantasy')
ON CONFLICT (genre_name) DO NOTHING;

INSERT INTO animes (anime_name, type, ep, dubbed, genres_id) VALUES
('Naruto', 'series', 220, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Action')),

('One Piece', 'series', 1000, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Action')),

('Attack on Titan', 'movie', 87, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Action')),

('Death Note', 'series', 37, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Thriller')),

('Demon Slayer', 'series', 55, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Action')),

('Your Name', 'movie', 1, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Romance')),

('A Silent Voice', 'movie', 1, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Romance')),

('Spirited Away', 'movie', 1, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Fantasy')),

('Jujutsu Kaisen 0', 'movie', 1, 'yes',
 (SELECT id FROM genres WHERE genre_name = 'Action'))
ON CONFLICT (anime_name) DO NOTHING;


`

async function main() {
const client = new Client({
   connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
});

       
    await client.connect();
    await client.query(SQL);
    await client.end();
}

module.exports = main;