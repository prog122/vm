// Ni plenumas ununuran komandon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 7\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/7/7.idvm", Buffer.from([0x1, 0x37]), " -npil alia-Esperanto.npil");
helpanto.asertiLaEligonDeLaProgramo("testoj/7/7.idvm", "7", " -npil alia-Esperanto.npil");
