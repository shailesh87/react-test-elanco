import axios from 'axios';

const API_BASE_URL = "https://engineering-task.elancoapps.com/api";

class API {
    getRaws(){
        return axios.get(API_BASE_URL+'/raw');
    }

    getApplications(){
        return axios.get(API_BASE_URL+'/applications');
    }

    getApplicationByName(appName:string){
        return axios.get(API_BASE_URL+'/applications/'+ appName);
    }

    getResources(){
        return axios.get(API_BASE_URL+'/resources');
    }

    getResourceByName(resName:string){
        return axios.get(API_BASE_URL+'/resources/'+ resName);
    }
}

const api = new API();
export default api