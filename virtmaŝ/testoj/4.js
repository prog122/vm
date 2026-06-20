// Ni plenumas kelkajn komandojn, sed en la dosiero kun komandoj estas linioj plenaj je spacoj
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 4\n");
helpanto.asertiLaEligonDeLaBajtkodo("testoj/4/4.idvm", Buffer.from([0x1, 0x33, 0x0, 0x1, 0x34]));
helpanto.asertiLaEligonDeLaProgramo("testoj/4/4.idvm", "34");
