class Movie{
    constructor(title, author, imdb){
        this.title = title;
        this.author = author;
        this.imdb = imdb;
    }
}


class UI{

    addMovie(movie){
        //get tbody element
        const list = document.getElementById('movie-list');

        //create tr element
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.author}</td>
            <td>${movie.imdb}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
        
    }

    removeMovie(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(msg, className){
        const div = document.createElement('div');

        div.className = `alert ${className}`;

        
        const txtNode = document.createTextNode(msg);

        div.appendChild(txtNode);

    
        const row = document.querySelector('.row');

        
        const form = document.getElementById('movie-form');

        row.insertBefore(div, form)
        
        
        setTimeout(() => {
            document.querySelector('.alert').remove();
            document.getElementById('submit').disabled = false;
        }, 2000);

        document.getElementById('submit').disabled = true;

    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('imdb').value = '';
        document.getElementById('title').focus();
    }
}


class Store{
    static getMovies(){
        let movies;
        if(localStorage.getItem('movies') === null){
            movies = [];
        }else{
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }
  

    static displayMovie(){
        const ui = new UI();

        let movies = Store.getMovies();

        movies.forEach(movie => {
            ui.addMovie(movie);
        });
    }

    static addMovie(movie){
        //get movies from LS
        let movies = Store.getMovies();

        //push new movie into array movies
        movies.push(movie);

        //store the movies in LS
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    
    static removeMovie(imdb){
        imdb = parseInt(imdb);
        let movies = Store.getMovies();

        movies.forEach((movie, index) => {
            if(movie.imdb === imdb){
                movies.splice(index, 1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    
}


document.addEventListener('DOMContentLoaded', Store.displayMovie);

//event listener for add 
document.getElementById('movie-form').addEventListener('submit', (e) =>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const imdb = parseInt(document.getElementById('imdb').value);

    //create an ui object
    const ui = new UI();

    if(title === '' || author === '' || isNaN(imdb)){
        ui.showAlert('Please fill in all fields', 'error')
    }else{
        //create a movie object
        const movie = new Movie(title, author, imdb);

        //add movie to list
        ui.addMovie(movie);

        //add movie to LS
        Store.addMovie(movie);

        //show successful alert to the user 
        ui.showAlert(`Movie ${movie.title} added!`, 'success')
        
        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
});


//event listener for remove
document.getElementById('movie-list').addEventListener('click', (e) => {
    // console.log(e.target);

    const ui = new UI();

    //remove movie from db
    ui.removeMovie(e.target);

    //remove movie from LS
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Movie removed!', 'success')

    e.preventDefault();
});