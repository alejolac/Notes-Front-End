import axios from 'axios'
const baseUrl = 'https://backend-notes-mongodb-alejolac.onrender.com/api/notes'

const GetAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data) 
}

const Create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
    .catch(error => {
        alert(error.message)
    })
}

const Delete = id => {
    if(id == "64480ef9733d623b9428bfbc") {
        alert("You can't delete this note")
        return
    }
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { GetAll, Create, Update, Delete }