import axios from "axios";

export async function secureFetch(url, requested_data = {}, method = "POST", auth_token = null){
    try{
        console.log("Secure Fetch Called", requested_data);
        const req = requested_data ?? {};

        const headers = {
            'Content-Type': 'application/json',
        }

        if(auth_token){
            headers['Authorization'] = `Bearer ${auth_token}`;
        }

        const axiosConfig = {
            method,
            url,
            headers,
            data: req
        };

        try {
            const resp = await axios(axiosConfig);
            console.log("resp: ", resp);
            return resp;
        } catch (error) {
            console.log("Error in secure Fetch: ", error);
        }

    } catch(error){
        console.error(error);
        return error;
    }
}