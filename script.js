let cart = [];
let total = 0;

// GESTIONE DROPDOWN TOOLBAR 

function toggleDropdown(id) {
    document.querySelectorAll('.dropdown').forEach(drop => {
        if (drop.id !== id) drop.style.display = "none";
    });

    const target = document.getElementById(id);
    const main = document.querySelector("main");

    const isOpen = target.style.display === "block";

    if (isOpen) {
        target.style.display = "none";

        if (window.innerWidth <= 768) {
            main.style.marginTop = "";
            main.classList.remove("main-shift-dynamic");
        }
        return;
    }

    target.style.display = "block";

    if (window.innerWidth <= 768) {
        const height = target.offsetHeight;
        main.classList.add("main-shift-dynamic");
        main.style.marginTop = (height + 110) + "px";
    }

    const mobileMenu = document.getElementById("mobileMenu");
    const hamburger = document.querySelector(".hamburger");

    if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
    }
}

function closeDropdown(button) {
    const panel = button.parentElement;
    panel.style.display = "none";

    if (window.innerWidth <= 768) {
        const main = document.querySelector("main");
        main.style.marginTop = "";
        main.classList.remove("main-shift-dynamic");
    }
}

// AGGIUNTA AL CARRELLO 
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCartUI();
}

// RIMOZIONE DAL CARRELLO 
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

// AGGIORNAMENTO INTERFACCIA 
function updateCartUI() {
    const list = document.getElementById("lista-carrello");
    const count = document.getElementById("cart-count");
    const countMobile = document.getElementById("cart-count-mobile");
    const totalDisplay = document.getElementById("totale-prezzo");

    list.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <span>${item.name} - €${item.price.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        `;
        list.appendChild(li);
    });

    count.textContent = cart.length;
    if (countMobile) countMobile.textContent = cart.length;
    totalDisplay.textContent = total.toFixed(2);
}

// CONFERMA ORDINE 
function confermaOrdine() {
    const nome = document.getElementById("nome").value.trim();
    const orario = document.getElementById("orario").value;

    if (cart.length === 0) {
        alert("Il carrello è vuoto!");
        return;
    }

    if (!nome || !orario) {
        alert("Per favore, inserisci nome e orario di ritiro.");
        return;
    }

    alert(`Grazie ${nome}! Il tuo ordine di €${total.toFixed(2)} è stato ricevuto.`);

    cart = [];
    total = 0;
    updateCartUI();
    toggleDropdown('carrello');
}

// HAMBURGER MENU 
function toggleHamburger() {
    document.querySelector(".hamburger").classList.toggle("active");
    document.getElementById("mobileMenu").classList.toggle("active");
}

function closeHamburgerMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburger = document.querySelector(".hamburger");

    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
}
