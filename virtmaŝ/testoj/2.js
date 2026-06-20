// Ni plenumas kelkajn komandojn
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 2\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/2/2.idvm", Buffer.from([0x1, 0x31, 0x0, 0x1, 0x32]));
helpanto.asertiLaEligonDeLaProgramo("testoj/2/2.idvm", "12");
