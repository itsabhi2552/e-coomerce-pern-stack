let starting_from = 0;
let no_of_products = 5;

const main = document.getElementById("main");
const load_more = document.getElementById('load-more');

function createCard() {
    let card = document.createElement("div");
    card.setAttribute("class", "card m-3 p-2");
    card.setAttribute("style", "background-color: rgba(0, 0, 0, 0.025);");
    return card;
}

function createImg(path) {
    let img = document.createElement("img");
    img.setAttribute("src", path);
    img.setAttribute("alt", "Avtar");
    img.setAttribute("style", "border: 1px solid rgba(0, 0, 0, 0.1);");
    img.style.width = "100%";
    img.style.height = "150px";
    return img;
}

function createCardDetails(name, price) {
    let card_detail = document.createElement("div");
    card_detail.setAttribute("class", "container m-0 p-0 mt-2");
    card_detail.innerHTML = "<h4>" + name + "</h4>" + "<p> Prices : " + price + "$" + "</p>";
    return card_detail;
}

function add_to_cart(id) {
    const request = new XMLHttpRequest();
    request.open('POST', '/addToCart');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ id }));

    request.addEventListener('load', () => {
        let btn = document.getElementById(id);
        addedToCartAttribute(btn);
    });
}

function remove_from_cart(id) {
    const request = new XMLHttpRequest();
    request.open('POST', '/removeFromCart');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ id }));

    request.addEventListener('load', () => {
        let btn = document.getElementById(id);
        addToCartAttribute(btn);
    });
}

function addToCartAttribute(btn) {
    btn.setAttribute("class", "btn btn-primary mt-3");
    btn.innerText = "Add to Cart";
}

function addedToCartAttribute(btn) {
    btn.setAttribute("class", "btn btn-warning mt-3");
    btn.innerText = "Added to Cart";
}

function createBtn(id, myCart) {
    let btn = document.createElement("div");
    btn.setAttribute("id", id);

    if (myCart) {
        addedToCartAttribute(btn);
    } else {
        addToCartAttribute(btn);
    }

    btn.addEventListener('click', () => {
        if (btn.innerText === "Add to Cart") {
            add_to_cart(parseInt(btn.id));
        } else {
            remove_from_cart(parseInt(btn.id));
        }
    });

    return btn;
}

function createPopup() {
    let popup = document.createElement("div");
    popup.setAttribute("class", "btn btn-info popup");
    popup.setAttribute("flag", "false");
    popup.innerText = "Details";
    popup.addEventListener("click", () => {
        const allPopup = document.getElementsByClassName('popup');
        for (let i = 0; i < allPopup.length; i++) {
            allPopup[i].lastChild.classList.remove('show');
            allPopup[i].setAttribute("flag", "true");
        }
        popup.lastChild.classList.toggle("show");
    });
    return popup;
}

function createSpanPopup(description) {
    let span_popup = document.createElement("span");
    span_popup.setAttribute("class", "popuptext")
    span_popup.innerText = description;
    return span_popup;
}

function creatingCard(id, name, path, price, description, myCart) {
    let card = createCard();
    let img = createImg(path);
    let card_detail = createCardDetails(name, price);
    let addBtn = createBtn(id, myCart);
    let popup = createPopup();
    let span_popup = createSpanPopup(description);

    popup.appendChild(span_popup);

    card.appendChild(img);
    card.appendChild(card_detail);
    card.appendChild(popup);
    card.appendChild(addBtn);

    main.appendChild(card);
}

function showProducts(data) {
    for (let i = 0; i < data.length; i++) {
        creatingCard(data[i].id, data[i].name, data[i].image, data[i].price, data[i].description, data[i].myCart);
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

load_more.addEventListener('click', () => {
    starting_from += no_of_products;
    getProducts((data) => {
        showProducts(data);
        if (data.length !== no_of_products) {
            load_more.remove();
        }
    });
});

getProducts((data) => {
    showProducts(data);
});