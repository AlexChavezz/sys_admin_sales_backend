const mysql = require('mysql2'); 
const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.port = process.env.PORT || 8080;
            this.app = express();
        this.usersPath = '/api/users';
        this.productsPath = '/api/products';
        
        this.getMySqlConection();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    getMySqlConection() {
        const mysqlConnection = mysql.createConnection({
            user: 'admin',
            password: 'password',
            host: '20.38.12.77',
            database:'tienditaMiLuzDB'
        });

        mysqlConnection.execute("SELECT * FROM ROLES;", function(error, results, fields){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log(results);
            }
        });
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