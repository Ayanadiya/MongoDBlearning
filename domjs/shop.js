const productModal=document.getElementById('product-modal');
const closeModal=document.getElementById('close-modal');
function getproducts(){
    axios.get('http://127.0.0.1:3000/shop/getproducts')
    .then(response=> {
        console.log(response);
        const products=response.data;
        console.log('products', products);
        renderProducts(products);
    })
    .catch(err => {
        console.log(err)
    })
}

// Rendering product cards dynamically
function renderProducts(products){
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear container before adding products
    console.log(products);

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p class="description">${product.description}</p>
            <button onclick="addToCart(${product._id})">Add to Cart</button>
        `;
        const detailbtn=document.createElement('button');
        detailbtn.textContent='Details';
        detailbtn.onclick=()=> getDetails(product._id);
        productCard.appendChild(detailbtn);
        
        container.appendChild(productCard);
    });
}

function getDetails(prodId) {
    axios.get(`http://127.0.0.1:3000/shop/getproduct/${prodId}`)
    .then(response =>{
        const product=response.data;
        console.log(product);
        document.getElementById("product-name").innerText = product.title;
        document.getElementById("product-img").src = product.imageUrl;
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-price").innerText = product.price;
        productModal.style.display = "flex";
    })
    .catch(err => {
        console.log(err);
    })
}

closeModal.addEventListener("click", () => {
    productModal.style.display = "none";
});

function addToCart(productId){
    console.log(`Product with ID ${productId} added to cart`);
}

window.addEventListener('DOMContentLoaded', () =>{
    getproducts();
})