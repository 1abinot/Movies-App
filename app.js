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
}

//event listener for add 
document.getElementById('movie-form').addEventListener('submit', (e) =>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const imdb = parseInt(document.getElementById('imdb').value);

    if(title === '' || author === '' || isNaN(imdb)){
        alert('please fill all the fields');
    }

    //create a movie object
    const movie = new Movie(title, author, imdb);

    //create an ui object
    const ui = new UI();

    //add movie to list
    ui.addMovie(movie);


    e.preventDefault();
});


//event listener for remove
document.getElementById('movie-list').addEventListener('click', (e) => {
    // console.log(e.target);

    const ui = new UI();

    
    ui.removeMovie(e.target);

    e.preventDefault();
});