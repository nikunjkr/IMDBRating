var axios = require("axios").default;

const prompt = require('prompt-sync')();
 
const movie_name = prompt('Enter Movie');
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
var t_const = "tt0068646"

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
  
  const data = response.data.d
  
  // const array_length = data.length 
  console.log(array_length)
  for(let i = 0; i < array_length; ++i){
    // console.log(i)
    const candidate = data[i].l
    if(candidate==movie_name){
      get_rating.params.tconst = data[i].id
      axios.request(get_rating).then(function (response) {
        // console.log(response);
        console.log(response.data.rating)
      }).catch(function (error) {
      console.error(error);
      console.log("Something went wrong")
      })
      break
    }
    
    if(i==array_length-1 ){
      console.log("Movie Not found");
      console.log("")
    }
    
  }
  

  
}).catch(function (error) {
	console.error(error);
});