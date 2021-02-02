var axios = require("axios").default;

const prompt = require('prompt-sync')();

/* Asking user for movie/title name
  Sample Inputs :
  Enter MovieKal Ho Naa Ho,
  The Priest

*/
const movie_name = prompt('Enter Movie -');
movie_name.toLowerCase();


var get_title = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/auto-complete',
  params: {q: movie_name},
  headers: {
    'x-rapidapi-key': '0e4a457cc9mshdbd798fa64878e8p1b7db1jsn222d265be80f',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }
};

// t_canst is used to store the title number
var t_const ;

var get_rating = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/get-ratings',
  params: {tconst:t_const },
  headers: {
    'x-rapidapi-key': '0e4a457cc9mshdbd798fa64878e8p1b7db1jsn222d265be80f',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }
};

axios.request(get_title).then(function (response) {
  
  const data = response.data.d;
  
  const data_length = data.length;
  const alternatives= [];
  
  for(let i = 0; i < data_length; ++i){
    
    const candidate = data[i].l;
    candidate.toLowerCase();

    if(candidate==movie_name){
      get_rating.params.tconst = data[i].id;
      axios.request(get_rating).then(function (response) {
        const rating = response.data.rating;
        if(rating == undefined){
          console.log("Rating of this movie is not available")
          return;
        }
        console.log("Rating" +"-"+rating)
      }).catch(function (error) {
      console.error(error);
      console.log("Something went wrong");
      })
      break;
    }
    else{
      alternatives.push(candidate);
    }
    
    if(i == data_length-1 ){

      console.log("Sorry we could not found your movie");
      console.log("But we some movie suggestions for you!")
      
      for(let i=0; i< alternatives.length; i++){
        console.log(i+1,alternatives[i]);
      }
    }
    
  }
}).catch(function (error) {
	console.error(error);
});
