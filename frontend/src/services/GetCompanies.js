import axios from "../services/APICall"


export const getCompanies = async (texto) => {
    console.log("buscar ", texto)
    if (texto) {
        return await axios.get('companies/',
            {
                params:
                    {name: texto}
            }
        ).then(response => {
            // setResults(response.data)
            console.log("datos", response.data)
            console.log(response.status)
            return response.data
        })
    } else return []
}
