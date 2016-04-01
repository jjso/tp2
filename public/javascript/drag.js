(function(M){
	var dragged;
	var zoneDrop;
	
	var opacity = function ( event ){
		// Sauvegarde une référence sur l'élément que l'on commence à glisser 
		dragged = event.target;
		// l'élément qui subit l'évènement «dragstart» change de style
		event.target.style.opacity = 0.5;
	}
	
	var endOpacity = function( event ) {
		  // La transparence redevient normal quand on arrête de glisser
		  event.target.style.opacity = "";
	  };
	
	var prevDefault = function( event ) {
			  // empèche le comportement par défaut pour autoriser le dépot «drop»
			  /* event.target.classList.add('glisse'); */
			  event.preventDefault();
		  };
		  
	var changeZoneColor = function( event ) {
		  // change le style de la cible «droppable» quand l'élément glissable «draggable» se retrouve au dessus de la cible «dragenter»
		  if ( zoneDrop.indexOf(event.target) > -1) {
			  event.target.style.background = "#aabbcc";
		  }
	  }
	  
	var rechangeZoneColor = function( event ) {
		  // change le style de la cible «droppable» quand l'élément glissable «draggable» est glissé à l'extérieur de la cible «droppable»
		  if ( zoneDrop.indexOf(event.target) > -1 ) {
			event.target.style.background = "transparent";
			event.target.classList.remove('glisse')
		  }
	  }
	  
	var dropF = function( event ) {
		  // empèche le comportement par défaut
		  event.preventDefault();
		  // déplace l'élément «draggable» sur la cible «drppable»
		  if ( zoneDrop.indexOf(event.target) > -1 && event.target.childNodes.length < 1 && ( M.elPlaces < Math.floor(M.taille*M.taille/3)) ) {
			  /* l'élément «draggable» dont on a sauvé une référence est retiré de son parent */
			  dragged.parentNode.removeChild( dragged );
			  /* l'élment draggable est ajouté dans l'élément «droppable» */
			  event.target.appendChild( dragged );
			  dragged.style.width = "156px";
			  dragged.style.height = "156px";
			  dragged.setAttribute('draggable', false);
			  var elmSpan = dragged.querySelector("span");
			  elmSpan.classList.remove('fa-lg');
			  elmSpan.classList.add('fa-5x');
			  dragged.querySelector("i").classList.add('fa2');
			  M.els.push(dragged.getAttribute('data-id'));
			  // Incrémenter le nombre d'éléments placés
			  M.elPlaces++;
		  }
	  };

	M.createEventListeners = function(){
	  zoneDrop = $$('.dropzone .grid');
	  elDrag = $$('figure.conteneur');
	  M.els = [];
	  for (var j = 0; j < elDrag.length; j++) {
		 elDrag[j].addEventListener("dragstart", opacity, false);
		 elDrag[j].addEventListener("dragend", endOpacity, false);
		  /* events fired on the drop targets */
	  }
	  
	  for (var v = 0; v < zoneDrop.length; v++){
		 zoneDrop[v].addEventListener("dragover", prevDefault, false);
		 zoneDrop[v].addEventListener("dragenter", changeZoneColor, false);
		 zoneDrop[v].addEventListener("dragleave", rechangeZoneColor, false);
		 zoneDrop[v].addEventListener("drop", dropF, false); 
	  }
	}
	
	M.deleteEventListeners = function(){
	  zoneDrop = $$('.dropzone .grid');
	  elDrag = $$('figure.conteneur');
	  M.els = [];
	  for (var j = 0; j < elDrag.length; j++) {
		 elDrag[j].removeEventListener("dragstart", opacity, false);
		 elDrag[j].removeEventListener("dragend", endOpacity, false);
		  /* events fired on the drop targets */
	  }
	  
	  for (var v = 0; v < zoneDrop.length; v++){
		 zoneDrop[v].removeEventListener("dragover", prevDefault, false);
		 zoneDrop[v].removeEventListener("dragenter", changeZoneColor, false);
		 zoneDrop[v].removeEventListener("dragleave", rechangeZoneColor, false);
		 zoneDrop[v].removeEventListener("drop", dropF, false); 
	  }
	}
	
	
 }(MONAPP))
