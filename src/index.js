import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Nous indiquons au moteur de rendu DOM que nous allons réhydrater l'app une fois qu'un rendu sera obtenu côté serveur.(méthode hydratation)

ReactDOM.hydrate(<App />, document.getElementById('root'));
