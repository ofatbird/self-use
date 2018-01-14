var poweroff = require('power-off')
poweroff(function (err, stderr, stdout) {
  if (!err && !stderr) {
    console.log(stdout)
  }
})
