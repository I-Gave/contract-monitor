'use strict';

const Web3 = require('web3');
const EventHandler = require('../EventHandler');

class ContractMonitor {
  constructor(config, abi) {
    this.contracts = [];
    this.events = [];
    this.handlers = [];

    if (config.contracts)  {
      let web3 = new Web3();
      config.contracts.forEach(contract => {
        web3.setProvider(new Web3.providers.HttpProvider(contract.rpc));
        let instance = web3.eth.contract(contract.abi).at(contract.address);

        let events = instance.allEvents({ fromBlock: contract.fromBlock, toBlock: contract.toBlock });
        events.watch(function (error, evt) {
          if (!error)
            handleEvent(evt)
        });

        this.contracts.push(contract);
        this.events.push(events);
      });
    }

  }
}

function handleEvent(evt) {
  console.log(evt.event);
  console.log(evt.args);
}

module.exports = ContractMonitor;