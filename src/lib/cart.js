const { formatPrice } = require('./utils')

//carrinho fica guardado na sessão(req.session)
const Cart = {
    init(oldCart) {
        if(oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this
    },
    addOne(product) {
        // ver se o produto já existe no carrinho
        let inCart = this.getCartItem(product.id)

        // se não existe
        if (!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        //max quantity
        if(inCart.quantity >= product.quantity) return this

        //update item
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // update cart
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this
    },
    removeOne(productId){
        // pegar o item do carrinho
        const inCart = this.getCartItem(productId)

        if(!inCart) return this

        // atualizar o item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity 
        inCart.formattedPrice = formatPrice(inCart.price)

        // atualizar o carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {
            this.items = this.items.filter(item => item.product.id != inCart.product.id)
            
            return this
        }

        return this
    },
    delete(productId){
        const inCart = this.getCartItem(productId)
        if(!inCart) return this

        if(this.items.length > 0) {
            this.total.quantity -= inCart.quantity
            this.total.price -= (inCart.product.price * inCart.quantity)
            this.total.formattedPrice = formatPrice(this.total.price)
        }

        this.items = this.items.filter(item => inCart.product.id != item.product.id)
        return this
    },
    getCartItem(productId) {
        return this.items.find(item => item.product.id == productId)
    }
}

const product = {
    id: 1,
    price: 199,
    quantity: 2
}


const product2 = {
    id: 2,
    price: 199,
    quantity: 1
}

console.log('add first cart item')
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('add second cart item')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('add third cart item')
oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('remove one item')
oldCart = Cart.init().removeOne(product.id)
console.log(oldCart)

console.log('remove one item')
oldCart = Cart.init().removeOne(product.id)
console.log(oldCart)

// adicionar 1 item ao carrinho
// remover 1 item do carrinho
// deletar todo o item

module.exports = Cart