import axios from "./AuthService"

export function saveCompany(response) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("logged", true)
    let company = {
        company: true,
        first_name: response.name,
        email: response.email,
        id: response.id,
        address: response.address,
        categor: response.category
    }
    localStorage.setItem("user", JSON.stringify(company))
}

export const signUpCompany = async (company) => {
    console.log(company)
    return  axios.post(`companies/`, company,
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