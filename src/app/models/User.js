const db = require('../../config/db')
const { hash } = require('bcryptjs')
const fs = require('fs')

const Product = require('../models/Product')
const Base = require('./Base')

Base.init({table: 'users'})

const User = {
    ...Base,
    async create(data) {
        try {
            const query = `
        INSERT INTO users (
            name,
            email,
            password,
            cpf_cnpj,
            cep,
            address
        )   VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const passwordHash = await hash(data.password, 8)
    
    const values = [
        data.name,
        data.email,
        passwordHash,
        data.cpf_cnpj.replace(/\D/g, ""),
        data.cep.replace(/\D/g, ""),
        data.address
    ]

    const results = db.query(query, values)
    return results.rows[0].id

    } catch(err) {
        console.error(err)
    }

    },
    async update(id, fields) {
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if((index + 1 < array.length)) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                //last interation
                query = `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}
            `
            }
        })

        await db.query(query)
        return 
    },
    async delete(id) {
        //pegar todos os produtos
        let results = await db.query("SELECT * FROM products WHERE user_id = $1", [id])
        const products = results.rows
        // dos produtos, pegar todas as imagens
        const allFilesPromise = products.map(product => 
            Product.files(product.id))

        
        let promiseResults = await Promise.all(allFilesPromise)

        // rodar a remoção do usuário
        await db.query('DELETE FROM users WHERE id = $1', [id])

        // remover as imagens da pasta public
        promiseResults.map(results => {
            results.rows.map(file => {
                try {
                    fs.unlinkSync(file.path)
                } catch(err) {
                    console.log(err)
                }
            })  
        })


    }
        
}
module.exports = User
