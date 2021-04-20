import axios from "./AuthService"
import { useContext } from "react";


function saveUserInfo(response, check) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("logged", true)
    if (check) {
        // setUser({
        //     first_name: response.company.name,
        //     email: response.company.email,
        //     id: response.company.id,
        // })
        let company = {
            company: true,
            first_name: response.company.name,
            email: response.company.email,
            id: response.company.id
        }
        localStorage.setItem("user", JSON.stringify(company))
    }

    else {
        // setUser({
        //     first_name: response.user.first_name ,
        //     email: response.user.email ,
        //     id: response.user.id ,
        //     last_name: response.user.last_name,
        //     phone: response.user.phone,
        // })
        let user = {
            company: false,
            first_name: response.user.first_name ,
            email: response.user.email ,
            id: response.user.id ,
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
            }
            // history.push('/home')
            // setLoading(false);
            return true
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
