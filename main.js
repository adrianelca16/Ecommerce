const productos = [
  {id: 1,name: 'Pan canilla',price: 10,img: 'assets/img/canilla.jpg'},
  {id:2,name: 'Pan frances',price: 12,img: 'assets/img/frances.jpg'},
  {id: 3,name: 'Pan Campesino',price: 15,img: 'assets/img/campesino.jpg'},
  {id: 4, name: "Pan sobado", price: 3, img: 'assets/img/sobado.jpg'},
  {id: 5, name: "Pan de hamburguesa", price: 2, img: 'assets/img/hamburguesa.jpg'},
  {id: 6, name: "Cachito", price: 4, img: 'assets/img/cachito.jpg'},
  {id: 7, name: "Pan de jamon", price: 6, img: 'assets/img/jamon.jpg'},
  {id: 8, name: "Acemita", price: 1, img: 'assets/img/acemitas.jpg'},
  {id: 9, name: "Bombas", price: 3, img: 'assets/img/bombas.jpg'},
  {id: 10, name: "Golfeados", price: 2, img: 'assets/img/golfeados.jpg'},
  {id: 11, name: "Pan de arequipe", price: 3, img: 'assets/img/arequipe.jpg'},
  {id: 12, name: "Pan de chocolate", price: 2, img: 'assets/img/chocolate.jpg'},
  {id: 13, name: "Pan de coco", price: 2, img: 'assets/img/coco.jpg'},
  {id: 14, name: "Pan de guayaba", price: 3, img: 'assets/img/guayaba.jpg'},
  {id: 15, name: "Roles de canela", price: 2, img: 'assets/img/roles.jpg'},
]


const db = {
  items: productos,
  methods: {
    find: function (id) {
      return db.items.find(function (item) {return item.id === id })
    },
    render: function () {
      let html = ''
      html += '<div class="products-principal">'
      html += db.items.map(function (item) {return `<div class="products-principal-bread"> <img src=${item.img} class="img-bread"><h3 class="products-title">${item.name}</h3> <p>precio: $${item.price}</p> <button class="btn-add products-btn" data-id="${item.id}">add to cart</button></div>`}).join('')
      html += '</div>'
      console.log(html)
      return html
    }
  }
}

const cart = {
  items: [],
  methods: {
    add: function (id) {
      if (cart.methods.isAlreadyInCart(id)) {
        alert('ese producto ya se encuentra en el carrito')
      } else {
        const item = db.methods.find(id)
        cart.items.push(item)
      }
    },
    remove: function (id) {
      cart.items = cart.items.filter(function (item) {return item.id !== id})
    },
    isAlreadyInCart: function (id) {
      return cart.items.find(function (item) {return item.id === id})
    },
    count: function () {
      return cart.items.length
    },
    render: function () {
      document.getElementById('count').innerHTML = cart.methods.count()
      let html = ''
      html += '<a href="index.html" class="products-btn">Comprar</a>'
      let suma = 0
      sumTotal = cart.items.map(function (item) { return sumPrice = item.price})
      for (let i = 0; i < sumTotal.length; i++) {
        suma = suma + sumTotal[i]
       }
      html += `<p>precio total : ${suma}</p>`
      html += '<ul class="cart-list">'
      html += cart.items.map(function (item) { return `<li class="cart-li">${item.name} : ${item.price}$</li> <button class="btn-remove products-btn" data-id="${item.id}">delete</button>`}).join('')
      html += '</ul>'
      
      return html
    }
  }
}

const productsContainer = document.getElementById('products-container')
const cartContainer = document.getElementById('cart')
const wrapper = document.getElementById('wrapper')



productsContainer.innerHTML = db.methods.render()
cartContainer.innerHTML = cart.methods.render()




wrapper.addEventListener('click', function (e) {

  if (e.target.matches('.btn-add')) {
    const id = e.target.dataset.id
    cart.methods.add(+id)
    cartContainer.innerHTML = cart.methods.render()
  }

  if (e.target.matches('.btn-remove')) {
    const id = e.target.dataset.id
    cart.methods.remove(+id)
    cartContainer.innerHTML = cart.methods.render()
  }

})