/* global describe it beforeEach */
if (require('cluster').isWorker) process.exit()

require('../../general.js')

const db = require('../../general.js').db
const message = require('../../general.js').message

// users
const owner = { username: 'soge__' }

describe('Custom Commands - run()', () => {
  beforeEach(async () => {
    await db.cleanup()
    await message.prepare()
  })

  it('!a will show Lorem Ipsum', async () => {
    global.systems.customCommands.add(global.systems.customCommands, owner, '!a Lorem Ipsum')
    await message.isSent('customcmds.command-was-added', owner, { command: 'a', response: 'Lorem Ipsum', sender: owner.username })

    global.systems.customCommands.run(global.systems.customCommands, owner, '!a')
    await message.isSentRaw('Lorem Ipsum', owner)

    global.systems.customCommands.remove(global.systems.customCommands, owner, '!a')
    await message.isSent('customcmds.command-was-removed', owner, { command: 'a', sender: owner.username })
  })

  it('!한글 will show Lorem Ipsum', async () => {
    global.systems.customCommands.add(global.systems.customCommands, owner, '!한글 Lorem Ipsum')
    await message.isSent('customcmds.command-was-added', owner, { command: '한글', response: 'Lorem Ipsum', sender: owner.username })

    global.systems.customCommands.run(global.systems.customCommands, owner, '!한글')
    await message.isSentRaw('Lorem Ipsum', owner)

    global.systems.customCommands.remove(global.systems.customCommands, owner, '!한글')
    await message.isSent('customcmds.command-was-removed', owner, { command: '한글', sender: owner.username })
  })

  it('!русский will show Lorem Ipsum', async () => {
    global.systems.customCommands.add(global.systems.customCommands, owner, '!русский Lorem Ipsum')
    await message.isSent('customcmds.command-was-added', owner, { command: 'русский', response: 'Lorem Ipsum', sender: owner.username })

    global.systems.customCommands.run(global.systems.customCommands, owner, '!русский')
    await message.isSentRaw('Lorem Ipsum', owner)

    global.systems.customCommands.remove(global.systems.customCommands, owner, '!русский')
    await message.isSent('customcmds.command-was-removed', owner, { command: 'русский', sender: owner.username })
  })
})
