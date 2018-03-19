var myweb3 = new Web3(web3.currentProvider);
var takeBetButton = document.querySelector("#takeBetButton");
// var setWinnerTeam0Button = document.querySelector("#setWinnerTeam0Button");
// var setWinnerTeam1Button = document.querySelector("#setWinnerTeam1Button");
var updateWinnerButton = document.querySelector("#updateWinner");

var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "winner",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "team1name",
        "outputs": [
            {
                "name": "",
                "type": "string"
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
        "name": "team0name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "team0bet",
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
        "inputs": [
            {
                "name": "a",
                "type": "string"
            },
            {
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareStrings",
        "outputs": [
            {
                "name": "",
                "type": "bool"
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
        "name": "oraclizeUrl",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "description",
                "type": "string"
            }
        ],
        "name": "LogNewOraclizeQuery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "winner",
                "type": "string"
            }
        ],
        "name": "LogWinnerUpdated",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "myid",
                "type": "bytes32"
            },
            {
                "name": "result",
                "type": "string"
            },
            {
                "name": "proof",
                "type": "bytes"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "myid",
                "type": "bytes32"
            },
            {
                "name": "result",
                "type": "string"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_winner",
                "type": "string"
            }
        ],
        "name": "setWinner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_matchId",
                "type": "uint256"
            },
            {
                "name": "_teamName",
                "type": "string"
            },
            {
                "name": "_url",
                "type": "string"
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
                "name": "_teamName",
                "type": "string"
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
        "name": "payout",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "updateWinner",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

/**
 * setWinner
 */
// setWinnerTeam0Button.addEventListener("click", function() {
//     var contractAddress = document.getElementById("deployedContractAddress").value;
//     var team = 0;
//     var contract = myweb3.eth.contract(abi);
//     var instance = contract.at(contractAddress);
//
//     var  txnObject = {
//         from: myweb3.eth.defaultAccount,
//         gas: 4465034
//     };
//
//     instance.setWinner.sendTransaction(team, txnObject, function(error, result)  {
//
//         if(error) console.log(error);
//         else {
//             console.log(createEtherscanIoUrl('tx', result));
//         }
//     });
// });
//
// setWinnerTeam1Button.addEventListener("click", function() {
//     var contractAddress = document.getElementById("deployedContractAddress").value;
//     var team = 1;
//     var contract = myweb3.eth.contract(abi);
//     var instance = contract.at(contractAddress);
//
//
//     var  txnObject = {
//         from: myweb3.eth.defaultAccount,
//         gas: 4465034
//     };
//
//     instance.setWinner.sendTransaction(team, txnObject, function(error, result)  {
//
//         if(error) console.log(error);
//         else {
//             console.log(createEtherscanIoUrl('tx', result));
//         }
//     });
// });

/**
 * takeBet
 */
takeBetButton.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var betAmount = document.querySelector("#betAmount").value*1000000000000000000;
    var team = document.querySelector("#open_team_name").value;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 3000000,
        value: betAmount
    };

    instance.makeBet.sendTransaction(team, txnObject, function(error, result)  {

        if(error) console.log(error);
        else {
            console.log(createEtherscanIoUrl('tx', result));
        }
    });
});


// update winner
updateWinnerButton.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 4465034
    };

    instance.updateWinner.sendTransaction(txnObject, function(error, result)  {

        if(error) console.log(error);
        else {
            console.log(createEtherscanIoUrl('tx', result));
        }
    });
});

/**
 * Create the etherscan link
 */
// TODO global function, wherever
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