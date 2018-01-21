'use strict';

const Web3 = require('web3');
const EventHandler = require('../EventHandler');

class ContractMonitor {
  constructor(config) {
    this.contracts = [];
    this.handlers = [];

    if (config.contracts)  {
      let web3 = new Web3();
      config.contracts.forEach(contract => {
        web3.setProvider(new Web3.providers.HttpProvider(contract.rpc));
        let instance = web3.eth.contract(contract.abi).at(contract.address);
        let events = instance.allEvents({ fromBlock: contract.fromBlock, toBlock: contract.toBlock });
        let handler = new EventHandler(contract);

        handler.watch(events);

        this.contracts.push(contract);
        this.handlers.push(handler);
      });
    }

  }
}

module.exports = ContractMonitor;