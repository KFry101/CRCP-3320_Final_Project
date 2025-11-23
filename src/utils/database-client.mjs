import mysql from 'mysql2/promise';

export class DatabaseClient {
    #dbConnection;

    async initConnection() {
        try {
            this.#dbConnection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: Number.parseInt(process.env.MYSQL_PORT)
            });
        } catch (error) {
            console.error('Error connecting to the database:', error);
            this.#dbConnection = null;
        }
    }

    async getPage(artId) {
        const page = [];

        if (this.#dbConnection) {
            try {
                const [rows] = await this.#dbConnection.execute('SELECT * FROM art_pages where id = ?', [artId]);
                page.push(...rows);
            } catch (error) {
                console.error('Error fetching palettes:', error);
            }
        }

        return page;
    }

    async getPageWithPieces(artId) {
        const page = [];

        if (this.#dbConnection) {
            try {
                const [rows] = await this.#dbConnection.execute(
                    'SELECT * FROM art_pages, art_pieces WHERE art_pages.id = art_pieces.page_id AND art_pages.id = ?',
                    [artId]
                );

                for (const row of rows) {
                    const page = pages.find(p => p.id === row.id);

                    if (page) {
                        page.pieces.push({
                            pieceId: row.piece_id,
                            // Add other piece properties here
                            // e.g., title: row.piece_title,
                            // imageUrl: row.piece_image_url,
                        });
                    } else {
                        pages.push({
                            id: row.id,
                            // Add page properties here
                            // e.g., title: row.page_title,
                            // description: row.page_description,
                            pieces: [{
                                pieceId: row.piece_id,
                                // Add other piece properties here
                            }]
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching page with pieces:', error);
            }
        }

        return pages.length > 0 ? pages[0] : null; // Return single page or null
    }

}