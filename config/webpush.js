const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
    'mailto:739202@unizar.es',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

module.exports = {
    publicKey:vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey,
    webpush :webpush
};


