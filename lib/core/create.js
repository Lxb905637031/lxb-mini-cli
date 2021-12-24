const program = require('commander')

const {
  createProject,
  addComponent,
  addPage,
  addStore
} = require('./actions')

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject)

  //  创建组件指令
  program
    .command('addcpn <name>')
    .description('add vue component, ie: lxb addcpn NavBar [-d src/components]')
    .action((name) => addComponent(name, program.dest || 'src/components'))

  // 创建页面指令
  program
    .command('addpage <name>')
    .description('add vue page, ie: lxb addpage Home [-d dest]')
    .action((name) => {
      addPage(name, program.dest || `src/pages/${name.toLowerCase()}`)
    })

  // 创建store模块指令
  program
    .command('addstore <name>')
    .description('add vue store, ie: lxb addstore shoppingCart [-d dest]')
    .action((name) => {
      addStore(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
    })
}

module.exports = createCommands