const searchnom = async searchBox => {
  const res = await fetch('data.json');
  const data = await res.json();
  const nom = data.recettes; // Assurez-vous d'accéder au tableau correct

  let fits = nom.filter(recette => {
      const regex = new RegExp(`^${searchBox}`, 'gi');
      return recette.nom.match(regex);
  });

  if (searchBox.length === 0) {
      fits = [];
      document.getElementById('nomList').innerHTML = '';
  }

  outputHtml(fits);
};
const populateDatalist = async () => {
  const res = await fetch('data.json');
  const data = await res.json();
  const recettes = data.recettes;
  const datalist = document.getElementById('recettes-list');

  recettes.forEach(recette => {
      const option = document.createElement('option');
      option.value = `${recette.nom} (${recette.temps_preparation})`;
      datalist.appendChild(option);
  });
};

// Appeler la fonction pour peupler la liste déroulante au chargement de la page
populateDatalist();  
// show results in HTML
const outputHtml = fits => {
  if (fits.length > 0) {
     const html = fits
       .map(
         fit => `
       <div class="row">
       <div class="col s12">
         <div class="card grey darken-4 darken-1">
           <div class="card-content white-text">
             <h4 class="card-title m1">${fit.nom} (${fit.temps_preparation})</h4>
             <div class="card-action">
             <a>Temps de préparation :</a>
             <a>${fit.temps_preparation}</a>
           </div>
            </div>
          </div>
        </div>
          `
       )
       .join('');
 
     document.getElementById('nomList').innerHTML = html;
  }
 };

document
  .getElementById('search')
  .addEventListener('input', () => searchnom(search.value));
