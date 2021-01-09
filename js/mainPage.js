window.addEventListener('DOMContentLoaded',()=>{
	
	fetch('/films')
		.then(data=>data.json())
		.then(data=>createItems(data)).then(data=>checkStatusFilms())
		.catch(err=>console.error(err));

		this.delete;

	
})

