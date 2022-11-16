const mysqlConnection = require("../db/dbConnection");


const getUser = (req, res) => {
    const { userName, password } = req.body;
    mysqlConnection.query(`SELECT * FROM USERS WHERE user_name='${userName}' AND password='${password}';`, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).json({
                message:"INTERNAL SERVER ERROR"
            });
        }
        res.status(200).json(result);
    });
}

const addUser = (req, res) => {
    const { userName = "alex", password = "111", roleId = "EMPLOYED" } = req.body;
    let roleIdStatus = null;
    roleId === "ADMIN" ? (roleIdStatus = 1) : true;
    roleId === "EMPLOYED" ? (roleIdStatus = 2) : true;

    // -> Validate if one user is already saved
    if (roleIdStatus) {
        mysqlConnection.query(`SELECT * FROM USERS WHERE user_name='${userName}';`, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    message: "INTERNAL SERVER ERROR",
                });
            }
            if (result.length > 0) {
                res.status(200).json({
                    message: "USER ALREADY EXISTS",
                });
            } else {
                // -> Save user into users table.
                mysqlConnection.query(`INSERT INTO USERS (user_name, password, id_role) VALUES ('${userName}', '${password}', ${roleIdStatus});`, (error, result) => {
                    if (error) {
                        res.status(500).json({
                            message: "INTERNAL SERVER ERROR",
                        });
                    }
                    console.log(result);
                    res.status(201).json(result);
                });
            }
        });
    } else {
        res.status(400).json({
            message: "Bad request",
        });
    }
};


  

module.exports = {
    getUser,
    addUser
}