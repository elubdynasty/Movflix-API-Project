

  
const movieList = [
  {
    title: 'Parasite',
    rating: 'R',
    leading_role: 'Kang-ho Song',
    release_year: 2019
  },
  {
    title: 'The Irishman',
    rating: 'R',
    leading_role: 'Robert de Niro',
    release_year: 2019
  },
  {
    title: 'Raya and the Last Dragon',
    rating: 'PG',
    leading_role: 'Kelly Marie Tran',
    release_year: 2021
  },
  {
    title: 'Tenet',
    rating: 'PG-13',
    leading_role: 'John David Washington',
    release_year: 2020
  },
  {
    title: 'The Divergent Series: Insurgent',
    rating: 'PG-13',
    leading_role: 'Shailene Woodley',
    release_year: 2015
  }
];

const mainDiv = document.querySelector('main'); //return main to html

//add a function that will add the form 
//data into a new object and push it into the array, then afterwards
//we will call the renderdata function to update the list of movies.
//add form inputs to some global vars
const titleInput = document.querySelector('input[name="title"]'); //selecting the input with name property "name"
const ratingInput = document.querySelector('input[name="rating"]');
const leadingInput = document.querySelector('input[name="leading_role"]');
const release_yearInput = document.querySelector('input[name="release_year"]');
const btnInput = document.querySelector('.addmovie'); //select btn w class addmovie

//Update form inputs on global vars
const updateTitle = document.querySelector('input[name="updatetitle"]') //selecting the input with name property "name"
const updateRating = document.querySelector('input[name="updaterating"]')
const updateLeading = document.querySelector('input[name="updateleading_role"]')
const updateRelease_year = document.querySelector('input[name="updaterelease_year"]');
const updateBtn = document.querySelector('.updatemovie'); //select btn w/ class updatemovie


//define f(x) for rendering current data to DOM, use whenever data changes
const renderData = () => {

  //empty of the main div of any existing content
  mainDiv.innerHTML = ''

  //loop over the movie array
  movieList.forEach((movie, idx) => {
    
    const movie_p = document.createElement('p'); //creates new p element
    
    const btnContainer = document.createElement('aside'); //aside to store update/delete buttons
    
    //Delete Button
    const deleteBtn = document.createElement(`button`);
    deleteBtn.id = idx
    deleteBtn.innerText = 'Delete' //Make the delete button say 'Delete'
    deleteBtn.addEventListener('click', event => { 
      movieList.splice(idx, 1); //remove the element of current idx
      renderData();
    });

    
    btnContainer.appendChild(deleteBtn);  //append the updateBtn

    //Update Button
    const updateBtn = document.createElement(`button`);
    updateBtn.id = idx
    updateBtn.innerText = 'Update' //Make the delete button say 'Update'
    updateBtn.addEventListener('click', event => {
      updateTitle.value = movieList.title 
      updateRating.value = movieList.rating 
      updateLeading.value = movieList.leading_role 
      updateRelease_year.value = movieList.release_year
      updateBtn.setAttribute('toupdate', idx); // custom attr to use in the button event later
      renderData();
    });
    
    btnContainer.appendChild(updateBtn);
    
    
    movie_p.innerHTML = `<br>Title: ${movie.title} 
                       <br>Rating: ${movie.rating}
                       <br>Leading actor/actress: ${movie.leading_role}
                       <br>Release Year: ${movie.release_year}<br>` 
    mainDiv.appendChild(movie_p) //adds html content to the main element
    mainDiv.appendChild(btnContainer)
  });
  
};


const createmovieData = () => {
  const title = titleInput.value //store value from title input into title variable
  const rating = ratingInput.value //store value from rating input into rating variable
  const leading_role = leadingInput.value //store value from leading input into leading_role variable
  const release_year = release_yearInput.value //store value from year input into year variable
  const newMovie = { title, rating, leading_role, release_year } // create new movie object
  movieList.push(newMovie) //push the new object object into the array
  renderData() //render the data again so it reflects the new data
};

const updatemovieData = event => {
  const idx = event.target.getAttribute('toupdate'); //get index stored through custom attr
  const title = updateTitle.value //get value from form
  const rating = updateRating.value 
  const leading_role = updateLeading.value
  const release_year = updateRelease_year.value 
  movieList[idx] = { title, rating, leading_role, release_year } //replace existing object at that index w/ a new updated values
  renderData()
}

renderData();
btnInput.addEventListener('click', createmovieData);
updateBtn.addEventListener('click', updatemovieData)

