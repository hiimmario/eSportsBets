var myweb3 = new Web3(web3.currentProvider);
var takeBetButton = document.querySelector("#takeBetButton");
var setWinnerTeam0Button = document.querySelector("#setWinnerTeam0Button");
var setWinnerTeam1Button = document.querySelector("#setWinnerTeam1Button");

var abi = [
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
        "name": "getMatchId",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
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
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "winner",
                "type": "uint256"
            }
        ],
        "name": "setWinner",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

/**
 * setWinner
 */
setWinnerTeam0Button.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var team = 0;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 4465034
    };

    instance.setWinner.sendTransaction(team, txnObject, function(error, result)  {

        if(error) console.log(error);
        else {
            console.log(createEtherscanIoUrl('tx', result));
        }
    });
});

setWinnerTeam1Button.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var team = 1;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);


    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 4465034
    };

    instance.setWinner.sendTransaction(team, txnObject, function(error, result)  {

        if(error) console.log(error);
        else {
            console.log(createEtherscanIoUrl('tx', result));
        }
    });
});

/**
 * takeBet
 */
takeBetButton.addEventListener("click", function() {
    var contractAddress = document.getElementById("deployedContractAddress").value;
    var betAmount = document.querySelector("#betAmount").value*1000000000000000000;
    var team = document.querySelector("#open_team").value;
    var contract = myweb3.eth.contract(abi);
    var instance = contract.at(contractAddress);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        gas: 4465034,
        value: betAmount
    };

    instance.makeBet.sendTransaction(team, txnObject, function(error, result)  {

        if(error) console.log(error);
        else {
            console.log(createEtherscanIoUrl('tx', result));
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