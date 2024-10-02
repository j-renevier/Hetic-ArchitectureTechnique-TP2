const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Endpoint pour effectuer un calcul
app.post('/calcul', (req, res) => {
  const { operation } = req.body;
  try {
    // Effectuer le calcul
    const result = eval(operation);

    // Stocker dans la base de données
    const query = 'INSERT INTO historique (operation, resultat) VALUES (?, ?)';
    db.query(query, [operation, result], (err) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de l\'insertion dans la base de données.' });
      res.json({ result });
    });
  } catch (error) {
    res.status(400).json({ error: 'Opération non valide.' });
  }
});

// Endpoint pour récupérer l'historique
app.get('/historique', (req, res) => {
  const query = 'SELECT * FROM historique ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique.' });
    res.json(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
