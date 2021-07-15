const { compare } = require('bcrypt');
const User = require('../model/User');
const { sign } = require('jsonwebtoken');


class SessionController {
  async store(request, response){
    const { email , password } = request.body;

    if(email === '' || password === ''){
      await request.flash('error', { message: 'Verifique os campos obrigatórios'});
      return response.redirect('/');
    }

    const user = await User.findOne({ email });

    if(!user){
      await request.flash('error', { message: 'E-mail ou senha inválidos'});
      return response.redirect('/')
    }

    const comparePassword = await compare(password, user.password);

    if(!comparePassword){
      await request.flash('error', { message: 'E-mail ou senha inválidos'});
      return response.redirect('/');
    }

    const token = sign({}, process.env.SECRET_KEY, {
      subject: String(user._id)
    });

    request.session.user = {
      token
    }

    return response.redirect(`/usuario/${user._id}`);
  }
}


module.exports = new SessionController();