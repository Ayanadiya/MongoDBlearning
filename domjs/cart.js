const cartlist=document.getElementById('cart-container');
const orderbtn=document.getElementById('order');
orderbtn.addEventListener('click', placeorder);

window.addEventListener('DOMContentLoaded', () => {
    fetchcart();
})

function fetchcart(){
    axios.get(`http://127.0.0.1:3000/shop/cart`)
    .then(response => {
        const products=response.data;
        products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.productId.imageUrl}" alt="${product.productId.title}">
            <h3>${product.productId.title}</h3>
            <p class="price">$${product.productId.price}</p>
            <p class="description">${product.productId.description}</p>
            <h5>Quantity:${product.quantity}</h5>
        `;
        const deletebtn=document.createElement('button');
        deletebtn.textContent='Delete';
        deletebtn.onclick=()=> deletefromcart(product.productId._id, productCard);
        productCard.appendChild(deletebtn);
        cartlist.appendChild(productCard);
        });
    })
    .catch(err => {
        console.log(err);
    })
}

function deletefromcart(productId, product){
    axios.put(`http://127.0.0.1:3000/shop/deletefromcart/${productId}`)
    .then(response => {
        alert(response.data);
        cartlist.removeChild(product);
    })
    .catch(err => {
        console.log(err);
    })
}

function placeorder(){
    axios.post(`http://127.0.0.1:3000/shop/placeorder`)
    .then(response =>{
        alert('Orders placed');
    })
    .catch(err => {
        console.log(err);
    })
}