self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : { title: 'Strefa SLoW', body: 'Nowa wiadomość' };
    const options = {
        body: data.body,
        icon: data.icon || 'logo-slow.png',
        badge: 'logo-slow.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});