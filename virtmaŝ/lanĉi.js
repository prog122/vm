const fs = require("fs");
const kerno = require('./kerno.js');

const dosieroj = process.argv.slice(2);

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node lanĉi.js <vojo al dosiero>")
  process.exit();
}


fs.readFile(dosieroj[0], (err, data) => {
  if (err) throw err;

  let bufro = data;
  const operacioj = [];

  const legiLaSekvanOperacion = () => {
    const indekso = bufro.indexOf(0x0);

    if (indekso != -1) {
      operacioj.push([bufro[0], bufro.slice(1, indekso)]);
      bufro = bufro.slice(indekso + 1);
      return true;
    } else {
      operacioj.push([bufro[0], bufro.slice(1)])
      return false;
    }
  }

  while (legiLaSekvanOperacion()) {
    //
  }

  operacioj.map(tabelo => {
    const parametroj = [];

    while (true) {
      const indekso = tabelo[1].indexOf(0x20);

      if (indekso != -1) {
        parametroj.push(tabelo[1].slice(0, indekso));
        tabelo[1] = tabelo[1].slice(indekso + 1);
      } else {
        parametroj.push(tabelo[1].slice(0));
        break;
      }
    }

    kerno.operaciajKodoj[tabelo[0] - 1][1].apply(null, parametroj);
  });
});
