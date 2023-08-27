const main = document.getElementById("main");

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

function decreaseRequest(id) {
    const quantity = document.getElementById(id).childNodes[1];
    if(quantity.innerText !== '1') {
        const request = new XMLHttpRequest();
        request.open('POST', '/changeQuantity');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ productId: id, change: 'decrease' }));
    
        request.addEventListener('load', () => {
            quantity.innerText = JSON.parse(request.responseText).quantity;
        });
    }
}

function increaseRequest(id) {
    const request = new XMLHttpRequest();
    request.open('POST', '/changeQuantity');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ productId: id, change: 'increase' }));

    request.addEventListener('load', () => {
        const quantity = document.getElementById(id).childNodes[1];
        quantity.innerText = JSON.parse(request.responseText).quantity;
    });
}

function removeRequest(id) {
    const request = new XMLHttpRequest();
    request.open('POST', '/removeFromCart');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ id }));

    request.addEventListener('load', () => {
        document.getElementById(id).parentNode.remove();
    });
}

function createDecreaseBtn() {
    let btn = document.createElement('div');
    btn.setAttribute("class", "btn btn-primary mt-3");
    btn.innerText = "-";

    btn.addEventListener('click', () => {
        const id = btn.parentNode.id;
        decreaseRequest(id);
    });

    return btn;
}

function createQuantityLabel(quantity) {
    let label = document.createElement('label');
    label.setAttribute('class', 'mt-3 px-1 btn disabled');
    label.innerText = quantity;
    return label;
}

function createIncreaseBtn() {
    let btn = document.createElement('div');
    btn.setAttribute("class", "btn btn-primary mt-3");
    btn.innerText = "+";

    btn.addEventListener('click', () => {
        const id = btn.parentNode.id;
        increaseRequest(id);
    });

    return btn;
}

function createRemoveBtn() {
    let btn = document.createElement('div');
    btn.setAttribute("class", "btn btn-danger mt-3 px-2");
    btn.innerText = "Remove";

    btn.addEventListener('click', () => {
        const id = btn.parentNode.id;
        removeRequest(id);
    });

    return btn;
}

function createBtn(id, quantity) {
    let div = document.createElement("div");

    div.setAttribute("class", 'd-flex justify-content-between');
    div.setAttribute('id', id);

    let decreaseBtn = createDecreaseBtn();
    let quantityLabel = createQuantityLabel(quantity);
    let increaseBtn = createIncreaseBtn();
    let removeBtn = createRemoveBtn();

    div.appendChild(decreaseBtn);
    div.appendChild(quantityLabel);
    div.appendChild(increaseBtn);
    div.appendChild(removeBtn);

    return div;
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

function creatingCard(id, name, path, price, description, quantity) {
    let card = createCard();
    let img = createImg(path);
    let card_detail = createCardDetails(name, price);
    let addBtn = createBtn(id, quantity);
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
        creatingCard(data[i].id, data[i].name, data[i].image, data[i].price, data[i].description, data[i].cartquantity);
    }
}

function getProducts(callback) {
    const request = new XMLHttpRequest();
    request.open('GET', '/getCart');
    request.send();

    request.addEventListener('load', () => {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            callback(data);
        }
    });
}

getProducts((data) => {
    showProducts(data);
});