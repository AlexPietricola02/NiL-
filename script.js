/* ============================
   VARIABILI GLOBALI
============================ */

let cart = [];   // Array che contiene gli articoli nel carrello
let total = 0;   // Totale del carrello


/* ============================
   GESTIONE DROPDOWN TOOLBAR
============================ */

function toggleDropdown(id) {
    // Chiude tutti i dropdown
    document.querySelectorAll('.dropdown').forEach(drop => {
        if (drop.id !== id) drop.style.display = "none";
    });

    // Alterna il dropdown selezionato
    const target = document.getElementById(id);
    target.style.display = target.style.display === "block" ? "none" : "block";
}


/* ============================
   GESTIONE MENU CATEGORIE PIZZE
============================ */

function toggleMenu(id) {
    // Chiude tutti i menu centrali
    document.querySelectorAll('.dropdown-center').forEach(menu => {
        if (menu.id !== id) menu.style.display = "none";
    });

    // Alterna il menu selezionato
    const target = document.getElementById(id);
    target.style.display = target.style.display === "block" ? "none" : "block";
}


/* ============================
   AGGIUNTA AL CARRELLO
============================ */

function addToCart(name, price) {
    cart.push({ name, price }); // Aggiunge la pizza
    total += price;             // Aggiorna il totale
    updateCartUI();             // Aggiorna l'interfaccia
}


/* ============================
   RIMOZIONE DAL CARRELLO
============================ */

function removeFromCart(index) {
    total -= cart[index].price; // Sottrae il prezzo
    cart.splice(index, 1);      // Rimuove l'articolo
    updateCartUI();             // Aggiorna l'interfaccia
}


/* ============================
   AGGIORNAMENTO INTERFACCIA CARRELLO
============================ */

function updateCartUI() {
    const list = document.getElementById("lista-carrello");
    const count = document.getElementById("cart-count");
    const totalDisplay = document.getElementById("totale-prezzo");

    list.innerHTML = ""; // Svuota la lista

    // Ricostruisce la lista
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <span>${item.name} - €${item.price.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        `;

        list.appendChild(li);
    });

    // Aggiorna contatore e totale
    count.textContent = cart.length;
    totalDisplay.textContent = total.toFixed(2);
}


/* ============================
   CONFERMA ORDINE
============================ */

function confermaOrdine() {
    const nome = document.getElementById("nome").value.trim();
    const orario = document.getElementById("orario").value;

    // Controlli
    if (cart.length === 0) {
        alert("Il carrello è vuoto!");
        return;
    }

    if (!nome || !orario) {
        alert("Per favore, inserisci nome e orario di ritiro.");
        return;
    }

    // Messaggio di conferma
    alert(`Grazie ${nome}! Il tuo ordine di €${total.toFixed(2)} è stato ricevuto. Ti aspettiamo alle ${orario}.`);

    // Reset carrello
    cart = [];
    total = 0;

    updateCartUI();
    toggleDropdown('carrello'); // Chiude il carrello
}
