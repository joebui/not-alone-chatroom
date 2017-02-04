export default function saveToLocalStorage(userData) {
    localStorage._id = userData._id
    localStorage.username = userData.username
    localStorage.token = userData.token
}