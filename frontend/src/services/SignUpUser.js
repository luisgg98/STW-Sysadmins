import axios from "./AuthService"

export const signUpUser = async (data) => {
    console.log("handling petition to signup ");
    return axios.post(`users/`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                // setUser({
                //     email: formValue.email,
                // })
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

