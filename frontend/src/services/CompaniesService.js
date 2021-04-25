import axios from "../services/APICall"


export async function getCompanies() {
    try {
        return await axios.get("https://stw-zitation.herokuapp.com/api/companies");
    } catch (error) {
        console.log(error)
    }
}

export async function searchCompanies(texto) {
    console.log("buscar ", texto)
    if (texto) {
        return await axios.get('companies/',
            {
                params:
                    { name: texto }
            }
        ).then(response => {
            // setResults(response.data)
            console.log("datos", response.data)
            console.log(response.status)
            return response.data
        })
    } else return []
}

export function saveCompany(response) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("logged", true)
    // let company = {
    //     company: true,
    //     first_name: response.name,
    //     email: response.email,
    //     id: response.id,
    //     address: response.address,
    //     categor: response.category
    // }
    localStorage.setItem("flag", "desde companies services")
    localStorage.setItem("company", JSON.stringify(response))
}

export const signUpCompany = async (company) => {
    console.log(company)
    return axios.post(`companies/`, company,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                // setUser({
                //     email: formValue.email,
                // })c
                console.log("exito")
                return true
            } else {
                console.log("error 40x");
                return false
            }
        }).catch(e => {
            console.log('catch error');
            // setApiError(true)
            return false
        })
}


export const updateCompanyInfo = async (companyName) => {
    console.log("updating company data", companyName)
    return await axios.get('companies/',
        {
            params:
                { name: companyName }
        }
    ).then(response => {
        // setResults(response.data)
        console.log("datos", response.data)
        console.log(response.status)
        saveCompany(response.data[0])
        return true
    }).catch( error => {
        console.log(error)
        return false
    })
}

export const postService = async  (service, id) => {
    console.log("registrando nuevo servicio para ", id, " con servicio ", service)
    let url = "companies/"+id+"/services"
    return await axios.post(url, service, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then( response => {
        if (response.status === 200){
            console.log("exito registro servicio")

            console.log("respuesta tras post sercicio",response.data)
            return true
        }
        else {
            console.log("400x posteando servicio")
            return false
        }
    }).catch ( error => {
        console.log ("error posteando nuevo servicio", error)
        return false
    })
}


export const getServices = async  (id) => {
    console.log("cogreidno servicios para ", id)
    let url = "companies/"+id+"/services"
    return await axios.get(url, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then( response => {
        if (response.status === 200){
            console.log("exito get servicio")

            console.log("respuesta tras get sercicio",response.data)
            return response.data
        }
        else {
            console.log("400x get servicio")
            return []
        }
    }).catch ( error => {
        console.log ("error get servicios de",id, " error: " , error)
        return []
    })
}