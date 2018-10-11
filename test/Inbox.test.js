const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile')

let accounts;
let inbox;
beforeEach(async()=>{
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // use one of those to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["tony", "njoku"] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', ()=>{
  it('deploys a contract', ()=>{
    assert.ok(inbox.options.address)
  })

  it('has a default name', async()=>{
    const name = await inbox.methods.name().call();
    assert.equal(name, 'tony')
  })

  it('has a default surname', async()=>{
    const surname = await inbox.methods.surname().call();
    assert.equal(surname, 'njoku')
  })
})
