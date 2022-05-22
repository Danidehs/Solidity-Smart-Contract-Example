// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile'); 


const provider = new HDWalletProvider(
    'pride smooth exotic scatter entire empty problem pill garbage idea purchase cover',
    'https://rinkeby.infura.io/v3/c93e24700e194d4ea80744cc0850b064'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy a contract from account ', accounts[0]);

    const contractResult = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Well, it seems this got deployed']})
        .send({ from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to ', contractResult.options.address);    

    provider.engine.stop();
};

deploy();
