import mysql from 'mysql2/promise';

export class DatabaseClient {
    #dbConnection;

    async initConnection() {
        try {
            // console.log('=== DATABASE CONNECTION DEBUG ===');
            // console.log('Attempting to connect with:');
            // console.log('Host:', process.env.MYSQL_HOST);
            // console.log('User:', process.env.MYSQL_USER);
            // console.log('Database:', process.env.MYSQL_DATABASE);
            // console.log('Port:', process.env.MYSQL_PORT);

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
        const pages = [];

        if (!this.#dbConnection) {
            console.error('No database connection!');
            return null;
        }

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
                            page_id: row.page_id,
                            path: row.path
                        });
                    } else {
                        pages.push({
                            id: row.id,
                            name: row.name,
                            description: row.description,
                            pieces: [{
                                page_id: row.page_id,
                                path: row.path //TODO: apply more security for a source or path hacking protection
                            }]
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching page with pieces:', error);
                throw error;
            }
        }

        return pages[0]
    }
}