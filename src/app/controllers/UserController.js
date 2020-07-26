const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register", {user})
    },
    async show(req,res) {
        const {userId: id} = req.session
        
        const user = await User.findOne({ where: {id} })
        
        if(!user) return res.render("user/register", {
            error: "Usuário não encontrado"
        })

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCpfCnpj(user.cep)


        return res.render('user/index', { user })
    },
    async post(req, res) {
        
        
        const userId = await User.create(req.body)

        req.session.userId = userId
        
        return res.redirect('/users')
    }
}