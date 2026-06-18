const kerno = require('./kerno.js');
const fs = require("fs");
const path = require('path');

const argumentoj = process.argv.slice(2);
const dosieroj = [];

let eligi = false;

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-e') {
    eligi = true;
  } else {
    dosieroj.push(argumentoj[i]);
  }
}

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node idvm-al-bdvm.js <vojo al dosiero>")
  process.stdout.write("\npor kompili dosieron kaj konservi ĝin kun nova finaĵo bdvm")
  process.stdout.write("\n\nnode idvm-al-bdvm.js -e <vojo al dosiero>\npor eligi bajtkodon")
  process.exit();
}

const kompiliDosiero = (dosiero) => {
  fs.readFile(dosiero, "utf8", (err, data) => {
    if (err) {
      console.error("Eraro ĉe legado de dosiero:", err);
      return;
    }

    let eligo = [];
    let bufroGrandeco = 0;

    data.trim().split("\n").map(ĉeno => {
      let indeksoDeSpaco = ĉeno.indexOf(" ");
      let instrukcio = indeksoDeSpaco == -1 ? ĉeno : ĉeno.slice(0, indeksoDeSpaco);
      let parametroj = indeksoDeSpaco == -1 ? [] : ĉeno.slice(indeksoDeSpaco + 1).split(/[ ]+/).map(pĈeno => {
        return pĈeno.trim();
      });

      const parametrojBufro = Buffer.from(parametroj.join(" "));
      eligo.push([Buffer.from([kerno.operaciajKodoAlBajtkodo(instrukcio)]), parametrojBufro]);
      bufroGrandeco += 1 + parametrojBufro.length;
    });

    bufroGrandeco += eligo.length - 1; // 

    const bufro = Buffer.alloc(bufroGrandeco);

    let indekso = 0;
    eligo.map((tabelo, tabeloIndekso) => {
      bufro.writeUInt8(tabelo[0][0], indekso);

      for( let i=0;i<tabelo[1].length;i++) {
        bufro.writeUInt8(tabelo[1][i], indekso + 1);
      }

      if (tabeloIndekso != eligo.length - 1) {
        bufro.writeUInt8(0, indekso + tabelo[1].length + 2);
      }

      indekso += 1 + tabelo[1].length + 1;
    })

    if (eligi) {
      process.stdout.write(bufro);
    } else {
      const parsita = path.parse(dosiero);

      if (parsita.ext == '.bdvm') {
        console.error("La finaĵo de la eniga dosiero ne povas esti \"bdvm\"");
        return;
      }

      const novaDosiero = parsita.dir + path.sep + parsita.name + ".bdvm";
      process.stdout.write('Konservas ' + novaDosiero);

      fs.writeFile(novaDosiero, bufro, (err) => {
        if (err) {
          console.error("Eraro:", err);
          return;
        }
      });
    }
  });
}

kompiliDosiero(dosieroj[0]);
