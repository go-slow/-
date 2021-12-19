const Auction = artifacts.require("AuctionStore");

module.exports = function(deployer) {
    deployer.deploy(Auction);
};