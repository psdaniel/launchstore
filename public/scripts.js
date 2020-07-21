const input = document.querySelector('input[name="price"]')
input.addEventListener("keydown", function(e){
    let {value} = e.target

    value = value.replace(/\D/g, "")
})