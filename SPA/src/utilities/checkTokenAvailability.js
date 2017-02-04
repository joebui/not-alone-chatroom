export default function checkTokenAvailability(nextState, replace, callback) {    
    var token = localStorage.token    
    if (!token) {        
        replace('/login')
    }

    callback()
}
