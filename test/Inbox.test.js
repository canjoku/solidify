const assert = require('assert')
const ganache =  require ('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');


let accounts;
let inbox;
let INITIAL_MESSAGE = 'Hi There'
let SECOND_MESSAGE = 'I am here'
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(abi).deploy({data: evm.bytecode.object, arguments: [INITIAL_MESSAGE]}).send({from: accounts[0], gas: '1000000'})
    console.log(inbox)
})

describe('Inbox', ()=> {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('returns the set message', async () => {
        const message = await inbox.methods.message().call()
        assert.ok(message)
        assert.equal(message, INITIAL_MESSAGE)
    })

    it('set a message property', async () => {
        await inbox.methods.setMessage(SECOND_MESSAGE).send({from: accounts[0], gas: '1000000'})
        const message = await inbox.methods.message().call();
        assert.ok(message)
        assert.equal(message, SECOND_MESSAGE)
    })
})
