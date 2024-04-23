const products = [
    {
        id: 1,
        name: 'Sữa Green Fram',
        image: 'https://cdn.shopify.com/s/files/1/0761/8769/7443/files/FM100_GF_RID_1L_5_a497075b-293a-4443-88b2-d009d8c84010.png?v=1702452441&width=400&crop=center',
        price: '3,400,000',
    },

    {
        id: 2,
        name: 'Sữa SuSu(Túi)',
        image: 'https://cdn.shopify.com/s/files/1/0761/8769/7443/files/SUSUSCL_110_1_1.png?v=1699599883&width=400&crop=center',
        price: '2,500,000',
    },
    {
        id: 3,
        name: 'Sữa SuSu Chai',
        image: 'https://cdn.shopify.com/s/files/1/0761/8769/7443/files/SUSUVI_TQU_TCHU_I_3.png?v=1699597767&width=400&crop=center',
        price: '1,600,000',
    },
    {
        id: 4,
        name: 'ProBby',
        image: 'https://cdn.shopify.com/s/files/1/0761/8769/7443/files/PROBI_HAPPI_130_3.png?v=1699602747&width=400&crop=center',
        price: '470,000',
    },
];

let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productInCart));
}

//Index page
function renderProducts() {
    let data = ``;
    products.map((value) => {
        data += `
        <div class='col-3'>
          <div class='card'>
            <img src='${value.image}' class='card-img-top' alt=''>
            <div class='card-body'>
              <h5 class='card-title'>${value.name}</h5>
              <p class='card-text'>${value.price}</p>
              <button onclick='addToCart(${value.id})' class='btn btn-primary'>Add to cart</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('products').innerHTML = data;
}

function addToCart(id) {
    let checkProduct = productInCart.some((value) => value.id === id);

    if (!checkProduct) {
        let product = products.find((value) => value.id === id);
        productInCart.unshift({
            ...product,
            quantity: 1,
        });
        saveToLocalStorage();
        calculatorTotal();
    } else {
        let product = productInCart.find((value) => value.id === id);
        let getIndex = productInCart.findIndex((value) => value.id === id);
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity,
        };
        saveToLocalStorage();
    }
}

function calculatorTotal() {
    document.getElementById('total').innerHTML = productInCart.length;
}

function indexLoadPage() {
    renderProducts();
    calculatorTotal();
}

//Cart page
function renderProductsToTable() {
    let data = ``;
    productInCart.map((value, index) => {
        data += `
        <tr>
          <td>${value.name}</td>
          <td><img width='100' src='${value.image}' alt=''></td>
          <td>${value.price}</td>
          <td>
            <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
            <span class='mx-2'>${value.quantity}</span>
            <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-secondary'>-</button>
          </td>
          <td>${(value.quantity * value.price.replace(/,/g, '')).toLocaleString()}</td>
          <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>Delete</button></td>
        </tr>
      `;
    });
    document.getElementById('products-cart').innerHTML = data;
}

function plusQuantity(index) {
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity,
    };
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
}

function minusQuantity(index, quantity) {
    if (quantity > 1) {
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity,
        };
        saveToLocalStorage();
        renderProductsToTable();
        totalMoney();
    } else {
        alert('Quantity min is 1');
    }
}

function deleteProductInCart(index) {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
}

function totalMoney() {
    let total = 0;
    for (let i = 0; i < productInCart.length; i++) {
        total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
    }
    document.getElementById('total-money').innerHTML = total.toLocaleString();
}

function cartLoadPage() {
    renderProductsToTable();
    totalMoney();
}

///////////// Search Products
const inputSearch = document.getElementById('input-search'); // !
const divProducts = document.getElementById('div-search'); // !

const imgProduct = document.getElementById('img-products'); // !
const nameProduct = document.getElementById('name-product'); // !

inputSearch.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const searchText = inputSearch.value.toLowerCase();
        function checkProduct(data) {
            return data.name.toLowerCase() === searchText;
        }
        if (searchText) {
            divProducts.style.display = 'block';
            products.filter(checkProduct).map((item) => {
                document.getElementById('img-products').src = item.image; // !
                document.getElementById('name-product').innerHTML = item.name; // !
                document.getElementById('price-product').innerHTML = item.price; // !
            });
        }
    }
});
