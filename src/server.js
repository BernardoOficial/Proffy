const express = require('express');
const server = express();

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

.listen(5500);

// // Chamando o express
// const express = require('express');
// // Iniciando o express
// const server = express();

// const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// // Chamando o nunjucks
// const nunjucks = require('nunjucks')
// // Configurando o nunjucks
// nunjucks.configure('src/views', {
// 	express: server,
// 	noCache: true,
// })

// // Receber os dados do req.body 
// // Isso permiti o cliente enviar os dados pelo método POST e capturarmos através do req.body
// server.use(express.urlencoded({ extended: true }))

// // Falando para o express que tenho arquivos css, javascript etc que pertecem ao projeto.
// server.use(express.static('public'))


// server.get('/', pageLanding)
// server.get('/study', pageStudy)
// server.get('/give-classes', pageGiveClasses)
// server.post('/save-classes', saveClasses)


// // Criando uma porta no servidor
// server.listen(3000)