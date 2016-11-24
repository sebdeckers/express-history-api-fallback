export default (...args) => (req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(...args, err => err && next());
  } else next();
}
