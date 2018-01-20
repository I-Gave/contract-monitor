const config = require('./config');
const abi = require('./abi/IGVCore');

const Monitor = require('./lib/ContractMonitor');

const monitor = new Monitor(config, abi);