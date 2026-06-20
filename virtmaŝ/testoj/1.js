// Ni plenumas ununuran komandon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 1\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/1/1.idvm", Buffer.from([0x1, 0x31]));
helpanto.asertiLaEligonDeLaProgramo("testoj/1/1.idvm", "1");
