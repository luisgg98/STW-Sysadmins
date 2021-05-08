import axios from "../services/APICall"

export function getCompanyOpinions(company_nif) {
    return axios.get("companies/" + company_nif + "/opinions/");
}

export async function createCompanyOpinion(company_nif, opinion, stars, user_id) {
    await axios.post("companies/" + company_nif + "/opinions",
        {
            comment: opinion,
            user_id: user_id,
            stars: stars
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }).then(response => {
        if (response.status === 200) {
            console.log("Exito nuevo comentario")
            return response.data
        } else {
            console.log("error 40x");
            return false
        }
    }).catch(e => {
        console.log('catch error', e);
        return false
    })
}
