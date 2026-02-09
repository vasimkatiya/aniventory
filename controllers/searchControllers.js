const pool = require("../db/pool");

exports.searchController = async (req,res) =>{
    const {search} = req.query;
    const genreName = await pool.query("select id from genres where genre_name ilike $1",[`%${search}%`])
    const id = genreName.rows[0].id
    const result = await pool.query("select * from animes where genres_id = $1",[id]);
    console.log();
    res.render("search",{
        title:"search result",
        anime:result.rows
    })
}