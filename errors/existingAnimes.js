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
