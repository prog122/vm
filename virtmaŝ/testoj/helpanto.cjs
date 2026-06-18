const assert = require('assert');
const { exec } = require("child_process");
const path = require('path');

const kunDosieroEligon = (dosiero, funkcio) => {
  exec("node idvm-al-bdvm.js -e " + dosiero, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
}

const asertiLaEligonDeLaBajtkodo = (dosierNomo, eligo) => {
  kunDosieroEligon(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("---\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n---\n")
    }

    assert.ok(ĉeno == eligo);
  })
};

const kunLaEligoDeLaProgramo = (dosiero, funkcio) => {
  exec("node idvm-al-bdvm.js " + dosiero, (error, stdout, stderr) => {
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


const asertiLaEligonDeLaProgramo = (dosierNomo, eligo) => {
  kunLaEligoDeLaProgramo(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("---\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n---\n")
    }

    assert.ok(ĉeno == eligo);
  })
}

const aserti = assert.ok;

module.exports.asertiLaEligonDeLaBajtkodo = asertiLaEligonDeLaBajtkodo;
module.exports.asertiLaEligonDeLaProgramo = asertiLaEligonDeLaProgramo;
module.exports.aserti = assert.ok;
