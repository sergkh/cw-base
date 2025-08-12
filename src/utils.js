const client = require('./client');

async function parseAuth(req, res, next) {
  const session = req.cookies.session;
  if (!session) return next();
  
  // отримання інформації про користувача та одночасно перевірка чи токен валідний
  try {
    const userData = await client.get('users/me?populate=role', { headers: { Authorization: `Bearer ${session}` } });
    const user = userData.data;
    user.role = (user.role) ? user.role.name : 'Guest';
    req.user = user
  } catch (e) {
    console.log('Error while parsing auth', e);
  }

  return next();
}

function rejectUnauthenticated(req, res, next) {
  if (!req.user) return res.redirect('/login');
  return next();
}

function rejectNonAdmin(req, res, next) {
  if (!req.user || !req.user.role === 'Admin') return res.redirect('/login');
  return next();
}


module.exports = {
  parseAuth, rejectUnauthenticated, rejectNonAdmin
}