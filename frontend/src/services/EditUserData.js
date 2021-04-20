import axios from "./AuthService"


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