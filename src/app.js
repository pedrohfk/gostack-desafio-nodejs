const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs }  = request.body;

  const dados = { id: uuid(),
                  title, 
                  url,
                  techs,
                  likes: 0}


  repositories.push(dados);

  return response.json(dados);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indiceRepositories = repositories.findIndex(a => a.id === id);

  if (indiceRepositories < 0){
    return response.status(400).json({error: 'NAO ENCONTRADO'});
  }


  repositories[indiceRepositories] = {
    id,
    title: title ? title : repositories[indiceRepositories].title,
    url: url ? url : repositories[indiceRepositories].url,
    techs: techs ? techs : repositories[indiceRepositories].techs,
    likes: repositories[indiceRepositories].likes
  }

  return response.json(repositories[indiceRepositories]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indiceRepositories = repositories.findIndex(a => a.id === id);

  if (indiceRepositories < 0){
    return response.status(400).json({error: 'NOT FOUND'});
  }

  repositories.splice(indiceRepositories, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const info = repositories.find(a => a.id === id);
  const indiceRepositories = repositories.findIndex(a => a.id === id);

  if (indiceRepositories < 0){
    return response.status(400).json({error: 'NAO ENCONTRADO'});
  }

  repositories[indiceRepositories].likes += 1;        

  return response.json(repositories[indiceRepositories]);
});

module.exports = app;
