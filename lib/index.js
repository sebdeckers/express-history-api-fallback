export default (fallback, ...args) => (req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    if (fallback instanceof Function) {
      fallback(req, res, next)
    } else {
      res.sendFile(fallback, ...args, err => err && next())
    }
  } else next()
}
