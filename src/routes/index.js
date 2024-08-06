const router = require('express').Router();
require('express-async-errors');

/* Головна сторінка */
router.get('/', async function(req, res) {
  res.render('index', { title: 'Головна сторінка' }); // Відображення шаблону з views/index.ejs
});

module.exports = router;
