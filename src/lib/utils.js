module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        // yyyy
        const year = date.getFullYear()

        // mm
        const month = `0${date.getMonth() + 1}`.slice(-2)

        // dd
        const day = `0${date.getDate()}`.slice(-2)

        const hour = date.getHours()
        const minutes = date.getMinutes()

        // return yyyy-mm-dd
        return { 
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format:`${day}/${month}/${year}`
        }

    },
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    }
}