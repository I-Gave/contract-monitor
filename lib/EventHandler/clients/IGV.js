const Web3 = require('web3');


class IGVHandler {
  constructor(config) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.rpc));
    this.instance = this.web3.eth.contract(config.abi).at(config.address);
  }

  watch(events) {
    events.watch((error, evt) => {
      if (!error) {
        let event = evt.event;
        let args = evt.args;
        switch(event) {
          case "CreateCampaign":
            this.CreateCampaign(args);
            break;
          case "CreateToken":
            this.CreateToken(args);
            break;
          case "Issue":
            this.Issue(args);
            break;
          case  "Transfer":
            this.Transfer(args);
            break;
          default:
            console.log(`${event} has no handler`)
        }
      }
    });
  }

  async CreateCampaign(args) {
    const id = args.campaignId.toNumber();
    const c = await this.instance.getCampaign(id);

    const campaign = {
      startBlock: c[0].toNumber(),
      endBlock: c[1].toNumber(),
      owner: c[2],
      name: c[3],
      taxId: c[4],
      veto: c[5]
    }

    //console.log(campaign);
  }

  //TODO add token id to logging
  CreateToken(args) {

  }

  async Transfer(args) {
    const id = args.tokenId.toNumber();
    const c = await this.instance.getCertificate(id);
    //console.log(`Certificate ${id} transferred from: ${args.from} to: ${args.to}`)
  }

  Issue(args) {
    console.log(`${args.purchaser} bought ${args.certificateId}`);
  }
}

module.exports = IGVHandler;