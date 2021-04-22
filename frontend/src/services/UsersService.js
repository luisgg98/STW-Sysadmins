import axios from "../services/APICall"

export const getUsers = async () => {
    return await axios.get('users/')
}

async function removeUser(userId) {
    return await axios.delete('users/' + userId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }
    )
}

function saveUserInfo(response, isCompany) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("logged", true)
    if (isCompany) {
        let company = {
            company: true,
            first_name: response.company.name,
            email: response.company.email,
            id: response.company.id
        }
        localStorage.setItem("user", JSON.stringify(company))
    } else {
        let user = {
            company: false,
            first_name: response.user.first_name,
            email: response.user.email,
            id: response.user.id,
            last_name: response.user.last_name,
            phone: response.user.phone,
        }
        localStorage.setItem("user", JSON.stringify(user))
    }
}


export const loginUser = (url, user, check) => {
    return axios.post(url,
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
        if (response.status === 200) {
            console.log("repsonse ", response.data)
            saveUserInfo(response.data, check)
            return true
        } else return false
        // history.push('/home')
        // setLoading(false);
    }).catch((error) => {
        // setApiError(true);
        console.log("erorr catch", error);
        // setForm({
        //     email: '',
        //     password: ''
        // })
        // setLoading(false);
        return false
    })
}
export const signUpUser = async (data) => {
    console.log("handling petition to signup ");
    return axios.post(`users/`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
        if (response.status === 200) {
            console.log("exito sigunup user")
            return true
        } else {
            console.log("error 40x");
            return false
        }
    }).catch(e => {
        console.log('catch error');
        return false
    })
}


export const updateUserData = (id, newData) => {
    return axios.patch('users/' + id, newData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }).then(response => {
        if (response.status === 200) {
            console.log("datos actualizados")
            // setUpdate(true)
            return {error: false, update: true}
        } else {
            console.log("error 40x");
            // setErrorr(true)
            return {error: true}
        }
        console.log(response.status);
    }).catch((e) => {
        // setErrorr(true)
        console.log('catch error');
        console.log(e)
        return {error: true}
    })
}


