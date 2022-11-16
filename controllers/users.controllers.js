const mysqlConnection = require("../db/dbConnection");
const { getRole } = require('../helpers/helpers');

const getAllUsers = (req, res) => {
    mysqlConnection.query('SELECT * FROM USERS;', (error, results) => {
        if(error)
        {
            console.log(error);
            res.status(500).json({
                message:"INTERNAL SERVER ERROR"
            });
        }
        res.status(200).json(results);
    });
}

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
    const { userName = "alex", password = "111", roleId = "EMPLOYED", idRole } = req.body;
    if(idRole!=1)
    {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
    // -> get a valid Role
    let roleIdStatus = getRole(roleId);
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


const updateUser = (req, res) => {
    const { userName = "alexischavez", password="none", role="ADMIN", id = 2 } = req.body;
    let roleStatus = getRole(role);
    mysqlConnection.query(`UPDATE USERS SET user_name ='${userName}', password='${password}', id_role='${roleStatus}' WHERE user_id=${id};`, 
    (error, result)=>{
        if(error)
        {
            console.log(error)
            return res.status(500).json({
                message: "INTERNAL SERVER ERROR"
            });
        }
        console.log(result)
        res.status(200).json({
            message:"USER UPDATED",
            ...result
        })
    });
}
  

module.exports = {
    getUser,
    addUser,
    updateUser,
    getAllUsers
}