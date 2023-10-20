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
    // mapping(address=>userBoughtContracts[]) private 

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
        // uint256 _coverageStartDate,
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
            block.timestamp,
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
        require(!contractToPurchase.isClosed,"This contract is not active");
        require(BuyersOfContract[contractId].length < contractToPurchase.maxBuyers, "Maximum number of buyers reached");
        // require(msg.value>=contractToPurchase.premiumAmount,"Insufficient Payment");
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


    function monitorWeatherData() external{


    }


    function calculatePayout() internal{


    }


    function distributePayout() public{


    }


    function withdrawMoney() external payable{


    }


    function getTotalAmountInvestedByUser() external view returns(uint256){

    }


    function getListOfBoughtContracts() external view returns(uint256){
    }

}
