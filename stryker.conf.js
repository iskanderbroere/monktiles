module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress'],
    testRunner: 'command',
    coverageAnalysis: 'off'
  })
}
