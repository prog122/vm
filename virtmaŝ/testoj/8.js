// Ni plenumas la komandojn difini konstantojn, ŝargi konstanton, eligi valoron
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 8\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/8/8.idvm", Buffer.concat([
  Buffer.from([0x3]), // difini-konstantojn
  Buffer.from('3|11-2'), // (ĉeno 11-2)
  Buffer.from([0x1F]), // apartigilo
  Buffer.from('3|plenumi-dosieron'), // (ĉeno plenumi-dosieron)
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x5, 48, 31, 48]), // ŝargi-konstanton 0 0
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x5, 49, 31, 49]), // ŝargi-konstanton 0 0
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x4, 48]), // eligi-valoron 0
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x4, 49]), // eligi-valoron 1
]));
helpanto.asertiLaEligonDeLaProgramo("testoj/8/8.idvm", "11-2plenumi-dosieron");
