const assert = require('assert');
const { execSync } = require("child_process");
const path = require('path');

const kunDosieroEligon = (dosiero, funkcio, parametroj) => {
  let eligo = execSync("node idvm-al-bdvm.js -e " + dosiero + parametroj);

  funkcio(eligo.toString());
}

const asertiLaEligonDeLaBajtkodo = (dosierNomo, eligo, parametroj = "") => {
  kunDosieroEligon(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("------\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n------\n")

      for (let i = 0;i < ĉeno.length;i++ ) {
        process.stdout.write("\\" + ĉeno.charCodeAt(i));
      }

      process.stdout.write("\n---\n")

      for (let i = 0;i < eligo.length;i++ ) {
        process.stdout.write("\\" + eligo[i]);
      }

      process.stdout.write("\n------\n")
    }

    assert.ok(ĉeno == eligo);
  }, parametroj)
};

const kunLaEligoDeLaProgramo = (dosiero, funkcio, parametroj = "") => {
  execSync("node idvm-al-bdvm.js " + dosiero + parametroj);

  const dosieroParsita = path.parse(dosiero);
  const bajtkodonDosiero = dosieroParsita.dir + path.sep + dosieroParsita.name + ".bdvm";

  let eligo = execSync("node lanĉi.js " + bajtkodonDosiero);

  funkcio(eligo.toString());
}


const asertiLaEligonDeLaProgramo = (dosierNomo, eligo, parametroj = "") => {
  kunLaEligoDeLaProgramo(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("---\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n---\n")
    }

    assert.ok(ĉeno == eligo);
  }, parametroj)
}

const aserti = assert.ok;

module.exports.asertiLaEligonDeLaBajtkodo = asertiLaEligonDeLaBajtkodo;
module.exports.asertiLaEligonDeLaProgramo = asertiLaEligonDeLaProgramo;
module.exports.aserti = assert.ok;
