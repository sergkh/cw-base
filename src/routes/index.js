const router = require('express').Router();
const client = require('../client');
const { parseAuth } = require('../utils');

/* Головна сторінка */
router.get('/', parseAuth, async function(req, res) {
  let data = []

  // Якщо користувач авторизований, отримаємо дані з колекції items та відобразимо їх
  if (req.user) {    
    const response = await client.get('items').catch(e => {
      if (e.status === 404) {
        console.error('Колекцію `items` не знайдена. Створіть її в панелі адміністрування Strapi.');
      } else {
        console.error('Помилка при отриманні даних:', e);
      }
      return { data: { data: [] } };
    });

    data = response.data.data
  }

  res.render('index', {
     title: 'Головна сторінка', 
     items: data ,
     user: req.user // Передача користувача в шаблон якщо він є
  });
});

router.get('/about', parseAuth, async function(req, res) {
  res.render('index', { title: 'Про сайт', user: req.user }); // Відображення шаблону з views/index.ejs
});

module.exports = router;
