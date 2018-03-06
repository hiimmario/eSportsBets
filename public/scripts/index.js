var myweb3 = new Web3(web3.currentProvider);
var deployContractButton = document.querySelector("#deployContractButton");
var takeBetButton = document.querySelector("#takeBetButton");
var setWinnerButton = document.querySelector("#setWinnerButton");

var bytecode = "0x60606040526040516040806103cc83398101604052808051906020019091908051906020019091905050600181141561007757336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506100b9565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b346002819055508160038190555050506102f4806100d86000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063116625151461007d57806320a0fdbc146100d25780634d9b37351461012757806399892e4714610150578063c89f2ce414610179578063df898e32146101a2575b600080fd5b341561008857600080fd5b6100906101c3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100dd57600080fd5b6100e56101e9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013257600080fd5b61013a61020e565b6040518082815260200191505060405180910390f35b341561015b57600080fd5b610163610218565b6040518082815260200191505060405180910390f35b341561018457600080fd5b61018c61021e565b6040518082815260200191505060405180910390f35b6101c16004808035906020019091908035906020019091905050610224565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600254905090565b60035481565b60025481565b600182141561027257336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102b4565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b3460026000828254019250508190555050505600a165627a7a72305820dbcf63f51d7e66d369c52941d876b02e062c790dbab78acdaebb3d2b0185dcfb0029";
var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "team2bet",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "team1bet",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "matchId",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "funds",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_matchId",
                "type": "uint256"
            },
            {
                "name": "_choice",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_choice",
                "type": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "makeBet",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getFunds",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

/**
 * Deploy given contract
 */
deployContractButton.addEventListener("click", function() {

    //deploy contract defined and tested with truffle
    //================================================
    var contract = myweb3.eth.contract(abi);

    var gas = 4700000;

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        data: bytecode,
        gas: gas,
        value: 2500000000000000
    };

    //constructor params!
    contract.new(30010, 1, txnObject,function(error,result){
        if (!error) {
            // result.address gets set within second call of fallback function
            if (result.address) {
                // gets set in the second call
                console.log(createEtherscanIoUrl('address', result.address));
                showDeployedContract(result.address);
            } else {
                // first callback call result address is not given
                console.log(createEtherscanIoUrl('tx', result.transactionHash));
                // pollTransactionReceipt(result.transactionHash);
            }
        } else {
            console.log("error contract.new: " + error);
        }
    });
});

/**
 * setWinner
 */


/**
 * takeBet
 */
takeBetButton.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);

    console.log(instance);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 4700000,
        value: 2500000000000000
    };

    instance.makeBet.sendTransaction(2, txnObject, function(error, result) {
        if(error) console.log(error);
        else {
            console.log(result);
        }
    });
});


/**
 * Create the etherscan link
 */
function createEtherscanIoUrl(type,hashOrNumber){

    var etherscanBaseUrl='https://ropsten.etherscan.io/';

    var url = etherscanBaseUrl;
    if(type === 'tx'){
        url += 'tx/'+hashOrNumber;
    } else if(type === 'block'){
        url += 'block/'+hashOrNumber;
    } else if(type === 'address'){
        url += 'address/'+hashOrNumber;
    }
    return url;
}

/**
 * Polls transaction receipt for deployed contract until contract gets properly deployed
 */
function pollTransactionReceipt(transactionHash) {
    var delay = 2000;

    myweb3.eth.getTransactionReceipt(transactionHash, function(error, result) {
        if(error) {
            console.log("error executing getTransactionReceipt:  " + error);
        }
        else {
            if(result === null) {
                setTimeout(function() {
                    pollTransactionReceipt(transactionHash);
                }, delay);
            }
            else {
                console.log(createEtherscanIoUrl('address', result.address));
                showDeployedContract(result.contractAddress);
            }
        }
    });

    // test ui
    //showDeployedContract(transactionHash);
}

function showDeployedContract(contractAddress) {
    document.getElementById("deployedContract").style.display = "block";
    document.getElementById("deployedContractAddress").value = contractAddress;
}