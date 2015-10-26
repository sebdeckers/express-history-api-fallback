export default (...args) => (req, res, next) => {
  if (req.accepts('html')) res.sendFile(...args, err => err && next())
  else next()
}
