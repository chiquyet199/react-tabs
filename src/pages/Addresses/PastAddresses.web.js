import AbstractPastAddresses from "./AbstractPastAddresses";

class PastAddresses extends AbstractPastAddresses {
  handleAddressSelected = address => {
    if (confirm(address)) { // eslint-disable-line
      this.save(address);
    }
  };
}

export default PastAddresses;
