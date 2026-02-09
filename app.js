require('dotenv').config();
const express = require('express');
const path = require('path');
const IndexRouter = require('./routes/IndexRoutes');
const AnimeRouter = require('./routes/animeRoutes');
const genresRouter = require('./routes/genresRoutes');

const port = process.env.PORT || 3000;

const app = express();

app.set("views",path.join(__dirname,'views'));
app.set("view engine","ejs");

app.use(express.urlencoded());
app.use(express.json());

app.use('/',IndexRouter);
app.use('/animes',AnimeRouter);
app.use("/genres",genresRouter)


app.listen(port,(error)=>{
    console.log(error);
});