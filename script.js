// Fonction pour créer une carte
function createCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card mb-3 card-custom';

    const img = document.createElement('img');
    img.src = recipe.imageUrl; // Assurez-vous que l'URL de l'image est correcte
    img.className = 'card-img-top card-img-custom';
    img.alt = recipe.nom;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = recipe.nom;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `${recipe.categorie}, Temps de préparation: ${recipe.temps_preparation}`;

    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'btn btn-primary';
    btn.textContent = 'Voir Recette';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(btn);

    card.appendChild(img);
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

// Appeler la fonction pour ajouter les cartes
addCards();