module.exports = {
    fileName: 'manifest.json',
    name: 'pwa-news',
    shortName: 'pwa-news',
    icons: [
        {
            src: '/static/img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
        },
        {
            src: '/static/img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
        }
    ],
    startUrl: '/',
    display: 'standalone',
    backgroundColor: '#fff',
    themeColor: '#3e98f0'
};
