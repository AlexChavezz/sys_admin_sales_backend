
const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.port = process.env.PORT || 8080;
            this.app = express();
        this.usersPath = '/api/users';
        this.productsPath = '/api/products';
        
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use(this.usersPath, require('../routes/users.routes'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }
}


module.exports = Server;