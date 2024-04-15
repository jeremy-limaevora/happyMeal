function createCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card mb-3 card-custom';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Création de l'icône d'étoile
    const starIcon = document.createElement('i');
    starIcon.className = 'fas fa-star'; // Classe pour l'icône d'étoile de FontAwesome
    starIcon.style.marginRight = '5px'; // Ajoutez un peu d'espace à droite de l'icône

    // Ajout de l'icône d'étoile au corps de la carte
    cardBody.appendChild(starIcon);

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = recipe.nom;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `${recipe.categorie}, Temps de préparation: ${recipe.temps_preparation}`;

    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'btn btn-primary view-recipe-btn'; // Ajoutez la classe ici
    btn.textContent = 'Voir Recette';
    btn.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        showRecipeDetails(recipe);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(btn);

    // Ajouter un bouton "Ajouter aux favoris"
    const addToFavoritesBtn = document.createElement('button');
    addToFavoritesBtn.textContent = 'Ajouter aux favoris';
    addToFavoritesBtn.addEventListener('click', () => {
        addToFavorites(recipe);
        alert('Recette ajoutée aux favoris');
    });
    cardBody.appendChild(addToFavoritesBtn);

    card.appendChild(cardBody);

    return card;
}


// Fonction pour ajouter les cartes à la page
function addCards() {
    fetch('data.json') // Assurez-vous que le chemin vers votre fichier JSON est correct
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.container'); // Assurez-vous que le sélecteur correspond à l'élément de votre page où vous souhaitez ajouter les cartes
            data.recettes.forEach(recipe => {
                const card = createCard(recipe);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des recettes:', error));
}
function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipeModal');
    const span = document.getElementsByClassName('close')[0];
    const title = document.getElementById('recipeTitle');
    const ingredientsList = document.getElementById('ingredientsList');
    const stepsList = document.getElementById('stepsList');

    title.textContent = recipe.nom;
    ingredientsList.innerHTML = '';
    stepsList.innerHTML = '';

    recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('p');
        ingredientItem.textContent = `${ingredient.nom}: ${ingredient.quantite}`;
        ingredientsList.appendChild(ingredientItem);
    });

    recipe.etapes.forEach((step, index) => {
        const stepItem = document.createElement('p');
        stepItem.textContent = `Étape ${index + 1}: ${step}`;
        stepsList.appendChild(stepItem);
    });

    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
// Initialiser les favoris
function initFavorites() {
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
}

// Ajouter une recette aux favoris
function addToFavorites(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Récupérer les favoris
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
}

// Vider les favoris
function clearFavorites() {
    localStorage.setItem('favorites', JSON.stringify([]));
}
function displayFavorites() {
    const favorites = getFavorites();
    const favoritesContainer = document.getElementById('favoritesContainer'); // Assurez-vous d'avoir un élément avec cet ID dans votre HTML
    favoritesContainer.innerHTML = '';

    favorites.forEach(recipe => {
        const recipeItem = document.createElement('p');
        recipeItem.textContent = recipe.nom;
        favoritesContainer.appendChild(recipeItem);
    });
}
// Appeler la fonction pour ajouter les cartes
addCards();
