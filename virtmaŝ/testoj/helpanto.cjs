const assert = require('assert');
const { exec } = require("child_process");
const path = require('path');

const kunDosieroEligon = (dosiero, funkcio, parametroj) => {
  exec("node idvm-al-bdvm.js -e " + dosiero + parametroj, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
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
  exec("node idvm-al-bdvm.js " + dosiero + parametroj, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    const dosieroParsita = path.parse(dosiero);
    const bajtkodonDosiero = dosieroParsita.dir + path.sep + dosieroParsita.name + ".bdvm";

    exec("node lanĉi.js " + bajtkodonDosiero, (error, stdout, stderr) => {
      if (error) {
        console.error(`Eraro: ${error.message}`);
        return;
      }

      funkcio(stdout);
    });
  });
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
