(function($) {

	let nav = $('#nav'),
		menu = $('.menu'),
		menuLinks = menu.find('a'),
		aboutID = $('#about'),
		aboutClass = $('.about');

	// ak mam zaskrtunuty input checkbox
	$('#toggle').on('click', function() {
		if ( $('#toggle').is(":checked") ) {
			$('.bg').fadeOut();
		} else if ( !$('#toggle').is(":checked") ) {
			$('.bg').fadeIn();
		} else {
			return;
		}
	});

	let home = $('#home');
	// po kliknuti na tlacitko 'ENTER' s id="home" vykonaj:
	home.on('click', function(event) {
		event.preventDefault();
		// skryjem tlacitko 'ENTER' s id="home"
		home.css({ transform: 'scale(0)',
				   transition: 'all .33s ease',
				}).delay(300).hide(0);
		// zviditelnim nevigaciu
		nav.css({ opacity: '1',
				  transition: 'all .33s ease',
				});
		// vsetky 'li' elemnty su bez class="selected"
		menu.find('li').siblings('li').removeClass('selected');
	});

	let bg = $('.bg');
	// po kliknuti na tlacitko 'X' s class="bg" vykonaj:
	bg.on('click', function(event){
		event.preventDefault();
		// skryjem nacitane aboutClass
		$('.about').hide();
		// skryjem navigaciu
		nav.css({ opacity: '0',
				  transition: 'all .33s ease',
				});
		// zviditelnim tlacitko 'ENTER' s id="home"
		home.fadeIn(200)
			.css({ transform: 'scale(1)',
				   transition: 'all .33s ease',
				});
	});

	

	// po kliknuti na link v menu chceme nacitat prvu sekciu
	menuLinks.on('click', function(event) {

		// aby sme neodskocili na adresu linku
		event.preventDefault();

		
		var a = $(this), // link na ktory sme klikli
			li = a.parent(); // jeho rodic, budeme ho nastavovat ako "selected"


		// koncime, ak uz li je oznaceny, cize ak sa snazime nacitat stranku, ktora je prave zobrazena
		// ALEBO ak je loading viditelny, cize nejaka nacitavanie prave prebieha
		// lebo inac keby 20x rychlo kliknem, tak spustim 20 ajax requestov a to nechcem.. chcel len 1
		// cize vzdy ked vidim loading ikonku, nechcem pokracovat dalej vo funkcii, lebo uz jeden ajax bezi
		if ( li.is('.selected')  ) {
			return;
		}


		// sem sa dostaneme iba ak sa snazime zobrazit inu podstranku
		var href = a.attr('href'), // url adresa, z ktore budeme nacitavat novy obsah
			currentAbout = aboutID.find( '.about' ); // aboutClass, ktory je prave zobrazeny


		// oznacime aktualne kliknute li v menu ako selected
		// a vsetky ostatne li oznacime ako ne-selected.. cize im vezmeme selected
		li.addClass('selected')
		  .siblings('li').removeClass('selected');



		// kazdy aboutClass ma idcko podobne ako nazov html suboru
		// napriklad galeria z podstranky web.html ma id="web"
		// cize ak z nazvu linku odstranime poslednych 5 znakov (.html (-5) || .php (-4)) a na zaciatok pridame mriezku
		// dostaneme #web, co mozeme pouzit ako id selektor elementu
		let id = '#' + href.slice(0, -4); 

		let goaway = currentAbout.css({ 
										transform: 'scale(0.1)',
										transition: 'all 0.33s ease',
										'transform-origin': 'bottom',
										opacity: '0',
										}).delay(100).hide();
		// ak na stranke uz existuje element s tymto idckom, nechame ho zobrazit
		// v opacnom pripade ho musime ziskat cez ajax
		if ( aboutID.find(id).length ) {
			
			goaway;
			$(id).delay(300)
				 .show()
				 .css({
					 transform: 'scale(0.95)',
					 transition: 'all 0.33s ease',
					 'transform-origin': 'bottom',
					 opacity: '1',
				 });
			

		}
		else { // ajax  sa teda bude volat iba vtedy, ked element neexistuje na stranke
			loadNewAbout( href );
		}

		/**
		 * v .done() funkcii namiesto nahradenia obrazkov pridame novy set obrazkov 
		 */
		function loadNewAbout( href ) {

			// nechame zmiznut aktualny aboutClass a zobrazime loading ikonku
			goaway;

			// potrebujme od prehliadaca, aby sa pozrel na dalsiu stranku
			// a teda spravime AJAX request
			var request = $.ajax({
				url: href
			});

			// .done funkcia sa zavola, iba ak sme uspesne ziskali data z novej stranky 
			// v data bude ulozeny kompletny html/php kod stranky z adresy, na ktoru sme klikli
			request.done(function(data) {

				// v html/php kode, ktory sme ziskali, najdeme novy set about
				var newAbout = $(data).find( '.about' );

				// pridame novy aboutClass do stranky
				// a nechame ho fejdnut in
				newAbout
					.appendTo( aboutID )
					.delay(300)
					.show()
					.css({
					transform: 'scale(0.95)',
					transition: 'all 0.33s ease',
					'transform-origin': 'bottom',
					opacity: '1',
				 });

				// skryjeme aktualnu aboutClass
				goaway;

			});

			// .fail funkcia bude zavolana, iba ak bol request neuspesny, nepodarilo sa nam ziskat data, 
			request.fail(function() {

				// toto by malo byt riesene inak, alert okna su otravne
				// ale pre ucebne ucely postaci
				alert('nepodarilo sa:(');

			});

			// .always sa spusti bez ohladu na to, ci sme mali uspech alebo nie
			request.always(function() {
				
				// a to je dobre miesto, kde nechat zmiznut loading ikonku
				// loading ikonku chceme zmiznut bez ohladu na to, ci sa podarilo nacitat obsah alebo nie
				//loading.delay(200).fadeOut();

			});

		}

	});

})(jQuery);