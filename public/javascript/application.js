"use strict";
/* 
	La fonction autoexecutante reçoit en paramètre l'espace de nom
	M = MONAPP
*/
var MONAPP = MONAPP || {};
(function(M){
	window.addEventListener('load',  function(){

	var elmConteneur = $$('.conteneur');

	var laScene = new M.Scene({
		nbPiece : 100,
		id : 'zoneIcon'
	});

	var figure = []
	
	var gridConteneur = $('#grilleTaille');
	
	/* Créer les figures aléatoirement */
	for (var noFigure = 0; noFigure < laScene.nbPiece; noFigure++)
	{
		var elmFigure = laScene.creationFigure(noFigure)
		figure.push({id:noFigure, data:elmFigure})
	}
	
	M.Figure = figure
	
	M.taille = 3
	
	M.elPlaces = 0
	
	M.jeuDemarre = false
	
	M.jeuGagne = false
		
	/* Fonction à appliquer avec un délais si les cartes ne correspondent pas */
	M.mauvaiseCarte = function(liste){
		for(var i = 0; i < liste.length; i++){
			console.log("mauvaise carte");
			liste[i].classList.add('flip');
			liste[i].classList.remove('current');
		}
	}
	
	M.tournerCarte = function(e){
		/* Vérifier si le jeu est démarré */
		if(M.jeuDemarre) {
			
			/* Faire tourner la carte */
			e.currentTarget.classList.toggle('flip');
			
			/* Noter la carte comme étant sélectionnée */
			e.currentTarget.classList.add('current');
			
			/* Faire un tableau des cartes sélectionnées */
			var currentCards = $$('.current');
			
			/* Tester si 2 cartes sont sélectionnées */
			if(currentCards.length >= 2){
				var classes = [currentCards[0].childNodes[0].childNodes[0].childNodes[0], currentCards[1].childNodes[0].childNodes[0].childNodes[0]];
				/* Comparer les 2 cartes pour voir si elles sont identiques */
				if(classes[0].classList.toString() == classes[1].classList.toString()){
					/* Enlever la fonction permettant de tourner la carte */
					for(var i = 0; i < currentCards.length; i++){
						currentCards[i].classList.add('found');
						currentCards[i].classList.remove('current');
						currentCards[i].removeEventListener("click", M.tournerCarte);
					}
				}
				else{
				/* 	Effectuer l'action pour une mauvaise carte sélectionnées
						après 2 secondes */
					setTimeout(function(){
						M.mauvaiseCarte(currentCards)
					},
					2000);
				}
			}
			
			/* Compter les cartes trouvées */
			var toutesLesCartesTrouvees = $$('.found');

			/* Vérifier si le jeu a été gagné */
			if(toutesLesCartesTrouvees.length >=  M.taille*M.taille-1){
				M.jeuGagne = true;
				var temps = document.getElementById('compteur').innerHTML;
				React.unmountComponentAtNode(document.getElementById('compteur'));
				document.getElementById('compteur').innerHTML = temps+", bravo, vous avez gagné! Choisissez une taille dans le menu déroulant pour commencer une nouvelle partie.";
				
				/* Supprimer les anciens composants */
				React.unmountComponentAtNode(document.getElementById('zoneGrille'));
				M.jeuGagne = false;	
				/* Envoyer une requête POST au serveur */
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "localhost:3000", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("name=Henry&score="+temps);
			}
		}
	}
	
	// Gérer les écouteurs d'évènement
	gridConteneur.addEventListener('click', function(e) {
		var grilleEl = $$('.dropzone .grid');
		for(var i = 0; i < grilleEl.length; i++){
			grilleEl[i].innerHTML = '';
		}
		M.taille = gridConteneur.options[gridConteneur.selectedIndex].value;
		M.elPlaces = 0
		M.createGrid(M.taille);
		M.deleteEventListeners();
		M.createEventListeners(M.taille);
	} )

}) // fin du window load

/* 
	l'appel de la fonction autoexecutante se fait avec la variable globale «espace de nom» MONAPP 
*/
}(MONAPP))
