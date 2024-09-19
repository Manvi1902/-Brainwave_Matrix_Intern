
const productContainer = document.querySelector("#productContainer");
const productCardTemplate = document.querySelector("#productCardTemplate");

export const displayProductCards=(products)=>{

    if(!products){
        return false;
    }

    products.forEach((currentElement) => {

        const {id,name,image,price,rating} = currentElement;

        const productClone = document.importNode(productCardTemplate.content, true);

        productClone.querySelector(".product-card-items").setAttribute("id", `prod${id}`);

        productClone.querySelector(".product-name").textContent = name;
        productClone.querySelector(".product-image").src = image;
        productClone.querySelector(".product-image").alt = name;
        //productClone.querySelector(".star-rating").textContent = rating;
        productClone.querySelector(".product-price").textContent = price;
        productClone.querySelector(".star-rating").textContent = rating;
        
          productClone.querySelector('.product-card-items').addEventListener('click', () => {

            localStorage.setItem('selectedProduct', JSON.stringify(currentElement));
            window.location.href = 'productDetails.html';
      
        });

        productContainer.append(productClone);
    }
   

)}