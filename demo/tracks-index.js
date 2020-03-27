
const demoTracksDir = '/demo-tracks'
const fs = require('fs')

fs.readdir(`./public/${demoTracksDir}`, (err, files) => {
  const tracks = files.map(file => ({
    file: file,
    path: `${demoTracksDir}/${file}`
  }))
  const tracksJSON = JSON.stringify(tracks)
  fs.writeFileSync('./public/demo-tracks.json', tracksJSON)
  console.log(`✔️  Demo tracks index created - ${tracks.length} files`)
})