import axios from "axios";

async function fetchCommerces() {
    try {
        return await axios.get("https://stw-zitation.herokuapp.com/api/companies");
    } catch (error) {
        console.log(error)
    }
}

export {fetchCommerces}
