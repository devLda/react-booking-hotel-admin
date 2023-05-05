import { apiGet, apiURL } from '../../api'

const Url = {
    getAccount: apiURL + 'user'
}

const api = {
    listAccount: (param) => {
        return apiGet(Url.getAccount, {...param});
    }
}

export default api