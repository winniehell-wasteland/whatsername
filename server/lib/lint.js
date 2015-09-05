var standard = Meteor.npmRequire('standard')

var cwd = process.env.PWD
var files = '{lib,client,model,server}/**/*.js'

var options = {
  cwd: cwd,
  globals: [
    '_',
    'angular',
    'check',
    'models',
    'Meteor',
    'Mongo'
  ]
}

standard.lintFiles(files, options,
  function (err, results) {
    if (err) {
      return console.error(err)
    }

    if (!results.errorCount && !results.warningCount) {
      return
    }

    _.forEach(results.results, function (result) {
      _.forEach(result.messages, function (message) {
        console.error(result.filePath.replace(cwd + '/', '') + ':' + message.line + ': ' + message.message)
      })
    })
  }
)
