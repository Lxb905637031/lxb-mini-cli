const fs = require('fs')
const path = require('path')

const ejs = require('ejs')

const ejsComplie = (templatePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {
      data
    }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve(str)
    })
  })
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    console.log('the file already exists~')
    return
  }
  return fs.promises.writeFile(path, content)
}

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const handleEjsToFile = async (name, dest, template, filename) => {
  // 获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template)
  const result = await ejsComplie(templatePath, {
    name,
    lowerName: name.toLowerCase()
  })

  // 文件不存在，创建文件
  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)

  // 写入文件
  writeFile(targetPath, result)
}

module.exports = {
  handleEjsToFile
}