import { Helpers } from "@clicca-webapp/shared/class/helpers";

export class Enum{

  static implementsTypes = [
    {
      name: 'Enfarfadeira',
      id: 'baler',
    },
    {
      name: 'Distribuidor',
      id: 'distributor',
    },
    {
      name: 'Perfuradora',
      id: 'driller',
    },
    {
      name: 'Forrageira',
      id: 'forage',
    },
    {
      name: 'Ensiladeira',
      id: 'forageHarvester',
    },
    {
      name: 'Vagão Forrageiro',
      id: 'forageWagon',
    },
    {
      name: 'Grade Niveladora',
      id: 'graderGrade',
    },
    {
      name: 'Extratora de Grãos',
      id: 'grainExtractor',
    },
    {
      name: 'Embutidora de Grão',
      id: 'grainStuffer',
    },
    {
      name: 'Colheitadeira',
      id: 'harvester',
    },
    {
      name: 'Vagão Misturador',
      id: 'mixerWagon',
    },
    {
      name: 'Plaina',
      id: 'planer',
    },
    {
      name: 'Arado',
      id: 'plow',
    },
    {
      name: 'Ancinho',
      id: 'rake',
    },
    {
      name: 'Semeadora',
      id: 'seedDrill',
    },
    {
      name: 'Pulverizadora',
      id: 'sprayer',
    },
    {
      name: 'Roçadeira',
      id: 'trimmer',
    },
    // {
    //   name: 'Carroceria',
    //   id: 'truckBody',
    // },
    {
      name: 'Bomba de Água',
      id: 'waterPump',
    },
    {
      name: 'Guincho',
      id: 'winch',
    },
    {
      name: 'Pulverizadora Veículo',
      id: 'sprayerVehicle',
    },
    {
      name: 'Colheitadeira Veículo',
      id: 'harvesterVehicle',
    },
  ].sort(Helpers.dynamicSort("name"));

  static tyreCondition = [
    {
      name: 'Boa',
      id: 'good',
    },
    {
      name: 'Regular',
      id: 'regular',
    },
    {
      name: 'Ruim',
      id: 'bad',
    },
  ].sort(Helpers.dynamicSort("name"));

  static fuel = [
    // {
    //   name: 'Alcool',
    //   id: 'ethanol',
    // },
    {
      name: 'Diesel',
      id: 'diesel',
    },
    {
      name: 'Gasolina',
      id: 'gasoline',
    },
  ].sort(Helpers.dynamicSort("name"));

  static wheelType = [
    {
      name: 'Pneus',
      id: 'wheel',
    },
    {
      name: 'Esteira',
      id: 'driving_wheel',
    },
  ].sort(Helpers.dynamicSort("name"));

  static transmission = [
    {
      name: 'Hidrostático',
      id: 'hydrostatic',
    },
    {
      name: 'Mecânico',
      id: 'mechanical',
    },
  ].sort(Helpers.dynamicSort("name"));

  static precisionAgriculture = [
    {
      name: 'Padrão',
      id: 'standard',
    },
    {
      name: 'Opicional',
      id: 'optional',
    },
  ].sort(Helpers.dynamicSort("name"));

  static cabin = [
    {
      name: 'Com Cabine',
      id: 'true',
    },
    {
      name: 'Sem Cabine',
      id: 'false',
    },
  ].sort(Helpers.dynamicSort("name"));

  



  static states = [
    {
      name: "Acre",
      id: 'AC',
    },
    {
      name: "Alagoas",
      id: 'AL',
    },
    {
      name: "Amapá",
      id: 'AP',
    },
    {
      name: "Amazonas",
      id: 'AM',
    },
    {
      name: "Bahia",
      id: 'BA',
    },
    {
      name: "Ceará",
      id: 'CE',
    },
    {
      name: "Distrito Federal",
      id: 'DF',
    },
    {
      name: "Espírito Santo",
      id: 'ES',
    },
    {
      name: "Goiás",
      id: 'GO',
    },
    {
      name: "Maranhão",
      id: 'MA',
    },
    {
      name: "Mato Grosso",
      id: 'MT',
    },
    {
      name: "Mato Grosso do Sul",
      id: 'MS',
    },
    {
      name: "Minas Gerais",
      id: 'MG',
    },
    {
      name: "Pará",
      id: 'PA',
    },
    {
      name: "Paraíba",
      id: 'PB',
    },
    {
      name: "Paraná",
      id: 'PR',
    },
    {
      name: "Pernambuco",
      id: 'PE',
    },
    {
      name: "Piauí",
      id: 'PI',
    },
    {
      name: "Rio de Janeiro",
      id: 'RJ',
    },
    {
      name: "Rio Grande do Norte",
      id: 'RN',
    },
    {
      name: "Rio Grande do Sul",
      id: 'RS',
    },
    {
      name: "Rondônia",
      id: 'RO',
    },
    {
      name: "Roraima",
      id: 'RR',
    },
    {
      name: "Santa Catarina",
      id: 'SC',
    },
    {
      name: "São Paulo",
      id: 'SP',
    },
    {
      name: "Sergipe",
      id: 'SE',
    },
    {
      name: "Tocantins",
      id: 'TO',
    }
  ].sort(Helpers.dynamicSort("name"));

  static systemSeedDrill = [
    {
      name: 'Arrasto',
      id: 'drag',
    },
    {
      name: 'Articulado',
      id: 'articulated',
    },
    {
      name: 'Hidraulico',
      id: 'hydraulic',
    },
  ].sort(Helpers.dynamicSort("name"));

  static flowType = [
    {
      name: 'Contínuo',
      id: 'continuous',
    },
    {
      name: 'Precisão',
      id: 'precision',
    },
  ].sort(Helpers.dynamicSort("name"));

  static harvest = [
    {
      name: 'Cana',
      id: 'cane',
    },
    {
      name: 'Algodão',
      id: 'cottom',
    },
    {
      name: 'Grãos',
      id: 'grains',
    },
  ].sort(Helpers.dynamicSort("name"));

  static category = {
    truck: 'vehicular',
    truckBody: 'implemental',
    tractorsAndImplements: 'both',
    tractorUnit: 'vehicular',
    bus: 'vehicular',
    tractorAgricultural: 'vehicular',
    agros: 'implemental',
    harvesterVehicle: 'vehicular',
    sprayerVehicle: 'vehicular'
  };

  static categoryToBrand = {
    truck: 'truck',
    truckBody: 'truck_body',
    tractorsAndImplements: 'tractor_unit',
    tractorUnit: 'tractor_unit',
    bus: 'bus',
    tractorAgricultural: 'tractor_agricultural',
    agros: 'implement',
    harvesterVehicle: 'harvester',
    sprayerVehicle: 'sprayer'
  };

  static condition = [
    {
      name: 'Novo',
      id: 'newer',
    },
    {
      name: 'Usado',
      id: 'used',
    },
  ];

  static divisions = [
    {
      name: 'Rodoviário',
      id: 'highway',
    },
    {
      name: 'Urbano',
      id: 'urban',
    },
  ];

  static categoryToBrandImplement = {
    baler: 'baler',
    distributor: 'distributor',
    driller: 'driller',
    forage: 'forage',
    forageHarvester: 'forage_harvester',
    forageWagon: 'forage_wagon',
    graderGrade: 'grader_grade',
    grainExtractor: 'grain_extractor',
    grainStuffer: 'grain_stuffer',
    harvester: 'harvester',
    mixerWagon: 'mixer_wagon',
    planer: 'planer',
    plow: 'plow',
    rake: 'rake',
    seedDrill: 'seed_drill',
    sprayer: 'sprayer',
    trimmer: 'trimmer',
    truckBody: 'truck_body',
    waterPump: 'water_pump',
    winch: 'winch',
    tractorsAndImplements: 'truck_body',
  };

  static titlePage = {
    maquinas: 'Máquinas e Implementos',
    onibus: 'Ônibus e Utilitários',
    offers: 'offers',
    tratores: 'Tratores',
    conjuto: 'Conjunto',
    cavalo: 'Cavalo',
    carroceria: 'Carroceria',
    caminhoes: 'Caminhões',
  }

  static typeOffer = {
    maquinas: 'agros',
    onibus: 'buses',
    offers: 'offers',
    tratores: 'tractor_agriculturals',
    conjuto: 'tractors_and_implements',
    cavalo: 'tractor_units',
    carroceria: 'truck_bodies',
    caminhoes: 'trucks',
  }

  static cities = {
    // tslint:disable-next-line:max-line-length
    AM : ['Alvarães', 'Amaturá', 'Anamã', 'Anori', 'Apuí', 'Atalaia do Norte', 'Autazes', 'Barcelos', 'Barreirinha', 'Benjamin Constant', 'Beruri', 'Boa Vista do Ramos', 'Boca do Acre', 'Borba', 'Caapiranga', 'Canutama', 'Carauari', 'Careiro', 'Careiro da Várzea', 'Coari', 'Codajás', 'Eirunepé', 'Envira', 'Fonte Boa', 'Guajará', 'Humaitá', 'Ipixuna', 'Iranduba', 'Itacoatiara', 'Itamarati', 'Itapiranga', 'Japurá', 'Juruá', 'Jutaí', 'Lábrea', 'Manacapuru', 'Manaquiri', 'Manaus', 'Manicoré', 'Maraã', 'Maués', 'Nhamundá', 'Nova Olinda do Norte', 'Novo Airão', 'Novo Aripuanã', 'Parintins', 'Pauini', 'Presidente Figueiredo', 'Rio Preto da Eva', 'Santa Isabel do Rio Negro', 'Santo Antônio do Içá', 'São Gabriel da Cachoeira', 'São Paulo de Olivença', 'São Sebastião do Uatumã', 'Silves', 'Tabatinga', 'Tapauá', 'Tefé', 'Tonantins', 'Uarini', 'Urucará', 'Urucurituba' ],
    AC : ['Acrelândia',	'Assis Brasil', 'Brasiléia', 'Bujari', 'Capixaba', 'Cruzeiro do Sul', 'Epitaciolândia', 'Feijó', 'Jordão', 'Mâncio Lima', 'Manoel Urbano', 'Marechal Thaumaturgo', 'Plácido de Castro', 'Porto Acre', 'Porto Walter', 'Rio Branco', 'Rodrigues Alves', 'Santa Rosa do Purus', 'Sena Madureira', 'Senador Guiomard', 'Tarauacá', 'Xapuri'],
    AL : [],
    AP : [],
    BA : [],
    CE : [],
    DF : [],
    ES : [],
    GO : [],
    MA : [],
    MG : [],
    MS : [],
    MT : [],
    PA : [],
    PB : [],
    PE : [],
    PI : [],
    PR : [],
    RJ : [],
    RN : [],
    RO : [],
    RR : [],
    RS : [],
    SC : [],
    SE : [],
    SP : [],
    TO : [],


  }




}
