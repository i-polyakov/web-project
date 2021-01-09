function searchInput(){

	myNode = document.querySelector('.main__title');
	myNode.innerHTML="";

	var text = document.getElementsByTagName("input")[0];
	var val = text.value;
	
	fetch('/film',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  },  body: JSON.stringify({search: val})})
	.then(response => response.json())
	.then(response => createItems(response))
		.catch(err=>console.error(err));
	
	this.delete;

}

function getWatchFilms(event){

	fetch('/watchFilms')
		.then(data=>data.json())
		.then(data=>createItems(data))
		.catch(err=>console.error(err));
	this.delete;
}



function changeStatusFilm(elem){


	film_id = elem.parentNode.parentNode.parentNode.id;

	filmStatus=true;
	var watch_button=elem.parentNode.firstElementChild ;

	var viewed_button=elem.parentNode.lastElementChild ;
		//console.log(watch_button);	
	if(elem.classList.contains('item__watch-button'))
	filmStatus=false;
	else
	filmStatus=true;

	//console.log(filmStatus);
		fetch('/changeStatusFilm',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  	},  body: JSON.stringify({film_id: film_id,filmStatus: filmStatus})})
		.then(data=>data.json())
		.then(data=>{
				console.log("data.status "+data.status+" .filmStatus "+filmStatus);
				if(data.status==false){
					console.log(watch_button.classList);
					watch_button.classList.toggle("on");
					viewed_button.classList.remove("on");

					if(!watch_button.classList.contains('on')||viewed_button.classList.contains('on'))
	 					del(elem);

				}else{
					viewed_button.classList.toggle("on");
					watch_button .classList.remove("on");

					if(watch_button.classList.contains('on')||!viewed_button.classList.contains('on'))
	 					del(elem);

				}
			
			})
		.catch(err=>console.error(err));
	

}

function unviewedFilm(elem){


	film_id = elem.parentNode.parentNode.parentNode.id;


	console.log(film_id);
		fetch('/unviewedFilm',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  	},  body: JSON.stringify({film_id: film_id})})
		.then(data=>data.json())
		.then(data=>{
			console.log(elem);
				 				del(elem);
			
			})
		.catch(err=>console.error(err));
	

}


 
 function checkStatusFilms(){
 
 	
	items=document.querySelectorAll('.item__controls');
	
	//console.log(items);
	items.forEach(item=> {
		
		film_id = item.parentNode.parentNode.id;
		//console.log("film_id"+film_id);
		filmStatus=true;
		var watch_button=item.firstElementChild ;
		
		var viewed_button=item.lastElementChild ;

		
		//console.log(film_id);
		if(item.classList.contains('item__watch-button'))
		filmStatus=false;
		else
		filmStatus=true;

		//console.log(filmStatus);
		fetch('/checkStatusFilm',{ method: "POST", headers: {
		    'Content-Type': 'application/json; charset=utf-8',
		     'Accept': 'application/json'
		 	 },  body: JSON.stringify({film_id: film_id,filmStatus: filmStatus})})
		.then(data=>data.json())
		.then(data=>{
			//console.log("data.status "+data.status+" .filmStatus "+filmStatus);
			if(data.status!=null)
			if(data.status==false){
				//console.log(watch_button.classList);
				if(!watch_button.classList.contains("on"))
					watch_button.classList.add("on");
					viewed_button.classList.remove("on");

				}else{
					if(!viewed_button.classList.contains("on"))
						viewed_button.classList.add("on");
						watch_button .classList.remove("on");

					
				}
		
			})
		.catch(err=>console.error(err));
		
	});

}

 function addViewed(elem){
if(elem.classList.contains('on'))
 		del(elem);
 	elem.classList.toggle("on");
	
	//console.log(elem);

	film_id = elem.parentNode.parentNode.parentNode.id;

		console.log( film_id );

	result= etch('/addViewedFilm',{ method: "POST", headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	     'Accept': 'application/json'
	  },  body: JSON.stringify({film_id: film_id})})
		.catch(err=>console.error(err));
	

}

 
function filmStatistics(elem){

	film_id = elem.id;

	
	return	fetch('/filmStatistics',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  	},  body: JSON.stringify({film_id: film_id})})
		.then(data=>data.json())
		.then(data=>{  
	return data;})
		.catch(err=>console.error(err));
	this.delete;


}


function createItems(res){
console.log("2");
	//clean
	var myNode = document.querySelector('.main__container');
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}

	

	if(res.length>0){
		
		res.forEach(item=>{
		
		
			let film=document.createElement('div');
			film.classList.add('main__item');
			film.setAttribute('id',`${item.id}`);

				
			filmStatistics(film).then(response => {
			
			
			film.innerHTML=`
									<a href="filmPage/${item.id}" >
										<img src="${item.poster}" class="item__poster"> </img>
								<div class="item__body">
											<div class="item__name">${item.name}, ${item.year}</div>
											<div class="item__additional">${item.country},
												<span class="item__style">${item.genre}</span>
												
											</div>
									</a>
									<div class="item__controls">
										<button class="item__watch-button"  onclick="changeStatusFilm(this)">Посмотрю</button>
										
										<button class="item__viewed-button"  onclick="changeStatusFilm(this)">Просмотрен</button>
									</div>

									<div class="item__rating-section">
										<span class="item__rating">
											<span >${(response.avg==null||response.avg==0)?'Нет оценки':parseFloat(response.avg).toFixed(2)}</span>
											<span class="item__rating-value">Рейтинг</span>
										</span>
										<span class="item__rating">
											<span >${response.watch}</span>
											<span class="item__rating-count-watch"> Посмотрят</span>
										</span>
										<span class="item__rating">
											<span >${response.viewed}</span>
											<span class="item__rating-count-viewed">Посмотрели</span>
										</span>
									</div>
								</div>	



			`;
			document.querySelector('.main__container').appendChild(film);
			
		checkStatusFilms();
			});

		})

	}

	else{

		let buff=document.createElement('div');
		buff.innerHTML="Фильм не найден!";
		document.querySelector('.main__container').appendChild(buff);
	}

	

	

}



