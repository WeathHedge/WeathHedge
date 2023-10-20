// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract WeatherDerivative {
    IERC20 private usdc; 
    address private platformOwner;
    uint256 private currentContractId;
    uint256[] private allContractIds;
    struct WeatherDerivativeContract {
        string name;
        string image;
        string description;
        string location;
        uint256 coverageStartDate;
        uint256 coverageEndDate;
        uint256 premiumAmount;
        uint256 payoutAmount;
        uint256 maxBuyers;
        string dataSource;
        string termsAndConditions;
        bool isClosed;
        uint256 contractId;
    }

    struct ContractBuyer{
        address Buyer;
        uint256 purchaseTimestamp;
    }

    mapping(uint256 => ContractBuyer[]) private BuyersOfContract;
    mapping(uint256 => WeatherDerivativeContract) private contracts;
    mapping(address => uint256) private userBalances;

    constructor(address _usdcAddress) {
        platformOwner = msg.sender;
        usdc = IERC20(_usdcAddress);
    }

    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Only the platform owner can create the contract.");
        _;
    }

    event ContractPurchased(uint256 indexed contractId, address indexed buyer, uint256 purchaseTimestamp);


    function createContract(
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _location,
        uint256 _coverageStartDate,
        uint256 _coverageEndDate,
        uint256 _premiumAmount,
        uint256 _payoutAmount,
        uint256 _maxBuyers,
        string memory _dataSource,
        string memory _termsAndConditions
    ) public onlyPlatformOwner {
        contracts[currentContractId] = WeatherDerivativeContract(
            _name,
            _image,
            _description,
            _location,
            _coverageStartDate,
            _coverageEndDate,
            _premiumAmount,
            _payoutAmount,
            _maxBuyers,
            _dataSource,
            _termsAndConditions,
            false,
            currentContractId
        );

        allContractIds.push(currentContractId);
        currentContractId++;
    }

    function getAllContracts() public view returns (WeatherDerivativeContract[] memory) {
        WeatherDerivativeContract[] memory allContracts = new WeatherDerivativeContract[](allContractIds.length);
        for(uint256 i=0; i < allContractIds.length;i++){
            allContracts[i]=contracts[allContractIds[i]];
        }
        return allContracts;
    }

    function purchaseContract(uint256 contractId) public{
        require(msg.sender != platformOwner,"Owner of the Platform cannot buy the Contract.");
        require(contractId != currentContractId,"Contract does not exist!");
        WeatherDerivativeContract storage contractToPurchase = contracts[contractId];
        require(!contractToPurchase.isClosed,"Maximum User Limit is reached");
        // require(contractToPurchase.coverageEndDate <= block.timestamp, "Contract is no longer active!");
        require(BuyersOfContract[contractId].length < contractToPurchase.maxBuyers, "Maximum number of buyers reached");
        require(!hasPurchasedContract(msg.sender, contractId), "User has already purchased this contract.");
        require(usdc.allowance(msg.sender, address(this)) >= contractToPurchase.premiumAmount, "USDC allowance not set");
        require(usdc.transferFrom(msg.sender, address(this), contractToPurchase.premiumAmount), "USDC transfer failed");

        // Buyer and Purchase TimeStamp
        ContractBuyer memory newBuyer = ContractBuyer({
            Buyer:msg.sender,
            purchaseTimestamp:block.timestamp
        });

        BuyersOfContract[contractId].push(newBuyer);
         // Close the contract if the maximum number of buyers is reached
        if (BuyersOfContract[contractId].length >= contractToPurchase.maxBuyers) {
            contractToPurchase.isClosed = true;
        }

        emit ContractPurchased(contractId, msg.sender, block.timestamp);

    }

    function hasPurchasedContract(address user, uint256 contractId) internal view returns (bool) {
        for (uint i = 0; i < BuyersOfContract[contractId].length; i++) {
            if (BuyersOfContract[contractId][i].Buyer == user) {
                return true; // User has already purchased this contract
            }
        }
        return false; // User has not purchased this contract
    }




    function getUsdcBalance() public view returns (uint256) {
        return usdc.balanceOf(address(this));
    }

    function monitorWeatherData() external{


    }


    function calculatePayout() internal{


    }


    function distributePayout(uint256 contractId) public{
      
    }

    function withdrawMoney() external payable{
        uint256 userBalance = userBalances[msg.sender];
        require(userBalance > 0, "No available balance to withdraw.");
        userBalances[msg.sender]=0;

        require(usdc.transfer(msg.sender,userBalance), "USDC transfer failed");
    }



    function getContractBoughtByUser(address user) external view returns (WeatherDerivativeContract[] memory) {
        WeatherDerivativeContract[] memory userContracts = new WeatherDerivativeContract[](allContractIds.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allContractIds.length; i++) {
            for (uint256 j = 0; j < BuyersOfContract[allContractIds[i]].length; j++) {
                if (BuyersOfContract[allContractIds[i]][j].Buyer == user) {
                    userContracts[count] = contracts[allContractIds[i]];
                    count++;
                }
            }
        }

        // Resize the array to the correct size
        WeatherDerivativeContract[] memory result = new WeatherDerivativeContract[](count);
        for (uint256 k = 0; k < count; k++) {
            result[k] = userContracts[k];
        }

        return result;
    }

}



