const mysqlConnection = require("../db/dbConnection")

const getAllProducts = (req, res) => {
    mysqlConnection.query('SELECT * FROM PRODUCTS;', (error, result) => {
        if(error)
        {
            console.log(error)
            res.status(500).json({
                message:"INTERNAL SERVER ERROR"
            });
        }
        console.log(result)
        res.status(200).json(result);
    });
}

const updateProduct = async (req, res) => {
    const { id, product } = req.body;
    const {name, price, stock, idCategory } = product;
    const query = `UPDATE PRODUCTS SET product='${name}', price=${price}, stock=${stock}, id_category=${idCategory} WHERE product_id=${id};`;
    mysqlConnection.query(query, (error, results) => {
        if(error)
        {
            console.log(error)
            res.status(500).json({
                message: "2INTERNAL SERVER ERROR"
            })    
        }
        res.status(200).json(results)
    });
}



module.exports = {
    getAllProducts,
    updateProduct
}