const User = require('../model/User');
const { hash, compare } = require('bcrypt');
const { verify, sign } = require('jsonwebtoken');

class UserController {
  async index(request, response){
    const { id } = request.params;
    
    const user = await User.findById(id);

    if(!user){
      return response.redirect('/');
    }

    const messagesError = await request.consumeFlash('error');
    const messagesSuccess = await request.consumeFlash('success');

    const { token } = request.session.user;

    const decoded = verify(token, process.env.SECRET_KEY);

    if(!decoded || id !== decoded.sub){
      return response.redirect('/');
    }

    delete user.password;

    return response.render('user', { user, messagesError, messagesSuccess });
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    if(name === '' || email === '' || password === ''){
      await request.flash('error', { message: 'Preencha todos os campos'});
      return response.redirect('/create-account');
    }

    const findExists = await User.findOne({ email });

    if(findExists){
      await request.flash('error', { message: 'Usuário já existe'});
      return response.redirect('/create-account');
    }

    const hashPassword = await hash(password, 8);

    const user = await User.create({ name, email, password: hashPassword });

    const token = sign({}, process.env.SECRET_KEY, {
      subject: String(user._id),
      expiresIn: '7d'
    });

    request.session.user = {
      token
    }

    await request.flash('success', { message: `Bem vindo ${user.name}`});

    return response.redirect(`/usuario/${user._id}`);
  }

  async update(request, response){
    const { id, name, email, password, old_password } = request.body;

    const user = await User.findById(id);

    if(!user){
      return response.redirect('/');
    }

    let hashNewPassword;

    if(password !== '' && old_password === ''){
      await request.flash('error', { message: 'Informe o campo de senha atual para atualizar a senha'});
      return response.redirect(`/usuario/${id}`);
    }else if(password.length > 0 && old_password.length > 0){
      const comparePassword = await compare(old_password, user.password);
      if(!comparePassword){
        await request.flash('error', { message: 'Forneça sua senha atual correta para atualizar'});
        return response.redirect(`/usuario/${id}`)
      }
      hashNewPassword = await hash(password, 8);
    }

    if(email && email !== user.email){
      const findEmailExists = await User.findOne({ email })
      if(findEmailExists){
        await request.flash('error', { message: 'E-mail já está em uso, forneça outro endereço'});
        return response.redirect(`/usuario/${user._id}`)
      }
    }

    await user.updateOne({
      name: name || user.name,
      email: email.trim() || user.email,
      password: hashNewPassword || user.password
    });

    await request.flash('success', { message: 'Usuário atualizado com sucesso!'})

    return response.redirect(`/usuario/${id}`);
  }

  async delete(request, response){
    const { id } = request.body;
    const { token } = request.session.user;

    const decoded = verify(token, process.env.SECRET_KEY);

    if(!decoded){
      return response.redirect('/')
    }

    const { sub } = decoded;

    if(id !== sub){
      return response.render('/')
    }
    
    await User.findByIdAndDelete(id);

    await request.flash('success', { message: 'Usuário deletado' })

    return response.redirect('/')
  }
}


module.exports = new UserController();