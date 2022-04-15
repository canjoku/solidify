const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3')
const {abi, evm} = require('./compile')

const provider = new HDWalletProvider(
    'staff rapid cotton shift sad chuckle cargo antenna similar omit sorry mountain', 
    'https://rinkeby.infura.io/v3/ca2b892b137d45909583fdc5777d3672'
)

const web3 = new Web3(provider)
const INITIAL_MESSAGE = 'Hello there'


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0])
    const result = await new web3.eth.Contract(abi).deploy({data: evm.bytecode.object, arguments: [INITIAL_MESSAGE]}).send({from: accounts[0], gas: '1000000'});
    console.log(result.options.address);
    provider.engine.stop()
}

deploy();