// Ni plenumas la komandojn difini-fermaĵo, fini-difinon-de-fermaĵo, voki
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 9\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/9/9.idvm", Buffer.concat([
  Buffer.from([0x6, 48]), // difini-fermaĵo 0
  Buffer.from([0x0]), // apartigilo
  Buffer.from([0x1, 57]), // eligi 9
  Buffer.from([0x0]), // apartigilo
  Buffer.from([7]), // fini-difinon-de-fermaĵo
  Buffer.from([0x0]), // apartigilo
  Buffer.from([8, 48]), // voki 0
]));
helpanto.asertiLaEligonDeLaProgramo("testoj/9/9.idvm", "9");
