var myweb3 = new Web3(web3.currentProvider);
var deployContractButton = document.querySelector("#deployContractButton");

deployContractButton.addEventListener("click", function() {
    // define contract compiled in remix
    //================================================
    var bytecode = "0x6060604052341561000f57600080fd5b60405160208061017a833981016040528080519060200190919050508060008190555050610138806100426000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806367e0badb14610051578063cd16ecbf1461007a575b600080fd5b341561005c57600080fd5b61006461009d565b6040518082815260200191505060405180910390f35b341561008557600080fd5b61009b60048080359060200190919050506100a6565b005b60008054905090565b600080549050816000819055506000546001026000191681600102600019163373ffffffffffffffffffffffffffffffffffffffff167f108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce60405160405180910390a450505600a165627a7a72305820b3dd05a446e4e1a7bb3175b3af980801e481458ced7d3305c8596b6d1b5175880029";
    var abi = [
        {
            "constant": false,
            "inputs": [],
            "name": "getNum",
            "outputs": [
                {
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "setNum",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "caller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "oldNum",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "newNum",
                    "type": "bytes32"
                }
            ],
            "name": "NumberSetEvent",
            "type": "event"
        }
    ];

    //deploy contract defined in remix
    //================================================
    var contract = myweb3.eth.contract(abi);

    var gas = 47000000;

    var  params = {
        from: myweb3.eth.defaultAccount,
        data: bytecode,
        gas: gas
    };

    var constructor_param = 10;

    contract.new(constructor_param,params,function(error,result){
        if (!error) {
            // never happens
            if (result.address) {
                // gets set in the second call
                console.log("contract address: " + result.address);
                console.log(createEtherscanIoUrl('address', result.address));

                // should work, callback doesnt get called a 2nd time :(
                // myweb3.eth.getTransactionReceipt(deployedContract.transactionHash, function(error, result) {
                //     if(error) {
                //         console.log(error);
                //     }
                //     else {
                //         console.log("receipt: " + result);
                //     }
                // });

            } else {
                // gets set in the first call
                // console.log("contract transaction hash: " + result.transactionHash);
                console.log(createEtherscanIoUrl('tx', result.transactionHash));

                // myweb3.eth.getTransaction(result.transactionHash, function(error, result) {
                //     if(error) {
                //         console.log(error);
                //     }
                //     else {
                //         console.log("transaction: " + result);
                //     }
                // });

                pollTransactionReceipt(result.transactionHash);
            }
        } else {
            console.log("error contract.new: " + error);
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


function pollTransactionReceipt(transactionHash) {
    var delay = 1000;

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
                console.log(createEtherscanIoUrl('address', result.contractAddress));
            }
        }
    });
}