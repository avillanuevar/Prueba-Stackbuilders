import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
          baseURL: 'http://localhost:7000',
          withCredentials: true // RUTAS PERSISTENTES
        });
    }

    getEntities = () => this._service.get(`/`);
}