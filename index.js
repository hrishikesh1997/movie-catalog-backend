const {initializedatabase} = require("./db/db.coonect")

const express = require("express")
const app = express()
app.use(express.json())   // if it is not there express.json() then post will not works it will say path is
//  missing even if payload is correct 
const PORT = 3000;

const fs = require("fs")

const Movie = require("./Models/movie.model");
const { log } = require("console");

 initializedatabase();

const jasonData = fs.readFileSync("movie.json","utf-8")

const moviesdata = JSON.parse(jasonData)

function seedData(){
    try {

        for(const moviedata of moviesdata){
            const newMovie = new Movie({
                title:moviedata.title,
                releaseYear:moviedata.releaseYear,
                genre:moviedata.genre,
                director:moviedata.director,
                actors:moviedata.actors,
                language:moviedata.language,
                country:moviedata.country,
                rating:moviedata.rating,
                plot:moviedata.plot,
                awards:moviedata.awards,
                posterUrl:moviedata.posterUrl,
                trailerUrl:moviedata.trailerUrl,
            })

            console.log(newMovie.title)
            newMovie.save();
        }

        
        
    } catch (error) {
         console.log("error in seeding data",error)
    }
}

//seedData();

/* const newMovie = 
    {
        "title": "Interstellar",
        "releaseYear": 2014,
        "genre": "sci-fi",
        "director": "Christopher Nolan",
        "actors": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        "language": "English",
        "country": "USA",
        "rating": 8.6,
        "plot": "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
        "awards": "Academy Award for Best Visual Effects",
        "posterUrl": "https://example.com/interstellar.jpg",
        "trailerUrl": "https://www.youtube.com/watch?v=zSWdZVtXT7E"
      } */
      
async function createmovie(newMovie){
     //await initializedatabase();
    try {
         const movie = new Movie(newMovie)
         const SavedMovie = await movie.save();
         console.log(SavedMovie)
    } catch (error) {
        throw error 
    }
}

  //createmovie(newMovie)

  app.post("/Addmovies",async(req,res)=>{
    try {
         const savedmovie = await createmovie(req.body)
         res.status(201).json({message:"movie added succsfully",movie:savedmovie})
    } catch (error) {
        res.status(500).json({error:"Failed to movie",error:error.message})
    }
  })

  //to get all movies 

  async function readALLMovies(){
   // await initializedatabase();
    try {
        const movies = await Movie.find({})
        return movies
        //console.log(movies)
    } catch (error) {
        throw error
    }
  }

  app.get("/Getmovies",async(req,res)=>{
     try {
        const Movies = await readALLMovies();
        res.status(201).json({message:"All movies fetched succsfully ",AllMovies:Movies})
     } catch (error) {
        res.status(500).json({error:error.message})
     }
  })

 //readALLMovies();

 //to get movie by director
 async function readMovieByDirector(Director){
    try {
        const movies = await Movie.find({director:Director})
        console.log(movies)
        return movies
       
    } catch (error) {
        throw error
    }
 }

  app.get("/movieByDirector/:Director",async (req,res)=>{
      try {
        const Director = req.params.Director
        const result = await readMovieByDirector(Director)
        res.status(201).json({movie:result})
      } catch (error) {
        res.status(500).json({error:error.message})
      }
  })

//readMovieByDirector("Christopher Nolan")


async function updateMoviesById(Id,updateData){
    try {
        const movies = await Movie.findByIdAndUpdate(Id,updateData,{new:true})
        console.log(movies)
    } catch (error) {
        console.log(error)
    }

}

  app.put("/updateByid/:id",async(req,res)=>{
      try {
           const id =req.params.id;
           const updateData =req.body;
           const result = await updateMoviesById(id,updateData)
           res.status(201).json({message:"data updated succsfully",result})
      } catch (error) {
         res.status(500).json({error:error.message})
      }
  })

//updateMoviesById("68069c78ef2547f2c6be49aa",{rating:9.0})

async function updateByTitle(movietitle,updateData){
    try {
         const movies = await Movie.findOneAndUpdate({title:movietitle},updateData,{new:true})
         console.log(movies)
    } catch (error) {
        console.log(error)
    }
}
app.put("/UpdateByTitle/:movietitle",async(req,res)=>{
    try {
         const movietitle =req.params.movietitle;
         const updateData =req.body;
         const result = await updateByTitle(movietitle,updateData)
         res.status(201).json({message:"data updated succsfully",result})
    } catch (error) {
       res.status(500).json({error:error.message})
    }
})
//updateByTitle("Inception",{rating:6})


async function DeleteById(id){
    try {
         const movie = await Movie.findByIdAndDelete(id)

    } catch (error) {
        console.log(error)
    }
}

 app.delete("/DeletebyId/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await DeleteById(id);
        res.status(201).json({message:"Data deleted succsfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
 })

//DeleteById("68069cc35bf2aa0635e90340")


async function DeleteByAny(movietitle){
    try {
         const movie = await Movie.findOneAndDelete({title:movietitle})

    } catch (error) {
        console.log(error)
    }
}
app.delete("/DeletebyTitle/:movietitle",async(req,res)=>{
    try {
        const movietitle = req.params.movietitle;
        const result = await DeleteByAny(movietitle);
        res.status(201).json({message:"Data deleted succsfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
 })

//DeleteByAny("Drishyam")


app.listen(PORT,()=>{
    console.log(`app listen on http://localhost:${PORT}`)
})