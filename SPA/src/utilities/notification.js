export default function sendNotification(msg) {
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
    } else if (Notification.permission === 'granted') {
        notification(msg)
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
            if (permission === 'granted') notification(msg)
        })
    }
}

function notification(msg) {
    new Notification(msg.username, {
        icon: 'images/logo.png',
        body: msg.message
    })
}