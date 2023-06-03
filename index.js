const express = require('express');
const { chem, AllChem } = require('rdkit');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/predict', (req, res) => {
  const { smiles } = req.body;

  if (!smiles || !chem.MolFromSmiles(smiles)) {
    return res.status(400).json({ error: 'Invalid SMILES. Please enter a valid SMILES string.' });
  }

  const mol = chem.MolFromSmiles(smiles);
  const fingerprint = AllChem.GetMorganFingerprintAsBitVect(mol, 2);

  // Perform any additional preprocessing on the fingerprint if required

  // Make predictions using your trained model
  const predictions = classifier.predict([fingerprint]);

  // Convert predictions to the desired format
  // ...

  // Return the predictions as JSON response
  res.json({ predictions });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
