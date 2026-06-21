// Ni plenumas ununuran komandon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 6\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/6/6.idvm", Buffer.from([0x2]));
helpanto.asertiLaEligonDeLaProgramo("testoj/6/6.idvm", "");
