module.exports = async (request, response, next) => {
  if(!request.session.user){
    return response.redirect('/')
  }
  return next();
}