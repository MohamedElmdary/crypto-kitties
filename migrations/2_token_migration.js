const token = artifacts.require("Kittycontract");

module.exports = function (deployer) {
  deployer.deploy(token);
};
