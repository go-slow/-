const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
    //Will Start the metamask extension
    //ethereum.request({ method: 'eth_requestAccounts' });
    getAccount();
});
//账户判断
async function getAccount() {
    lqaccounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = lqaccounts[0];
    console.log("当前账户是",
        account)
    $(".showAccount").html(account);
}
ethereum.on('accountsChanged', function(accounts) {
    console.log("account[0]==>", accounts[0])
    $(".showAccount").html(accounts[0]);
    // Time to reload your interface with accounts[0]!
});

//链接web3
var lqaccounts;
let web3 = new Web3('ws://localhost:7545');
console.log(web3)
web3.eth.getAccounts()
    .then(function(accounts) {
        lqaccounts = accounts
        console.log(lqaccounts[0])
    });
const abi = [{
        "inputs": [{
                "internalType": "string",
                "name": "_name_liuqiang",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_category_liuqiang",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_imageLink_liuqiang",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_descLink_liuqiang",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_highestBidder_liuqiang",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_auctionEndTime_liuqiang",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startPrice_liuqiang",
                "type": "uint256"
            }
        ],
        "name": "addProductToStore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "_productId_liuqiang",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_bid",
                "type": "string"
            }
        ],
        "name": "bid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_productId_liuqiang",
            "type": "uint256"
        }],
        "name": "getProduct",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "enum AuctionStore.ProductStatus",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_productId",
            "type": "uint256"
        }],
        "name": "highestBidderInfo",
        "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "productIndex",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "_productId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_amount",
                "type": "string"
            }
        ],
        "name": "revealBid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_productId",
            "type": "uint256"
        }],
        "name": "totalBids",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
]
var myContract = new web3.eth.Contract(abi, '0x993aE821e3996F45BD19B83eDcfe767ba6E70008');


function submit() {
    //添加拍卖物品和信息
    // const sendEthButton = document.getElementById('.sendEthButton');
    // sendEthButton.addEventListener('click', () => {
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    var imageLink = document.getElementById("imageLink").value;
    var descLink = document.getElementById("descLink").value;
    var address = lqaccounts[0];
    var auctionEndTime = document.getElementById("auctionEndTime").value;
    var startPrice = document.getElementById("startPrice").value;

    myContract.methods.addProductToStore(name, category, imageLink, descLink, address, auctionEndTime, startPrice)
        .send({
            from: lqaccounts[0],
            gas: 3000000,
            gasprice: '30000000000000'
        })
        .then(
            function(res) {
                ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: lqaccounts[0],
                        to: '0x2F71A4ff03e7492c76dD3dC4FD8C411e348f7eFa',
                        value: '0xc350',
                    }, ],
                })
                console.log("成功");
                console.log(res);
            });
    // })
}