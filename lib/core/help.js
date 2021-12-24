const program = require('commander')

const helpOptions = () => {
  program.option('-l --lxb', 'a lxb option')

  program.option('-s --src <src>', 'a source folder')
  program.option('-d --dest <dest>', 'a destionation folder ie: -d src/components')
  program.option('-f --framework <framework>', 'your framework name')

  program.on('--help', () => {
    console.log('')
    console.log('usage')
    console.log(' lxb -v')
    console.log(' lxb -version')
  })
}

module.exports = helpOptions