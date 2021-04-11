const mockupCommerces = [{_id: 1, name: "El patio de Fran", location: {lat: 41.6443448, lng: -0.8977682}},
    {_id: 2, name: "London", location: {lat: 41.6411405, lng: -0.8966766}}]

function fetchCommerces() {
    // TODO: Añadir parametros para los filtros
    return mockupCommerces;
}

export {fetchCommerces}
