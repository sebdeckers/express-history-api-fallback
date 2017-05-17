export default (...args) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    (res.sendFile || res.sendfile).call(res, ...args, err => err && next())
  } else next()
}
