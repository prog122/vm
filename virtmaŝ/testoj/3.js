// Ni plenumas ununuran komandon, sed la linio estas plena je spacoj
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 3\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/3/3.idvm", Buffer.from([0x1, 0x33]));
helpanto.asertiLaEligonDeLaProgramo("testoj/3/3.idvm", "3");
