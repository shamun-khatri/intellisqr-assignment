import axios from "axios";

const url = "http://127.0.0.1:5000/api/v1/getallemployee";

export const fetchDataFromApi = async () => {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
}