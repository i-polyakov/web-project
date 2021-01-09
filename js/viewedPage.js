window.addEventListener('DOMContentLoaded',()=>{

	getViewedFilms();

})



function getViewedFilms(event){

	fetch('/getViewedFilms')
		.then(data=>data.json())
		.then(data=>create_Items(data))
		.catch(err=>console.error(err));
	this.delete;
}



function upRating(elem){

	
	film_id = elem.parentNode.parentNode.parentNode.parentNode.id;


		fetch('/upRating',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  	},  body: JSON.stringify({film_id: film_id})})
		.then(data=>data.json())
		.then(data=>{
				
				if(data.rating==0)
					elem.parentNode.querySelectorAll( ".count" )[0].innerHTML='★  Оценить'; 
				else
					elem.parentNode.querySelectorAll( ".count" )[0].innerHTML=data.rating;
		})
		.catch(err=>console.error(err));
	this.delete;


}

function downRating(elem){

	film_id = elem.parentNode.parentNode.parentNode.parentNode.id;


	
		fetch('/downRating',{ method: "POST", headers: {
    'Content-Type': 'application/json; charset=utf-8',
     'Accept': 'application/json'
  	},  body: JSON.stringify({film_id: film_id})})
		.then(data=>data.json())
		.then(data=>{
				
				if(data.rating==0)
					elem.parentNode.querySelectorAll( ".count" )[0].innerHTML='★  Оценить'; 
				else
					elem.parentNode.querySelectorAll( ".count" )[0].innerHTML=data.rating;
		})
		.catch(err=>console.error(err));
	this.delete;
}

function create_Items(res){

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
									<a href="film.html">
										<img src="${item.poster}" class="item__poster"> </img>
								<div class="item__body">
											<div class="item__name">${item.name}, ${item.year}</div>
											<div class="item__additional">${item.country},
												<span class="item__style">${item.genre}</span>
												
											</div>
									</a>
									<div class="item__controls">
										<button class="item__watch-button" onclick="unviewedFilm(this)">Удалить</button>
										<div class="item__user-rating">
											 <input class="minus" type="button" value="-" onclick="downRating(this)"  >
											 <input class="plus" type="button" value="+"  onclick="upRating(this)" >
											 <p class="count">${(response.rating==null||response.rating==0)?'★  Оценить':response.rating.toFixed(2)}</p>
										</div>
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

		});
	})}

	else{

		let buff=document.createElement('div');
		buff.innerHTML="Фильм не найден!";
		document.querySelector('.main__container').appendChild(buff);
	}

	

}

