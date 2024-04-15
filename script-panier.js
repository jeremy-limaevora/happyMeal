// Initialiser le panier
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Ajouter un ingrédient au panier
function addToCart(ingredient) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(ingredient);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Vider le panier
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart(); // Réafficher le panier vide
}

// Afficher le panier
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    cart.forEach(ingredient => {
        const ingredientItem = document.createElement('p');
        ingredientItem.textContent = `${ingredient.nom}: ${ingredient.quantite}`;
        cartContainer.appendChild(ingredientItem);
    });
}

// Appeler la fonction pour afficher le panier au chargement de la page
document.addEventListener('DOMContentLoaded', displayCart);

<button onclick="addToCart({nom: 'Tomate', quantite: '2'})">Ajouter au panier</button>
