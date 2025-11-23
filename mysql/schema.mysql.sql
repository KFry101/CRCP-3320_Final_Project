USE personalportfoliowebapp;


CREATE TABLE IF NOT EXISTS art_pages (
                                         id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                         name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
    );

CREATE TABLE IF NOT EXISTS art_pieces(
                                         page_id INTEGER NOT NULL,
                                         path TEXT NOT NULL,
                                         FOREIGN KEY (page_id) REFERENCES art_pages(id) ON DELETE CASCADE
    );

INSERT INTO art_pages (name, description) VALUES ('Social Stressors', 'A collage series confronting the emotional weight of economic hardship.
                            Through chaotic layering and symbolic fragments, these works reflect the stress, identity struggles, and systemic pressures faced by those in marginalized communities. ');

INSERT INTO art_pieces (page_id, path) VALUES (1, 'college_stress.jpg');
INSERT INTO art_pieces (page_id, path) VALUES (1, 'medical_stress.jpg');
INSERT INTO art_pieces (page_id, path) VALUES (1, 'housing_stress.jpg');


