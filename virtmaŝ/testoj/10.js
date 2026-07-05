// Ni plenumas la komandojn difini konstantojn, ŝargi konstanton, eligi valoron
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 10\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/10/10.idvm", Buffer.concat([
  Buffer.from([0x3]), // difini-konstantojn
  Buffer.from('3|10'), // (ĉeno 10)
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x5, 48, 31, 48]), // ŝargi-konstanton 0 0
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x4, 48]), // eligi-valoron 0
]), " -npil alia-Esperanto.npil");
helpanto.asertiLaEligonDeLaProgramo("testoj/10/10.idvm", "10", " -npil alia-Esperanto.npil");
