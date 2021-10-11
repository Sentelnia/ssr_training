import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App />); //Nous utilisons une méthode de ReactDOMServer, renderToString pour obtenir un rendu de notre app sur une chaîne HTML statique.
  
    // Ensuite, nous lisons le fichier statique index.html de l'app client créée, nous injectons le contenu statique de notre app dans le <div> avec un id « root » et envoyons cela sous forme de réponse à la requête.
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
  
  app.use(express.static('./build')); //Nous indiquons à Express de desservir le contenu du répertoire build sous forme de fichiers statiques.
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });