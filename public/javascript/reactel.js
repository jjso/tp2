(function(M){
	
	var Scene = React.createClass({
	  render: function() {
		return (
			<div className="cont">
				<h1>Grille des icônes proposées</h1>
				{this.props.icons.map(function(icon) {
					return(
					  <figure key={icon.id} data-id={ icon.data } className="conteneur" draggable="true">
						<div className="carte">
							<figure className="top">
								<span className="fa-lg" >
									 <i className={"fa "+icon.data} ></i>
								</span>
							</figure>
						 </div>
					  </figure>
					 )
				})}
			</div>
		);
	  }
	});
	
	/* Création de la classe compteur */
	var Timer = React.createClass({

		getInitialState: function(){
			/* Temps écoulé au départ */
		   return { elapsed: 0 };
		},

		componentDidMount: function(){
			// Fonction appelée lorsq'on initie le compteur
			this.timer = setInterval(this.tick, 50);
		},

		componentWillUnmount: function(){

			// Fonction appelée à la suppression du compteur
			clearInterval(this.timer);
		},

		tick: function(){

			// Fonction appelée à chaque fois que l'intervalle est appelée
			this.setState({elapsed: new Date() - this.props.start});
		},

		render: function() {
			
			var elapsed = Math.round(this.state.elapsed / 100);

			// This will give a number with one digit after the decimal dot (xx.x):
			var seconds = (elapsed / 10).toFixed(1);    

			// Although we return an entire <p> element, react will smartly update
			// only the changed parts, which contain the seconds variable.

			return <p>Temps écoulé: <b>{seconds}</b> secondes</p>;
		}
	});
	
	/* Création de la grille d'éléments */
	var Grille = React.createClass({
		
		getInitialState: function() {
			return {onclickfun: this.cacherPieces};
		},
	
 		/* Fonction à appeler pour cacher les pièces */
		cacherPieces: function(cartes){
							
			/* Liste des cartes */
			var cartes = $$('.jeu');
			
			if(M.jeuDemarre == false){
				/* Variable indiquant que le jeu est démarré */
				M.jeuDemarre = true;
				
				$('.cacherBouton').innerHTML = "Voir";
				this.state.onclickfun = this.voirPieces;

			/* 	Ajouter la classe flip et l'écouteur d'évènement sur 
					chacune des cartes */
				for(var i = 0; i < cartes.length; i++){
					if(!cartes[i].classList.contains('found')){
						cartes[i].classList.add('flip');
						cartes[i].addEventListener("click", M.tournerCarte);
					} 
				}
				/* Initialisation du compteur */
				ReactDOM.render(
					<Timer start={Date.now()} />,
					document.getElementById("compteur")
				);
			}
			else{
				M.jeuDemarre = false;
				$('.cacherBouton').innerHTML = "Cacher";
				for(var i = 0; i < cartes.length; i++){
					cartes[i].classList.remove('flip');
				} 
			}
		},
		render: function(){
			var largeur = 97/this.props.taille;
			var style = {
				flex: '1 0 '+largeur+'%'
			};
			var nomBouton = "Cacher";
			var grid = [];
			if(typeof(this.props.els) === "undefined") {
				for(var i = 0; i < this.props.taille*this.props.taille; i++){
					grid.push(<div className="grid" style={style} key={i} ></div>);
				}
			}
			else{
				for(var j = 0; j < this.props.els.length; j++){
					grid.push(
					<div className="grid" style={style} key={j} >
					  <figure data-id={ this.props.els[j] } className="conteneur" style={{ width: '156px', height: '156px' }}>
						<div className="carte jeu" >
							<figure className="top">
								<span className="fa-5x" >
									 <i className={"fa fa2 "+this.props.els[j]} ></i>
								</span>
							</figure>
						 </div>
					  </figure>
					</div>
					)
				}
			};					
			return(
				<div className="grille">
					{grid}
					<button type="submit" className="cacherBouton" onClick={ this.state.onclickfun } >{ nomBouton }</button>
				</div>
			)
		}
	});
	
	var SubmitButton = React.createClass({
		/* Fonction appelée permettant de débuter le jeu en cliquant */
		debuterJeu: function(e){
			if(M.els.length >= Math.floor(M.taille*M.taille/3)){
				var grilleEl = $$('.dropzone .grid');
				for(var i = 0; i < grilleEl.length; i++){
					grilleEl[i].innerHTML = '';
				}
				if(M.els.length < M.taille*M.taille){
					/* Enregistrer la longueur du tableau d'éléments pour éviter une boucle infinie */
					var length =  M.els.length;
					/* Dupliquer tous les éléments */
 					for(var m = 0; m < length; m++ ){
						M.els.push(M.els[m]);
					} 
					/* Enregistrer la nouvelle longueur du tableau d'éléments */
					length = M.els.length;
					/* Créer aléatoirement de nouveaux éléments et les ajouter au tableau */
					for(var j = length; j < M.taille*M.taille; j++){
						M.els.sort( function() { return 0.5 - Math.random() } );
						M.els.push(M.els[0]);
					}
				}
				/* Créer la grille à partir du tableau d'éléments */
				M.createGrid(M.taille, M.els);
			}
			else{
				console.log("jeu pas commencé pour une raison X.")
			}
		},
		render: function(){
			return(
				 <button type="submit" onClick={ this.debuterJeu }>Débuter le jeu</button>
			)
		}
	})
	
	/* Rendre les éléments ReactJS */

	ReactDOM.render(
	  <Scene icons={ M.Figure } />,
	  document.getElementById("zoneIcon")
	);
	
	ReactDOM.render(
		<SubmitButton />,
		document.getElementById("commencer")
	);

	M.createGrid = function(taille, els){
		ReactDOM.render(
		  <Grille taille={ taille } els = { els } />,
		  document.getElementById("zoneGrille")
		);
	}


}(MONAPP))