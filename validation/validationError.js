const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('add', {
      errors: errors.array(),
      formData: req.body,
      title:"add something new "
    });
  }

  next();
};
