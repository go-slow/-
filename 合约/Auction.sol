// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

//定义合约AuctionStore
contract AuctionStore {
    //定义枚举ProductStatus
    enum ProductStatus {
        Open_liuqiang, //拍卖开始
        Sold_liuqiang, //已售出,交易成功
        Unsold_liuqiang //为售出，交易未成功
    }

    // 用于统计商品数量，作为ID
    uint256 public productIndex;

    //商品Id与钱包地址的对应关系
    mapping(uint256 => address) productIdInStore;

    // 通过地址查找到对应的商品集合
    mapping(address => mapping(uint256 => Product)) stores;

    //增加投标人信息
    struct Bid {
        address bidder_liuqiang;
        uint256 productId_liuqiang;
        uint256 value_liuqiang;
        bool revealed_liuqiang; //是否已经揭标
    }

    //定义商品结构体
    struct Product {
        uint256 id_liuqiang; //商品id
        string name_liuqiang; //商品名称
        string category_liuqiang; //商品分类
        string imageLink_liuqiang; //图片Hash
        string descLink_liuqiang; // 图片描述信息的Hash
        uint256 auctionEndTime_liuqiang; //竞标结束时间
        uint256 startPrice_liuqiang; //拍卖价格
        address highestBidder_liuqiang; //出价最高，赢家的钱包地址
        uint256 highestBid_liuqiang; //赢家得标的价格
        uint256 secondHighestBid_liuqiang; //竞标价格第二名
        uint256 totalBids_liuqiang;
        //共计竞标的人数
        ProductStatus status_liuqiang; //状态
        // (address => mapping(bytes32 => Bid)) bids;// 存储所有投标人信息
    }
    //mapping(address => uint) public bids;
    mapping(address => mapping(bytes32 => Bid)) bids; // 存储所有投标人信息

    //添加商品到区块链中  类别 图像链接 图片描述信息  开始竞标时间  竞标结束时间   拍卖价格  商品新旧标识
    function addProductToStore(
        string memory _name_liuqiang,
        string memory _category_liuqiang,
        string memory _imageLink_liuqiang,
        string memory _descLink_liuqiang,
        address _highestBidder_liuqiang,
        uint256 _auctionEndTime_liuqiang,
        uint256 _startPrice_liuqiang
    ) public {
        //商品ID自增
        productIndex += 1;
        //product对象稍后直接销毁即可
        Product memory product = Product(
            productIndex,
            _name_liuqiang,
            _category_liuqiang,
            _imageLink_liuqiang,
            _descLink_liuqiang,
            _auctionEndTime_liuqiang,
            _startPrice_liuqiang,
            _highestBidder_liuqiang,
            0,
            0,
            0,
            ProductStatus.Open_liuqiang
        );
        stores[msg.sender][productIndex] = product; //stores存入对象
        productIdInStore[productIndex] = msg.sender;
    }

    //通过商品ID读取商品信息
    function getProduct(uint256 _productId_liuqiang)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            ProductStatus
        )
    {
        Product memory product = stores[productIdInStore[_productId_liuqiang]][
            _productId_liuqiang
        ];
        return (
            product.id_liuqiang,
            product.name_liuqiang,
            product.category_liuqiang,
            product.imageLink_liuqiang,
            product.descLink_liuqiang,
            product.auctionEndTime_liuqiang,
            product.startPrice_liuqiang,
            product.status_liuqiang
        );
    }

    //投标,传入参数为商品Id以及你投的钱,需要添加Payable
    function bid(uint256 _productId_liuqiang, string memory _bid) public {
        Product storage product = stores[productIdInStore[_productId_liuqiang]][
            _productId_liuqiang
        ];
        //商品竞拍已经结束
        require(
            block.timestamp <=
                block.timestamp + product.auctionEndTime_liuqiang,
            "The merchandise auction is over"
        );
        //设置的虚拟价格不能低于开标价格
        require(
            stringToUint(_bid) >= product.startPrice_liuqiang,
            "The set virtual price cannot be lower than the bid opening price"
        );
        //对竞标价格进行加密
        bytes32 bid1 = keccak256(abi.encode(_bid));
        require(bids[msg.sender][bid1].bidder_liuqiang == address(0)); //在提交竞标之前，必须保证bid的值为空
        //将投标人信息进行保存
        bids[msg.sender][bid1] = Bid(
            msg.sender,
            _productId_liuqiang,
            stringToUint(_bid),
            false
        );
        //商品投标人数递增
        product.totalBids_liuqiang += 1;
    }

    //公告，揭标方法
    function revealBid(uint256 _productId, string memory _amount)
        public
        payable
    {
        //通过商品ID获取商品信息
        Product storage product = stores[productIdInStore[_productId]][
            _productId
        ];
        //确保当前时间大于投标结束时间s
        require(
            block.timestamp <=
                block.timestamp + product.auctionEndTime_liuqiang,
            "The bidding is not finished yet, and the price announcement time is not yet available"
        );
        // 对竞标价格进行加密
        bytes32 sealedBid = keccak256(abi.encode(_amount));
        //获取投标人信息
        Bid memory bidInfo = bids[msg.sender][sealedBid];
        //判断是否存在钱包地址，钱包地址0x4333  uint160的钱包类型
        require(
            bidInfo.bidder_liuqiang > address(0),
            "Wallet address does not exist"
        );
        //判断是否已经公告揭标
        require(bidInfo.revealed_liuqiang == false, "already over");
        // 定义系统的退款
        uint256 refund;
        uint256 amount = stringToUint(_amount);
        // bidInfo.value 其实就是 mask bid，用于迷惑竞争对手的价格

        if (bidInfo.value_liuqiang < amount) {
            //如果bidInfo.value的值< 实际竞标价，则返回全部退款，属于无效投标
            refund = bidInfo.value_liuqiang;
        } else {
            //如果属于有效投标，参照如下分类
            if (address(product.highestBidder_liuqiang) == address(0)) {
                //第一个参与公告的人，此时该值为0
                //将出标人的地址赋值给最高出标人地址
                product.highestBidder_liuqiang = msg.sender;
                //将出标人的价格作为最高价格
                product.highestBid_liuqiang = amount;
                //将商品的起始拍卖价格作为第二高价格
                product.secondHighestBid_liuqiang = product.startPrice_liuqiang;
                //将多余的钱作为退款，如bidInfo.value = 20,amount = 12,则退款8
                refund = bidInfo.value_liuqiang - amount;
            } else {
                //此时参与者不是第一个参与公告的人
                // amount = 15 , bidInfo.value = 25,amount > 12
                if (amount > product.highestBid_liuqiang) {
                    // 将原来的最高价地址 赋值给 第二高价的地址
                    product.secondHighestBid_liuqiang = product
                        .highestBid_liuqiang;
                    // 将原来最高的出价退还给原先退给原先的最高价地址
                    payable(product.highestBidder_liuqiang).transfer(
                        product.highestBid_liuqiang
                    );
                    // 将当前出价者的地址作为最高价地址
                    product.highestBidder_liuqiang = msg.sender;
                    // 将当前出价作为最高价，为15
                    product.highestBid_liuqiang = amount;
                    // 此时退款为 20 - 15 = 5
                    refund = bidInfo.value_liuqiang - amount;
                } else if (amount > product.secondHighestBid_liuqiang) {
                    //
                    product.secondHighestBid_liuqiang = amount;
                    //退还所有竞标款
                    refund = amount;
                } else {
                    //如果出价比第二高价还低的话，直接退还竞标款
                    refund = amount;
                }
            }

            if (refund > 0) {
                //退款
                payable(msg.sender).transfer(refund);
                bids[msg.sender][sealedBid].revealed_liuqiang = true;
            }
        }
    }

    //帮助方法
    //1. 获取竞标赢家信息
    function highestBidderInfo(uint256 _productId)
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        Product memory product = stores[productIdInStore[_productId]][
            _productId
        ];
        return (
            product.highestBidder_liuqiang,
            product.highestBid_liuqiang,
            product.secondHighestBid_liuqiang
        );
    }

    //2. 获取参与竞标的人数
    function totalBids(uint256 _productId) public view returns (uint256) {
        Product memory product = stores[productIdInStore[_productId]][
            _productId
        ];
        return product.totalBids_liuqiang;
    }

    //3. 将字符串string到uint类型
    function stringToUint(string memory s) private pure returns (uint256) {
        bytes memory b = bytes(s);
        uint256 result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
                result = result * 10 + (uint8(b[i]) - 48);
            }
        }

        return result;
    }
}
