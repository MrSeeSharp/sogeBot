/* global describe it beforeEach */
if (require('cluster').isWorker) process.exit()

require('../../general.js')

const db = require('../../general.js').db
const message = require('../../general.js').message

// users
const owner = { username: 'soge__' }

describe('Alias - visible()', () => {
  beforeEach(async () => {
    await db.cleanup()
    await message.prepare()
  })

  it('', async () => {
    global.systems.alias.visible(global.systems.alias, owner, '')
    await message.isSent('alias.alias-parse-failed', owner, { sender: owner.username })
  })

  it('!unknown', async () => {
    global.systems.alias.visible(global.systems.alias, owner, '!unknown')
    await message.isSent('alias.alias-was-not-found', owner, { alias: 'unknown', sender: owner.username })
  })

  it('!a', async () => {
    global.systems.alias.add(global.systems.alias, owner, '!a !uptime')
    await message.isSent('alias.alias-was-added', owner, { alias: 'a', command: 'uptime', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!a')
    await message.isSent('alias.alias-was-concealed', owner, { alias: 'a', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!a')
    await message.isSent('alias.alias-was-exposed', owner, { alias: 'a', sender: owner.username })
  })

  it('!a with spaces', async () => {
    global.systems.alias.add(global.systems.alias, owner, '!a with spaces !uptime')
    await message.isSent('alias.alias-was-added', owner, { alias: 'a with spaces', command: 'uptime', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!a with spaces')
    await message.isSent('alias.alias-was-concealed', owner, { alias: 'a with spaces', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!a with spaces')
    await message.isSent('alias.alias-was-exposed', owner, { alias: 'a with spaces', sender: owner.username })
  })

  it('!한국어', async () => {
    global.systems.alias.add(global.systems.alias, owner, '!한국어 !uptime')
    await message.isSent('alias.alias-was-added', owner, { alias: '한국어', command: 'uptime', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!한국어')
    await message.isSent('alias.alias-was-concealed', owner, { alias: '한국어', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!한국어')
    await message.isSent('alias.alias-was-exposed', owner, { alias: '한국어', sender: owner.username })
  })

  it('!русский', async () => {
    global.systems.alias.add(global.systems.alias, owner, '!русский !uptime')
    await message.isSent('alias.alias-was-added', owner, { alias: 'русский', command: 'uptime', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!русский')
    await message.isSent('alias.alias-was-concealed', owner, { alias: 'русский', sender: owner.username })

    global.systems.alias.visible(global.systems.alias, owner, '!русский')
    await message.isSent('alias.alias-was-exposed', owner, { alias: 'русский', sender: owner.username })
  })
})
