const Auction = artifacts.require("AuctionStore");

contract('Auction', async accounts => {

    it("检查添加数据", async() => {
        let instance = await Auction.deployed();
        let addProductToStore_ = await instance.addProductToStore("name", "qw", "qw", "qwe", "0x13c52EFE6D249322C0c78FDed1e1826854A23548", 1, 1);
    });
    it("查看数据", async() => {
        let instance = await Auction.deployed();
        let getProduct_ = await instance.getProduct(1);
    });
    it("检查出价是否成功", async() => {
        let instance = await Auction.deployed();
        let bid_ = await instance.bid(1, "2");
    });
    it("检查付钱是否成功", async() => {
        let instance = await Auction.deployed();
        let revealBid_ = await instance.revealBid(1, "2");
    });
    it("检查参加拍卖人数", async() => {
        let instance = await Auction.deployed();
        let totalBids_ = await instance.totalBids(1);
        assert.equal(totalBids_, 1, '失败');
    });

})