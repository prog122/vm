// Ni plenumas ununuran komandon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 5\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/5/5.idvm", Buffer.from([0x1, 0x35, 0x20, 0x20, 0x20, 0x20, 0x20, 0x35]));
helpanto.asertiLaEligonDeLaProgramo("testoj/5/5.idvm", "5     5");
