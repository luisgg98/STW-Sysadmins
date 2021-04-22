import axios from "../services/APICall"

export const getUsers = async () => {
    return await axios.get('users/')
}

