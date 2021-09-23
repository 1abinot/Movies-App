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
}

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

        ui.showAlert(`Movie ${movie.title} added!`, 'success')
        
    }

    e.preventDefault();
});


//event listener for remove
document.getElementById('movie-list').addEventListener('click', (e) => {
    // console.log(e.target);

    const ui = new UI();

    
    ui.removeMovie(e.target);

    ui.showAlert('Movie removed!', 'success')

    e.preventDefault();
});