const {
  promisify
} = require('util')

const downloadRepo = promisify(require('download-git-repo'))
const open = require('open')

const repoConfig = require('../config/repo_config')
const terminal = require('../utils/terminal')
const {
  handleEjsToFile
} = require('../utils/file')

const createProject = async (project) => {
  // 从仓库中clone项目
  await downloadRepo(repoConfig.vueGitRepo, project, {
    clone: true
  })

  // 执行终端命令npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await terminal.spawnCommand(npm, ['install'], {
    cwd: `./${project}`
  })

  // 打开浏览器
  open('http://localhost:8080/')

  // 执行npm run serve
  await terminal.spawnCommand(npm, ['run', 'serve'], {
    cwd: `./${project}`
  })
}

// 添加组件
const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
}

// 添加页面
const addPage = async (name, dest) => {
  addComponent(name, dest)
  handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}

// 添加store模块
const addStore = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
  handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addStore
}