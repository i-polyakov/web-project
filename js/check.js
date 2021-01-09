 window.onload=function (){
 	checkStatusFilms();
 };

 function checkStatusFilms(){
 
 	
	items=document.querySelectorAll('.item__controls');
	
	items.forEach(item=> {
		
		film_id = item.parentNode.parentNode.id;
		
		filmStatus=true;
		var watch_button=item.firstElementChild ;
		
		var viewed_button=item.lastElementChild ;

			console.log("seach 4");
		
		if(item.classList.contains('item__watch-button'))
			filmStatus=false;
		else
			filmStatus=true;

		fetch('/checkStatusFilm',{ method: "POST", headers: {
		    'Content-Type': 'application/json; charset=utf-8',
		     'Accept': 'application/json'
		 	 },  body: JSON.stringify({film_id: film_id,filmStatus: filmStatus})})
		.then(data=>data.json())
		.then(data=>{
			//console.log("data.status "+data.status+" .filmStatus "+filmStatus);
			if(data.status!=null)
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
		
	});

}
