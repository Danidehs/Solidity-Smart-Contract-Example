const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Para crear constructores e instancias, por eso la mayuscula.
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile'); 


let accounts;
let inbox;
const Initial_String = 'Hi there!';

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [Initial_String]})
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () =>{
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, Initial_String);
    });
});