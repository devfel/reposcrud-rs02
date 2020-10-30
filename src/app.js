const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;
  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const reposToUpdateIndex = repositories.findIndex((elem) => elem.id === id);

  if (reposToUpdateIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  const reposUpdated = {
    id,
    title,
    url,
    techs,
    likes: repositories[reposToUpdateIndex].likes,
  };

  repositories[reposToUpdateIndex] = reposUpdated;
  return response.json(reposUpdated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const reposToDeleteIndex = repositories.findIndex((elem) => elem.id === id);
  if (reposToDeleteIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  repositories.splice(reposToDeleteIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const reposToUpdateIndex = repositories.findIndex((elem) => elem.id === id);
  if (reposToUpdateIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  repositories[reposToUpdateIndex].likes++;
  return response.json(repositories[reposToUpdateIndex]);
});

module.exports = app;
