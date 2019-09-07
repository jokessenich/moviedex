require('dotenv').config()
const express= require('express')
const morgan= require('morgan')
const cors = require('cors')
const moviedex= require('./MOVIEDEX.json')

const app= express()

app.use(morgan('dev'))
app.use(cors())

app.use(function validateBearerToken(req,res,next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    console.log('validate bearer token middleware')

    debugger
    if(!authToken || authToken.split(' ')[1] !== apiToken ){
    return res.status(401).json({ error: 'Unauthorized request' })
    }

    next()

  })

  
function handleGetMovie(req, res){
    let response=moviedex
    if(req.query.country){
    let country= req.query.country
    response=response.filter(movie=>movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    
    if(req.query.genre){
    let genre= req.query.genre
    response=response.filter(movie=>movie.genre.toLowerCase().includes(genre.toLowerCase()))

    }

    if(req.query.avg_vote){
    let avg_vote= req.query.avg_vote
    response = response.filter(movie=>movie.avg_vote>=avg_vote)
    }
    res.json(response)
}
app.get('/movie', handleGetMovie)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
