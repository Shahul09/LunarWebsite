import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/lunar-tech-b2800/us-central1/api'  //API URL (cloud function)
});

export default instance;