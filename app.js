const API_KEY = "3a8afa4e";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
let searchInput=document.querySelector("#search-input");
let searchBtn=document.querySelector("#search-btn");
 let popularMovieInfo=document.querySelector(".popular-movie-info");
let movieName=document.querySelector("#Movie-Name");
let year=document.querySelector("#Year");
let movieRated=document.querySelector("#movie-rated");
let rating=document.querySelector("#movie-rating");
let poster=document.querySelector("#movie-poster");
let  plot=document.querySelector("#plot-info");
let  director=document.querySelector("#Director");
let  genre=document.querySelector("#Genre");
let  runtime=document.querySelector("#Runtime");
let  actors=document.querySelector("#Actors");
let modebtn=document.querySelector("#dark-light-mode");
let mode = localStorage.getItem("theme") || "light";

if(mode === "light"){
    document.body.classList.add("light-mode");
}
modebtn.addEventListener("click",()=>{
    if(mode==="light"){
        mode="dark";
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme","dark");
    }
    else{
        mode = "light";
        document.body.classList.add("light-mode");
        localStorage.setItem("theme","light");
    }
})
const popularMovies = [
    "Inception",
    "Interstellar",
    "The Dark Knight",
    "Oppenheimer",
    "Joker",
    "Avengers Endgame"
];

const updateMovieInfo=(data)=>{
poster.src = data.Poster;
movieName.textContent = data.Title;
movieRated.textContent=data.Rated;
year.textContent = data.Year;
rating.textContent = data.imdbRated;
plot.textContent = data.Plot;
director.textContent=data.Director;
genre.textContent = data.Genre;
runtime.textContent = data.Runtime;
actors.textContent = data.Actors;
rating.innerHTML = `
    ${data.imdbRating}/10
`;
 }


async function getMovie(movieName){
   const response= await fetch( `${BASE_URL}&t=${movieName}`);
   let data= await response.json();
   console.log(data); 
   updateMovieInfo(data);   
}
popularMovies.forEach(movie =>{
    getpopularMovie(movie);
})
// this one is for popular movies
async function getpopularMovie(movieName){
   const response= await fetch( `${BASE_URL}&t=${movieName}`);
   let data= await response.json();
   const card=document.createElement("div");
   card.classList.add("movie-card");

   const img=document.createElement("img");
   img.src=data.Poster;
   const title = document.createElement("h3");
   title.innerText = data.Title;
   const info = document.createElement("div");
   info.classList.add("movie-meta");

   const year = document.createElement("p");
   year.innerHTML=`${data.Year}`;
   const rating = document.createElement("p");
   rating.innerHTML=`<i class="fa-solid fa-star"></i> ${data.imdbRating}`;

   info.append(year);
   info.append(rating);
   card.append(img);
   card.append(title);
   card.append(info);
   card.addEventListener("click",()=>{
    getMovie(data.Title);
   })
   popularMovieInfo.append(card);
}

getMovie("Inception");

searchBtn.addEventListener("click",()=>{
    const movieName=searchInput.value.trim();
    getMovie(movieName);
    console.log("click");
});
searchInput.addEventListener("keydown",(event)=>{
   if(event.key==="Enter"){
    const movieName=searchInput.value.trim();
    getMovie(movieName);
   }
 })
 