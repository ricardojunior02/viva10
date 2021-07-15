# Teste Viva10 - Desenvolvedor NodeJs

## Inicialização

Antes de iniciar o app temos que realizar algumas ações, como instalar as depêndencias do projeto, para instalar as depêndencias podemos rodar o comando yarn ou npm install, o gerenciador de pacotes que preferir, após isso é necessário renomear o arquivo .env.example para .env, e preencher algumas informações dentro dele,
como a variável MONGO_URL que será usada para conexão com o banco de dados, SECRET_KEY que é usado para gerar um token de autenticação, SECRET_SESSION usado pelo express-session para criar sessões no express e por fim a NODE_PORT que é a porta que o nosso servidor irá rodar
Após isso já podemos iniciar o app através do script dev:server, rodando no console yarn dev:server ou npm run dev:server

## Testando o app

Agora já com o app rodando temos acesso a rota principal de login pelo navegador, como ainda não existe nenhum usuário cadastrado, logo abaixo do nosso form de login existe um link para tela de criação de conta, CRIAR CONTA, ao clicar nele será redirecionado a tela de criação de conta onde deve-se fornecer um nome, email e password todos os campos são obrigatórios, o usuário não será criado com uma das informações faltando

Assim que o usuário for criado ele já será logado na aplição,e irá para a tela de detalhes do usuário, onde se pode alterar todas as informações dele ou somente aquelas que desejar, caso queira atualizar a senha, será necessário fornecer a senha atual e uma nova senha, caso fornecer somente a senha atual nada será atualizado, mas se fornecer a senha atual e a nova senha, sua senha será atualizada ou se caso fornecer somente a nova senha terá o retorno de um erro.

No header do app temos um botão de SAIR, que irá encerrar nossa sessão e nos redirecionar para a tela principal de login, onde podemos realizar e testar o login do usuário fornecendo email e senha válidos, caso contrário irá gerar um erro.

Após realizar o login voltamos a tela de detalhes do usuário, onde pode-se testar a última funcionalidade do app a deleção do usuário logado ao clicar no botão vermelho, DELETAR CONTA, e novamente será redirecionado a tela principal.
