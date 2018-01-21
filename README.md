# Contract Monitor

This is a multi-contract monitoring tool for Ethereum smart contracts.
```
$ npm run start
```
Add new contracts to index.js in the config
```
{
  name: 'I Gave',
  address: "0x8d80fe98e4b657a8b517e744b4c2a0e73d6a8977",
  rpc: "http://45.76.250.111:9546",
  fromBlock: 0,
  toBlock: 'latest',
  handler: "IGV",
  abi: [...]
}
```

Add new event handler clients for new contracts by creating a new handler in `lib/EventHandler/clients`

