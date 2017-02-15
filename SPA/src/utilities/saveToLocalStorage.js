export default function saveToLocalStorage(userData) {    
    localStorage.username = userData.username
    localStorage.token = userData.token
}