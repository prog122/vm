import fs from 'fs';

const logikoDePlurajValoroj = {
  valorojPorRedoni: {},
};

const parametrojApartigilo = 0x1F;
const parametrojApartigilo2 = {
  numero: 124,
  ĉeno: '|'
};

const tipoj = [
  'bulea',
  'entjero',
  'glitkoma-nombro',
  'ĉeno'
];
const tipojInicializiloj = {
  'bulea': (valoro) => {
    throw new Error('...');
  },
  'entjero': (valoro) => {
    throw new Error('...');
  },
  'glitkoma-nombro': (valoro) => {
    throw new Error('...');
  },
  'ĉeno': (valoro) => {
    return valoro.toString();
  }
};

const operaciajKodoj = [
  /* indekso, bajtkodo
  /* 0        1 */ ["eligi", (funkciaObjekto, teksto) => {
    process.stdout.write(teksto.toString());
  }],
  /* 1        2 */ ['revena', (funkciaObjekto) => {
    return funkciaObjekto;
  }],
  /* 2        3 */ ['difini-konstantojn', (funkciaObjekto, ... args) => {
    return args.map(valoro => {
      const indekso = valoro.indexOf(parametrojApartigilo2.ĉeno)
      const tipo = valoro.slice(0, indekso);
      const val = valoro.slice(indekso+1);

      funkciaObjekto.konstantoj.push(tipojInicializiloj[tipoj[tipo]](val));
    });
  }],
  /* 3        4 */ ['eligi-valoron', (funkciaObjekto, registro) => {
    process.stdout.write(funkciaObjekto.registroj[registro]);
    return funkciaObjekto.registroj[registro];
  }],
  /* 4        5 */ ['ŝargi-konstanton', (funkciaObjekto, celaRegistro, fontaRegistro) => {
    funkciaObjekto.registroj[celaRegistro] = funkciaObjekto.konstantoj[fontaRegistro];
    return funkciaObjekto.registroj[celaRegistro];
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
  },
  'difini-konstantojn': (ĉeno) => {
    const rezulto = [];

    for (let i of ĉeno.matchAll(/[(][^)]+[)]/g)) {
      let valoro = i[0].slice(1, -1).split(/\s+/);
      rezulto.push(tipoj.indexOf(valoro[0]) + parametrojApartigilo2.ĉeno + valoro[1]);
    }

    return rezulto;
  }
}

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
const plenumiOperaciojn = (programoDatumoj, funkciaObjekto = {}) => {
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map(datumo => {
    operaciajKodoj[datumo[0]][1].apply(null, [funkciaObjekto].concat(datumo.slice(1)));
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
