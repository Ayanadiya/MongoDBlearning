const orderlist=document.getElementById('order-container');

window.addEventListener('DOMContentLoaded', () =>{
    fetchorders();
})

function fetchorders(){
    axios.get(`http://127.0.0.1:3000/shop/orders`)
    .then(response => {
        const orders=response.data;
        orders.forEach(order => {
            createorder(order);
        });
    })
    .catch(err => {
        console.log(err);
    })
}

function createorder(order){
    const orderdiv=document.createElement('div');
    orderdiv.classList.add('order');
    const orderId=document.createElement('h4')
    orderId.textContent=`Order ID-${order._id}`
    orderdiv.appendChild(orderId);
    const orderitems=document.createElement('ul');
    order.products.forEach(item=>{
        console.log(item);
        const product=document.createElement('li');
        product.classList.add('item');
        product.textContent=`${item.product.title} - ${item.quantity}`;
        orderitems.appendChild(product);
    })
    orderdiv.appendChild(orderitems);
    orderlist.appendChild(orderdiv);
}