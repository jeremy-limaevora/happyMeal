document.addEventListener("DOMContentLoaded", function() {
    const recettesContainer = document.getElementById("recettes");
    const paginationContainer = document.getElementById("pagination");
    const sidenav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    const recettesPerPage = 9;
    let currentPage = 1;
    let recettesData = [];

    function applyStyles(element, styles) {
        Object.assign(element.style, styles);
    }

    function fadeIn(element) {
        element.style.opacity = 0;
        let opacity = 0;

        const fadeInInterval = setInterval(() => {
            opacity += 0.05;
            element.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }, 50);
    }

    function displayRecettes(pageNumber, recettes) {
        recettesContainer.innerHTML = "";
        const startIndex = (pageNumber - 1) * recettesPerPage;
        const endIndex = startIndex + recettesPerPage;
        const displayedRecettes = recettes.slice(startIndex, endIndex);

        displayedRecettes.forEach((recette, index) => {
            const recetteElement = document.createElement("div");
            recetteElement.classList.add("recette");
            recetteElement.style.opacity = 0; // Commence avec une opacité de 0
            recetteElement.innerHTML = `
                <h2>${recette.nom}</h2>
                <p><strong>Catégorie:</strong> ${recette.categorie}</p>
                <p><strong>Temps de préparation:</strong> ${recette.temps_preparation}</p>
                <h3>Ingrédients:</h3>
                <ul>
                    ${recette.ingredients.map(ingredient => formatIngredient(ingredient)).join('')}
                </ul>
                <h3>Étapes:</h3>
                <ol>
                    ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                </ol>
            `;
            recettesContainer.appendChild(recetteElement);
            // Appliquer l'effet de fondu
            setTimeout(() => {
                fadeIn(recetteElement);
            }, 200 * index); // Délai pour chaque recette
        });
    }

    function formatIngredient(ingredient) {
        if (typeof ingredient === 'string') {
            return `<li>${ingredient}</li>`;
        } else {
            return `<li>${ingredient.nom}: ${ingredient.quantite}</li>`;
        }
    }

    function setupPagination(totalRecettes) {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalRecettes / recettesPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            applyStyles(button, {
                margin: "0 5px",
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#7d1c00",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold"
            });
            button.addEventListener("click", function() {
                currentPage = i;
                displayRecettes(currentPage, recettesData);
            });
            paginationContainer.appendChild(button);
        }
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            recettesData = data.recettes;
            displayRecettes(currentPage, recettesData);
            setupPagination(recettesData.length);
        })
        .catch(error => console.error("Erreur lors du chargement des données JSON:", error));

    openBtn.onclick = openNav;
    closeBtn.onclick = closeNav;

    /* Set the width of the side navigation to 250px */
    function openNav() {
        sidenav.classList.add("active");
    }

    /* Set the width of the side navigation to 0 */
    function closeNav() {
        sidenav.classList.remove("active");
    }
});
