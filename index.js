let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "Camera",
        tag: "camera",
        price : 500,
        inCart: 0
    },

    {
        name: 'Iphone',
        tag: 'iphone',
        price : 400,
        inCart: 0
    },
    
    {
        name: 'Ipad',
        tag: 'ipad',
        price : 800,
        inCart: 0
    },

    {
        name: 'Ring Light',
        tag: 'ringLight',
        price : 700,
        inCart: 0
    },

    {
        name: 'Samung Galaxy',
        tag: 'Samsung',
        price : 600,
        inCart: 0
    },

    {
        name: 'Notebook',
        tag:  'notebook',
        price : 900,
        inCart: 0
    }
];

/* Para contar quantas vezes o item foi clicado para ser adicionado no carrinho (todos os items para compra),
 também serve para ver qual item foi adicionado para fazer a conta do custo total*/
 
for (let i=0 ; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
       cartNumbers(products[i]);
       totalCost(products[i]);
    })
}

// Recarrega a página porque se tiver algum valor no productNumbers ele vai deixar marcado o valor no carrinho.
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Serve para conseguir adicionar os carts e não ficar uma coisa só (selecionando cada produto)
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart span').textContent = productNumbers +1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}
    // Aqui serve para ver os produtos e mostrar os nomes deles , usa-se Json para ver os cartItems não só como (object,object) ou seja, mostrar conteudo
    function setItems(product){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        if(cartItems != null){
            if(cartItems[product.tag] == undefined){
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
            }
            cartItems[product.tag].inCart += 1;
        }else{
            product.inCart = 1;
            cartItems = {
               [product.tag]: product
           }
   
        }

        localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
    }
    // Serve para calcular o custo total somando todos os produtos adicionados no carrinho.

    function totalCost(product){
        let cartCost = localStorage.getItem('totalCost');
        if(cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        }else{
            localStorage.setItem("totalCost", product.price);
        }
    }
    // Mostrar os itens na página do Carrinho de Compras
    // `` Serve para colocar elementos em html

    function displayCart() {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".products");
        let cartCost = localStorage.getItem('totalCost');
        let removeProductIcon = document.querySelectorAll("remove");
        if( cartItems && productContainer );
            productContainer.innerHTML ='';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML +=`
                <div class="product">
                    <ion-icon name="close-circle" class="remove"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class"price">R$${item.price},00</div>
                <div class="quantity">
                <ion-icon class="deacrease" name="arrow-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-forward-outline"></ion-icon>
                </div>
                <div class="total">
                    R$${item.inCart * item.price},00
                </div>
                `;
            });

            productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTittle">
                    Total da Compra:
                </h4>
                <h4 class="baketTotal">
                    R$${cartCost},00
                </h4>
            `;    
            for (var i = 0; i < removeProductIcon; i++){
                removeProductIcon[i].addEventListener("click", function(){
                    console.log(clicou);
                });
            }      
    }       

   
    // Isso fica embaixo para continuar depois que recarrega a página.
    onLoadCartNumbers();
    displayCart();