const { validationResult } = require('express-validator');
const pool = require('../db/pool');

exports.animeController = async (req,res) =>{
    const animes = await pool.query("select a.anime_name ,a.id ,a.type,a.ep,a.dubbed,g.genre_name from animes a join genres g on a.genres_id = g.id;");
    console.log("anime details : ",animes.rows);
    
    res.render('allAnimes',{
        title:"all added anime",
        animes:animes.rows
    });
    
};

exports.deleteAnimeController = async (req,res)=>{
    const {id} = req.params;
    await pool.query("delete from animes where id = $1",[id]);
    res.redirect('/animes');
}

exports.updateAnimeGetController = async (req,res) =>{
    const {id} = req.params;
    const fetchAnime = await pool.query("select * from animes where id = $1",[id]);
    const genre = await pool.query("select * from genres;");

    res.render("updateAnime",{
        title:"update anime : ",
        result:fetchAnime.rows,
        errors:[],
        genres:genre.rows
    });
};

exports.updateAnimeControllerPost = async (req,res)=>{

    const {id} = req.params;

   const errors = validationResult(req);

    const genre = await pool.query('select * from genres;');

    if(!errors.isEmpty()){
        return res.render('updateAnime',{
            genres:genre.rows,
            title:'update anime',
            id:id,
            errors:errors.array(),
          
        });
    };

    const {anime_name,type,ep,dubbed,genre_name} = req.body;

    const genreResult = await pool.query(
  'SELECT id FROM genres WHERE genre_name = $1',
  [genre_name]
);

 if (genreResult.rows.length === 0) {
    return res.status(400).send('Genre not found');
  }

  const genreId = genreResult.rows[0].id;

 const existingAnime = await pool.query(
  'SELECT id FROM animes WHERE anime_name = $1 AND id != $2',
  [anime_name, id]
);


if (existingAnime.rows.length > 0) {
  return res.render('updateAnime', {
    title: 'update anime',
    genres: genre.rows,
    anime:req.body,
    id:id,
    errors: [{ msg: 'Anime already exists' }],
  });
}


    await pool.query(
  `UPDATE animes set anime_name = $1 ,type = $2 , ep = $3 , dubbed = $4 , genres_id = $5 where id = $6`,
  [anime_name, type, ep, dubbed, genreId,id]
);

    res.redirect('/animes')
}