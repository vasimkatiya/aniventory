const { validationResult } = require("express-validator");
const pool = require("../db/pool");

exports.addGenresGet = async (req, res) => {

    const result = await pool.query("select * from genres;");
    console.log(result.rows);

    res.render('genres', {
        results: result.rows
    });
}

exports.createGenresGet = (req, res) => {
    res.render('addGenres', {
        title: "add new genres",
        err:[],
    })
}

exports.createGenresPost = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('addGenres', {
            err: errors.array(),
            title:"add new genres"
        })
    }

    const {genreName } = req.body;
    console.log(genreName);
    
    const exitingGenres = await pool.query("select id from genres where genre_name = $1;",[genreName]);

    if(exitingGenres.rows.length > 0)
    {
       return res.render("addGenres",{
            title:"add new genres",
            err:[{msg:"this genre is already exist !"}]
        })
    }

    await pool.query(
        "INSERT INTO genres (genre_name) VALUES ($1)",
        [genreName]
    );
    res.redirect("/genres")
}

exports.deleteGenres = async (req,res) =>{
    const {id} = req.params;
    await pool.query("delete from genres where id = $1",[id]);
    res.redirect('/genres');
}

exports.updateGenresGet = async (req,res) =>{
    const {id} = req.params;
    const genres = await pool.query("select * from genres where id = $1",[id]);
    console.log("update genres :",genres.rows);
    console.log("update genres :",genres.rows[0].id);
    
    res.render("updateGenres",{
        title:"update genres",
        result:genres.rows,
        err:[]
    });

}

exports.updateGenresPost = async (req,res) =>{
    const {id} = req.params;
    const {updateGenres} = req.body;

     const existingGenre = await pool.query(
        "SELECT id FROM genres WHERE genre_name = $1 AND id != $2",
        [updateGenres, id]
    );

    if (existingGenre.rows.length > 0) {
        const genres = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
        return res.render('updateGenres', {
            title: "update genres",
            result: genres.rows,
            err: [{ msg: "This genre already exists!" }]
        });
    }
    await pool.query("update genres set genre_name = $1 where id = $2",[updateGenres,id]);
    res.redirect("/genres")
}