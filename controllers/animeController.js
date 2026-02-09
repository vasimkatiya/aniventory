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