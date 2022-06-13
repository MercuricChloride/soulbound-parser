const axios = require("axios");

function parse(abi) {
  // returns an array of ab objects
  // each obj contains
  // {
  //   inputs: [] // array of values for the event
  //   name: // name duh
  //   type: // can probably be ignored
  // }
  if (typeof abi === "string") {
    abi = JSON.parse(abi);
  }
  return abi.filter((item) => item.type === "event");
}

async function fetchAbi(address) {
  return await axios
    .get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`
    )
    .then((res) => {
      return parse(res.data.result);
    });
}

// @notice function to call to handle proxies and their ABIs
// @param addr String, this is the proxy address that the user interacts with
// @returns [event parsed abi for use in the frontEnd, address of the proxy];
async function handleContract(addr) {
  const abi = await fetchAbi(addr);
  return [abi, addr];
}

// @notice function to call to handle proxies and their ABIs
// @param addr String, this is the proxy address that the user interacts with
// @param impl String, this is the current proxy implimentation
// @returns [event parsed abi for use in the frontEnd, address of the Proxy];
async function handleProxy(addr, impl) {
  const abi = await fetchAbi(impl);
  return [abi, addr];
}

module.exports = { parse, fetchAbi, handleContract, handleProxy };
