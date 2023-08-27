let starting_from = 0;
let no_of_products = 5;

const template = document.getElementById('template');
const main = document.getElementById('main');
const next = document.getElementById('next');

function createProduct(id, name, path, price, quantity, description) {
    const temp = template.content.cloneNode(true);

    temp.getElementById('id').id = id;
    temp.getElementById('hidden').value = id;
    temp.getElementById('hidden').id = 'hiddenBtn-' + id;
    temp.getElementById('deleteBtn').setAttribute('onclick', `deleteBtn(${id})`);
    temp.getElementById('deleteBtn').id = 'deleteBtn-' + id;
    temp.getElementById('img').src = path;
    temp.getElementById('name').value = name;
    temp.getElementById('price').value = price;
    temp.getElementById('quantity').value = quantity;
    temp.getElementById('description').value = description;

    main.appendChild(temp);
}

function removeAll() {
    while (main.firstChild) {
        main.firstChild.remove();
    }
}

function showProducts(data) {
    removeAll();
    for (let i = 0; i < data.length; i++) {
        createProduct(data[i].id, data[i].name, data[i].image, data[i].price, data[i].quantity, data[i].description);
    }
}

function getProducts(callback) {
    const request = new XMLHttpRequest();
    request.open('POST', '/products');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ no_of_products, starting_from }));

    request.addEventListener('load', () => {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText).data;
            callback(data);
        }
    });
}

next.addEventListener('click', () => {
    starting_from += no_of_products;
    getProducts((data) => {
        showProducts(data);
        if (data.length !== no_of_products) {
            next.remove();
        }
    });
});

function deleteBtn(id) {
    const request = new XMLHttpRequest();
    request.open('POST', '/deactivateProduct');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ id }));

    request.addEventListener('load', () => {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            if (data.success) {
                getProducts((data) => {
                    showProducts(data);
                });
            }
        }
    });
}

getProducts((data) => {
    showProducts(data);
});