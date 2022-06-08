export function parse(abi) {
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
