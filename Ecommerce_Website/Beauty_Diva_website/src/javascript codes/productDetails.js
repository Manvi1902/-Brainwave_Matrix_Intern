
//updationg cart value of navbar stp2
const  cartValue = document.querySelector('.cart-value');

export const updateCartValue = (cartProducts)=>{
    cartValue.innerHTML = `${cartProducts.length}`;
}

//getting products from local storage stp1
export const getCartProducts = ()=>{
    let cartProducts = localStorage.getItem('cartProdItemsInLS');
    if(!cartProducts){
        return [];
    }
    cartProducts = JSON.parse(cartProducts);
    updateCartValue(cartProducts);
    return cartProducts;
}

// Function to toggle product quantity  
function productQuantityToggle(event,id,stock){
   const productQuantity= document.querySelector('.product-quantity');
   let quantity = parseInt(productQuantity.getAttribute('data-quantity')) || 1;

   if(event.target.className === "cartIncrement"){
        if(quantity < stock){
            quantity += 1;
        }
        else if(quantity === stock){
            quantity = stock;
        }
   }
   if(event.target.className === "cartDecrement"){
        if(quantity > 1){
             quantity -= 1;
        }
   }
   productQuantity.innerText = quantity;
   productQuantity.setAttribute('data-quantity',quantity);
   console.log(quantity);
   return quantity;
   
}


// Function to add product to cart  
function addToCart(event,id,stock){

    let addProdCartDataLS = getCartProducts();
    let quantity =  document.querySelector('.product-quantity').textContent; 
 
    let price =  document.querySelector(".product-price").textContent;
    price = price.replace('Rs.',"");

    let existingProduct = addProdCartDataLS.find(
        (currentProd) => currentProd.id === id
    );

    if(existingProduct && quantity > 1){
       quantity = Number(existingProduct.quantity) + Number(quantity);
       price = Number(price*quantity);

       let updateCart = {id, quantity, price};
       updateCart = addProdCartDataLS.map((currProd)=>{
        return (currProd.id == id) ? updateCart : currProd;
       })
       localStorage.setItem("cartProdItemsInLS",JSON.stringify(updateCart));
    }

    if(existingProduct){  
        alert("alredy exits");
        return false;
    };
    price = Number(price*quantity);
    quantity = Number(quantity);
    console.log(quantity,price);
    addProdCartDataLS.push({id, quantity, price});
    localStorage.setItem("cartProdItemsInLS",JSON.stringify(addProdCartDataLS));
    updateCartValue(addProdCartDataLS);
}


document.addEventListener('DOMContentLoaded', () => {
    
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        const { id, name, image, description, price, stock } = product;
        console.log(product);

        document.querySelector('.product-details').setAttribute("id", `product${id}`);
        document.getElementById('product-name').textContent = name;
        document.querySelector('.product-img img').src = image;
        document.getElementById('product-description').textContent = description;
        document.querySelector('.product-price').textContent = price;
        document.querySelector('.product-stock').textContent = stock;

        
        const stockElement = document.querySelector('.stock-element-box');
        const cartQuantity = document.querySelector('.add-to-cart');
         
       
        //quantity toggel
         stockElement.addEventListener('click',(event)=>{
              productQuantityToggle(event,id,stock);
         });

         // add to cart product items
         cartQuantity.addEventListener('click',(event)=>{
            addToCart(event,id,stock);

       })
    } 
    getCartProducts();  
});





export default getCartProducts;