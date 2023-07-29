module.exports = {
  apps: [{
    name: 'tokopay-pay',
    exec_mode: 'cluster',
    port: 5010,
    instances: 'max', // sesuaikan dengan core atau bisa isi max untuk menggunakan semua core
    script: './.output/server/index.mjs'
  }]
}
