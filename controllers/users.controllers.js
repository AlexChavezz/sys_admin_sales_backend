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
    // const { userName, password, roleId } = req.body;
    
    // -> validar si un usuario ya existe
    // let userName = 'alexis';
    // let password = "alexis";
    // let roleId = "CUALQUIER OTRA COSA"
    // let roleIdStatus = null;

    roleId === "ADMIN"? roleIdStatus = 1: true ;
    roleId === "EMPLOYED"? roleIdStatus = 2: true;

    if(roleId)
    {
        mysqlConnection.query(`INSERT INTO USERS (user_name, password, id_role) VALUES ('${ userName }', '${ password }', ${ roleIdStatus });`, (error, result) => {
            if(error)
            {
                res.status(500).json({
                    message: "INTERNAL SERVER ERROR",
                });
            }
            console.log(result);
            res.status(200).json(result);
        });
    }
    res.status(400).json({
        message:"Bad request"
    });
}

module.exports = {
    getUser,
    addUser
}