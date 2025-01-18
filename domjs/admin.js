const productList = document.getElementById('productList');
let editingProductId=null;
function getproducts(){
    axios.get('http://127.0.0.1:3000/shop/getproducts')
    .then(response => {
        const products=response.data
        renderProductList(products);
    })
    .catch(err => {
        console.log(err)
    })
}

 // Rendering product list dynamically
 function renderProductList(products) {
     productList.innerHTML = ''; // Clear previous content

     products.forEach(product => {
         const productItem = document.createElement('div');
         productItem.classList.add('product-item');

         productItem.innerHTML = `
             <div>
                 <strong>${product.title}</strong><br>
                 <span>$${product.price}</span><br>
                 <span>${product.description}</span>
             </div>
         `;
        const buttondiv=document.createElement('div');
        const editbtn=document.createElement('button');
        editbtn.textContent='Edit';
        editbtn.onclick=()=> editProduct(product._id, productItem);
        buttondiv.appendChild(editbtn);
        const deletebtn=document.createElement('button');
        deletebtn.textContent='Delete';
        deletebtn.onclick=()=> deleteProduct(product._id);
        buttondiv.appendChild(deletebtn);
        productItem.appendChild(buttondiv);
         productList.appendChild(productItem);
     });
 }

 // Handle product form submission
 document.getElementById('addProductForm').addEventListener('submit', async function(event) {
     event.preventDefault();

     const newProduct = {
         title: document.getElementById('productTitle').value,
         price: parseFloat(document.getElementById('productPrice').value),
         description: document.getElementById('productDescription').value,
         image: document.getElementById('productImage').value,
     };
     if(editingProductId)
     {
        axios.put(`http://127.0.0.1:3000/admin/editproduct/${editingProductId}`, newProduct)
        .then(res =>{
            alert('Product updated');
            toggleProductForm(); // Hide form after adding
            getproducts();
            editingProductId=null;
        })
        .catch(err=>{
            console.log(err);
        })
     }
     else
     {
        axios.post('http://127.0.0.1:3000/admin/addproduct', newProduct)
        .then(result =>{
            alert('Product added');
            toggleProductForm(); // Hide form after adding
            getproducts(); // Refresh the product list
        })
        .catch(err=>{
            console.log(err);
        })
     }
});

 // Edit product function (placeholder, to be extended)
 function editProduct(productId, productItem) {
     // Find the product to be edited
     axios.get(`http://127.0.0.1:3000/shop/getproduct/${productId}`)
     .then(response => {
        const product=response.data;
        console.log(product);
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.imageUrl;
        editingProductId = productId; // Set the product ID to indicate editing
        document.getElementById('formTitle').textContent = 'Edit Product';
        document.getElementById('submitbtn').textContent='Save Changes';
        toggleProductForm(); // Show the form
        productList.removeChild(productItem);
     })
     .catch(err =>{
        console.log(err);
     })  
 }

 // Delete product function
 function deleteProduct(productId) {
     axios.put(`http://127.0.0.1:3000/admin/deleteproduct/${productId}`)
     .then(response =>{
        alert("Product removed")
        getproducts();
     })
     .catch(err=>{
        console.log(err);
     })
 }

 // Toggle product form visibility
 function toggleProductForm() {
     const form = document.getElementById('productForm');
     form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
 }

 // Fetch products when the page loads
 window.addEventListener('DOMContentLoaded', () =>{
    getproducts();
 })