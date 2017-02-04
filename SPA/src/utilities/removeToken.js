export default function removeToken() {
    localStorage.removeItem('_id')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
}