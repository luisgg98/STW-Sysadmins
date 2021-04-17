
const hz = require('../services/healthzone');

let dict = [
    {title:'Delicias Sur',coordinates: [ 41.6454753, -0.9040533]},
    {title:'Delicias Norte',coordinates: [ 41.6566831, -0.9066919]},
    {title:'Maria De Huerva',coordinates:  [41.5381825, -0.9974129]},
    {title:'Sagasta-Ruiseñores',coordinates:  [41.6417716, -0.8865430]},
    {title:'Bombarda',coordinates:  [41.6529868, -0.9169522]},
    {title:'Parque Goya',coordinates:  [41.6887818, -0.8760136]},
    {title:'Torrero La Paz',coordinates: [ 41.6237795, -0.8745683]},
    {title:'Universitas',coordinates: [ 41.6470938, -0.9138608]},
    {title:'Valdespartera-Montecanal',coordinates: [ 41.6210346, -0.9241551]},
    {title:'Hernan Cortes',coordinates: [ 41.6473775, -0.8910280]},
    {title:'San Jose Sur',coordinates: [ 41.6335924, -0.8862233]},
    {title:'Actur Oeste',coordinates: [  41.6714917, -0.8920278]},
    {title:'Oliver',coordinates: [41.6520756, -0.9303690]},
    {title:'Reboleria',coordinates:[ 41.6530304, -0.8707247]},
    {title:'Santa Isabel',coordinates:[ 41.6669476, -0.8367052]},
    {title:'Valdefierro',coordinates:[41.6408789, -0.9341287]},
    {title:'Casetas',coordinates:[41.7215553, -1.0249421]},
    {title:'Miralbueno-Garrapinillos',coordinates: [41.6605508, -0.9383961]},
    {title:'San Jose Centro',coordinates:[41.6379032, -0.8719980]},
    {title:'Torre Ramona',coordinates:[41.6408113, -0.8625888]},
    {title:'Actur Norte',coordinates:[41.6754062, -0.8864836]},
    {title:'Arrabal',coordinates:[41.6616577, -0.8778052]},
    {title:'Avenida Cataluña',coordinates:[41.6643921, -0.8594235]},
    {title:'Fernando El Catolico',coordinates:[ 41.6401679, -0.9011641]},
    {title:'San Pablo',coordinates:[41.6568552, -0.8870375]},
    {title:'Zalfonada',coordinates:[41.6678384, -0.8718896]},
    {title:'Independencia',coordinates:[ 41.6522653, -0.8867051]},
    {title:'Madre Vedruna-Miraflores',coordinates:[41.6414607, -0.8798026]},
    {title:'Romareda - Seminario',coordinates:[ 41.6341853, -0.9089326]},
    {title:'San Jose Norte',coordinates:[41.6425469, -0.8707120]},
    {title:'Actur Sur',coordinates:[41.6624861, -0.8850272]},
    {title:'Almozara',coordinates:[41.6596976, -0.9050814]},
    {title:'Venecia',coordinates:[41.6177109, -0.8760552]},
    {title:'Las Fuentes Norte',coordinates:[ 41.6500104, -0.8640097]},
    {title:'Las Fuentes Sur',coordinates:[ 41.6446790, -0.8637250]}
]

/**
 *
 */
function loadCouncilInfo() {
    for (const i of dict) {
        let title = i.title;
        let coordinates = i.coordinates;
        hz.saveHealthzone(title, coordinates).then(() => {

        }).catch((e) => {
                console.log("Error saving:" + title);
                console.log(e);
            });
        }
        // Success!
}

module.exports.loadCouncilInfo = loadCouncilInfo;




