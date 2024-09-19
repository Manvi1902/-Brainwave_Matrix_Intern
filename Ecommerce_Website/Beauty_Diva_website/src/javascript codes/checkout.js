import productData from "../api/productData.json";
import {getCartProducts} from "./productDetails";
import {updateCartValue} from "./productDetails";


let cartProds = getCartProducts();
let filterProducts = productData.filter((currProd)=>{
    return cartProds.some((currElem)=> currElem.id === currProd.id);
});
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

/*----------------------------Quantity-Toggle-------------------------------------*/

const incrementDecrementFun =(event,id,stock,price)=>{

    //const currElem = document.querySelector('.stock-element-box');
    const productQuantity = document.querySelector('.product-quantity');
    const productPrice = document.querySelector('.product-price');

    let quantity = 1;
    let  localStoragePrice = 0;
    let  localStorageCartData = getCartProducts();

 
    //getting data from ls
    let existingProduct = cartProds.find((currProd)=> currProd.id === id);
    
    if(existingProduct){
        quantity = existingProduct.price;
        cartProds = existingProduct.price;

    }else{
        localStoragePrice = price;
        price = price;
    }
    
    if(event.target.className === "cartIncrement"){
         if(quantity < stock){
             quantity += 1;
         }
         else if(quantity === stock){
             quantity = stock;
             localStoragePrice = price * stock;
         }
    }

    if(event.target.className === "cartDecrement"){
         if(quantity > 1){
              quantity -= 1;
         }
    }

   localStoragePrice = price * quantity; 

   let updateCart = {id, quantity, price:localStoragePrice};

   updateCart = cartProds.forEach((currProd)=>{
    return (currProd.id == id) ? updateCart : currProd;
   });
   localStorage.setItem("cartProdItemsInLS",JSON.stringify(updateCart));

 }
 





/*-------------------------------delete-button-----------------------------------*/

const deleteProdFromCart = (id) => {
    cartProds = cartProds.filter((currProd) => currProd.id != id);
    localStorage.setItem("cartProdItemsInLS",JSON.stringify(cartProds));

     let deleteProduct = document.querySelector('.cart-container');
     console.log(deleteProduct);
     if(deleteProduct){
        deleteProduct.remove();
     }
     updateCartValue(cartProds);
}

/*-----------------function for fetching quantity from local storage--------------*/

const getQuantityFromLS = (id,price) =>{

    let existingProduct = cartProds.find( (currProd) => currProd.id === id);
    let quantity = 1;

    if(existingProduct){
        quantity = existingProduct.quantity;
        price = existingProduct.price;
    }
    return {quantity,price};
}

const showCartProducts = () =>{
    filterProducts.forEach((currProd)=>{
        
        const { id, name, image, price,stock} = currProd;
        let productClone = document.importNode(templateContainer.content, true);
        
        let dataFromLS = getQuantityFromLS(id,price);

        //document.querySelector('.cart-container').setAttribute("id", `cart${id}`);
        productClone.querySelector(".product-name").textContent = name;
        productClone.querySelector(".product-image").src = image;
        productClone.querySelector(".product-image").alt = name;
        productClone.querySelector(".product-quantity").textContent = dataFromLS.quantity;
        productClone.querySelector(".product-price").textContent = dataFromLS.price;
        const stockElement = productClone.querySelector('.stock-element');
        //const cartQuantity = document.querySelector('.add-to-cart');
         
        
        //quantity toggel
        stockElement.addEventListener('click',(event)=>{
            console.log("increee")
            incrementDecrementFun(event,id,stock,price);
        });

       /* add to cart product items
       cartQuantity.addEventListener('click',(event)=>{
          addToCart(event,id,stock);
        });*/


        //delete button function
        //let deleteButton = productClone.querySelector(".delete-to-cart-btn");
        productClone.querySelector(".delete-to-cart-btn").addEventListener('click', () => deleteProdFromCart(id));  

        cartElement.appendChild(productClone);
    });
}

showCartProducts();




















/** 
document.addEventListener('DOMContentLoaded', () => {  
    // Load cart items from localStorage on page load  
    displayCartItems();  

    // Clear cart button  
    document.getElementById('clear-cart').addEventListener('click', () => {  
        localStorage.removeItem('cart');  
        displayCartItems(); // Refresh the displayed items  
    });  

    // Checkout button (you can link it to your payment system)  
    document.getElementById('checkout').addEventListener('click', () => {  
        alert('Proceeding to checkout...'); // Placeholder for checkout logic  
    });  
});  

function displayCartItems() {  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  
    const cartItemsContainer = document.getElementById('cart-items');  
    cartItemsContainer.innerHTML = ''; // Clear existing items  

    let totalPrice = 0;  

    cart.forEach((product, index) => {  
        // Calculate total price for each product  
        totalPrice += product.price * (product.quantity || 1);  

        // Create a table row for each product  
        const row = document.createElement('tr');  
        row.innerHTML = `  
            <td>${product.name}</td>  
            <td>$${product.price.toFixed(2)}</td>  
            <td>  
                <input type="number" min="1" value="${product.quantity || 1}" data-index="${index}" class="quantity-input">  
            </td>  
            <td>  
                <button onclick="updateQuantity(${index})">Update</button>  
                <button onclick="removeFromCart(${index})">Remove</button>  
            </td>  
        `;  
        cartItemsContainer.appendChild(row);  
    });  

    document.getElementById('total-amount').textContent = totalPrice.toFixed(2);  
}  

function updateQuantity(index) {  
    const cart = JSON.parse(localStorage.getItem('cart'));  
    const quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);  

    // Update the product quantity  
    if (quantityInput) {  
        const newQuantity = parseInt(quantityInput.value, 10);  
        if (newQuantity > 0) {  
            cart[index].quantity = newQuantity; // Update quantity  
            localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage  
            displayCartItems(); // Refresh the cart display  
        }  
    }  
}  

function removeFromCart(index) {  
    const cart = JSON.parse(localStorage.getItem('cart'));  
    cart.splice(index, 1); // Remove the item  
    localStorage.setItem('cart', JSON.stringify(cart)); // Save back to localStorage  
    displayCartItems(); // Refresh the cart display  
}*/