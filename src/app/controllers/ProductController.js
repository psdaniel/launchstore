const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create(req, res) {
        //Pegar Categorias
        Category.all()
        .then(function(results) {
            const categories = results.rows

            return res.render("products/create.njk", {categories})
        }).catch(function(err) {
            throw new Error(err)
        })

    },
    async post(req, res) {
        // Lógica de Salvar
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all the fields!') 
        }
    }

    let results = await Product.create(req.body)
    const productId = results.rows[0].id

    results = await Category.all()
    const categories = results.rows

    return res.render("products/create.njk", { productId, categories })
    
    }
}