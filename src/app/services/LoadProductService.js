const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    product(){},
    products(){}
}

LoadService.load('product', {where: {id: 1}})

module.exports = LoadService