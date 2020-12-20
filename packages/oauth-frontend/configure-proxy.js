const fs = require('fs')
const proxyTo = process.env.PROXY_TO

const packageInfo = require('./package.json')

if (!proxyTo) throw new Error('PROXY_TO not defined')

packageInfo.proxy = proxyTo

fs.writeFileSync(__dirname + '/package.json', JSON.stringify(packageInfo, null, 2), 'utf-8')
