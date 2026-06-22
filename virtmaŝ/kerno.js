import fs from 'fs';

const logikoDePlurajValoroj = {
  valorojPorRedoni: {},
};

const operaciajKodoj = [
  /* indekso, bajtkodo
  /* 0        1 */ ["eligi", (teksto) => {
    process.stdout.write(teksto.toString());
  }],
  /* 1        2 */ ['revena', () => {
  }]
];

const operaciajKodoAlBajtkodo = (ĉeno, npilTabelo = {}) => {
  for ( let i=0;i<operaciajKodoj.length;i++ ) {
    if (npilTabelo[ĉeno]) {
      ĉeno = npilTabelo[ĉeno];
    }

    if (operaciajKodoj[i][0] == ĉeno) {
      return i+1;
    }
  }

  throw new Error("Nekonata operacio " + ĉeno);
}

const specifajParsajFunkcioj = {
  eligi: (ĉeno) => {
    return [ ĉeno ];
  }
}

const parametrojApartigilo = 0x1F;

// <instrukcio> <ĉeno> -> [param1, param2, param3]
const parsadoDeLaParametrojDeKomando = (instrukcio, ĉeno) => {
  if (specifajParsajFunkcioj[instrukcio]) {
    return specifajParsajFunkcioj[instrukcio](ĉeno);
  } else {
    return ĉeno.split(/[ ]+/).map(pĈeno => {
      return pĈeno.trim();
    });
  }
};

// [[0, "teksto"]]
const plenumiOperaciojn = (programoDatumoj) => {
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map(datumo => {
    operaciajKodoj[datumo[0]][1].apply(null, datumo.slice(1));
  });
};

// [["eligi", "teksto"]]
const plenumiOperaciojn2 = (programoDatumoj, npilTabelo = {}) => {
  const interŝanĝita = Object.fromEntries(
    Object.entries(npilTabelo).map(([ŝlosilo, valoro]) => [valoro, ŝlosilo])
  );
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map(datumo => {
    if (!interŝanĝita[datumo[0]]) {
      operaciajKodoj[operaciajKodoAlBajtkodo(datumo[0]) - 1][1].apply(null, datumo.slice(1));
    } else {
      operaciajKodoj[operaciajKodoAlBajtkodo(interŝanĝita[datumo[0]]) - 1][1].apply(null, datumo.slice(1));
    }
  });
};

const legiLaTabelonNPIL = (dosiero) => {
  let tabelo = {};

  try {
    let datumoj = fs.readFileSync(dosiero, "utf8").trim();
    datumoj.split("\n").map(linio => {
      let [valoro, ŝlosilo] = linio.trim().split(" ");
      tabelo[ŝlosilo] = valoro;
    });
  } catch(eraro) {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return null;
    }
  }

  return tabelo;
};

export { operaciajKodoj, operaciajKodoAlBajtkodo, parsadoDeLaParametrojDeKomando, parametrojApartigilo, plenumiOperaciojn, plenumiOperaciojn2, legiLaTabelonNPIL };
