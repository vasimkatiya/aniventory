const { validationResult } = require("express-validator");
const pool = require("../db/pool")

exports.addAnime = async (req,res)=>{

    let sql = "select * from genres ;";

    const options = await pool.query(sql)
    console.log(options.rows);
    
    res.render('add',{
        title:"add new anime",
        genres:options.rows,
        errors:[]
    })
}

exports.addAnimePost = async (req,res)=>{

    const errors = validationResult(req);

    const genre = await pool.query('select * from genres;');

    if(!errors.isEmpty()){
        return res.render('add',{
            genres:genre.rows,
            title:'add new',
            errors:errors.array(),
            oldData:req.body
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
  'SELECT id FROM animes WHERE anime_name = $1',
  [anime_name]
);

if (existingAnime.rows.length > 0) {
  return res.render('add', {
    title: 'add new anime',
    genres: genre.rows,
    errors: [{ msg: 'Anime already exists' }],
    oldData: req.body
  });
}


    await pool.query(
  `INSERT INTO animes (anime_name, type, ep, dubbed, genres_id)
   VALUES ($1, $2, $3, $4, $5)`,
  [anime_name, type, ep, dubbed, genreId]
);

    res.redirect('/animes')
}