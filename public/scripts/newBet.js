var myweb3 = new Web3(web3.currentProvider);
var deployContractButton = document.querySelector("#deployContractButton");

var bytecode = "0x606060405260405160408061060483398101604052808051906020019091908051906020019091905050600081141561007757336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506100b9565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b816002819055505050610533806100d16000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630df7160214610088578063153dc182146100c357806320a0fdbc146100ec578063409bea13146101415780634d9b373514610196578063718cc769146101bf57806399892e47146101d7575b600080fd5b341561009357600080fd5b6100a96004808035906020019091905050610200565b604051808215151515815260200191505060405180910390f35b34156100ce57600080fd5b6100d66103fa565b6040518082815260200191505060405180910390f35b34156100f757600080fd5b6100ff610404565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014c57600080fd5b61015461042a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101a157600080fd5b6101a961044f565b6040518082815260200191505060405180910390f35b6101d5600480803590602001909190505061046e565b005b34156101e257600080fd5b6101ea610501565b6040518082815260200191505060405180910390f35b60008082141561027d576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050506103f1565b60018214156102fa57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050506103f0565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60023073ffffffffffffffffffffffffffffffffffffffff163181151561035857fe5b049081150290604051600060405180830381858888f1935050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60023073ffffffffffffffffffffffffffffffffffffffff16318115156103d357fe5b049081150290604051600060405180830381858888f19350505050505b5b60019050919050565b6000600254905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60008114156104bc57336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104fe565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600254815600a165627a7a72305820e59c1b6778c64170e3ac2d4b6cb4f09fd72aa5d9e557214da9200fed65c43c5c0029";
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

//todo get help, literally - crossing out like that, rly?
function setBetValuesForSubmit(set_team, contractAddress) {

    var setTeamSelect = document.getElementById("team4bet");

    var setTeam;
    var openTeam;
    var setTeamName;
    var openTeamName;

    setTeam = set_team;

    if(set_team == 0) {
         openTeam = 1;
    }
    else {
        openTeam = 0;
    }

    setTeamName = setTeamSelect.options[setTeam].text;

    if(setTeam == 0) {
        openTeamName = setTeamSelect.options[1].text;
    }
    else {
        openTeamName = setTeamSelect.options[0].text;
    }

    // alert("setTeam val: " + setTeam);
    // alert("setTeam name: " + setTeamName);
    // alert("openTeam val: " + openTeam);
    // alert("openTeam name: " + openTeamName);

    //todo - think about if you really need the set/open team names if i have opponent1 and 2 already stored in the bet
    document.getElementById("set_team").value = setTeam;
    document.getElementById("set_team_name").value = setTeamName;
    document.getElementById("open_team").value = openTeam;
    document.getElementById("open_team_name").value = openTeamName;
    document.getElementById("deployedContractAddress").value = contractAddress;
}

/**
 * Deploy given contract
 */
deployContractButton.addEventListener("click", function() {

    var matchId = document.querySelector("#matchId").value;
    var betAmount = document.querySelector("#betAmount").value*1000000000000000000;
    var set_team = document.querySelector("#team4bet").value;

    var contract = myweb3.eth.contract(abi);

    var  txnObject = {
        from: myweb3.eth.defaultAccount,
        data: bytecode,
        gas: 4465034,
        value: betAmount
    };

    //constructor params!
    contract.new(matchId, set_team, txnObject,function(error,result){
        if (!error) {
            // result.address gets set within second call of fallback function
            if (result.address) {
                // gets set in the second call
                console.log(createEtherscanIoUrl('address', result.address));

                setBetValuesForSubmit(set_team, result.address);

                document.submitBet.submit();
            } else {
                // first callback call result address is not given
                console.log(createEtherscanIoUrl('tx', result.transactionHash));
                //pollTransactionReceipt(result.transactionHash);
                enableLoader(result.transactionHash);
            }
        } else {
            console.log("error contract.new: " + error);
        }
    });
});


/**
 * Create the etherscan link
 */
// TODO global function! used wherever
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
 * Fixes the 2nd callback function call from contract.new
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
            }
        }
    });
}

function enableLoader(transactionHash) {
    document.getElementById("loader").style.display = "block";
    document.getElementById("loaderLink").innerHTML = "<a href=" + createEtherscanIoUrl("tx", transactionHash) + " target=\"_blank\">" + createEtherscanIoUrl("tx", transactionHash) + "</a>";
}