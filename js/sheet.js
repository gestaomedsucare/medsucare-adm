// sheets.js
// Responsável APENAS por ler dados do Google Sheets (modo CSV)
// Não executa nada automaticamente

async function loadSheet(sheetName) {
  const url =
    'https://docs.google.com/spreadsheets/d/' +
    CONFIG.SHEET_ID +
    '/gviz/tq?tqx=out:csv&sheet=' +
    encodeURIComponent(sheetName);

  const response = await fetch(url);
  const csvText = await response.text();

  return csvToObjects(csvText);
}

function csvToObjects(csv) {
  const lines = csv.split('\n').filter(l => l.trim() !== '');
  if (lines.length === 0) return [];

  const headers = lines[0]
    .split(',')
    .map(h => h.trim());

  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index]
        ? values[index].trim()
        : '';
    });

    data.push(obj);
  }

  return data;
}
