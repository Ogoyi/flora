// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

// Token Interface
interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract FloralNft{
    
    struct Flower{
        address payable owner;
        string name;
        string description;
        string image;
        uint price;
        bool forSale;
    }
    
    modifier onlyOwner(uint _index) {
        require(msg.sender == flowers[_index].owner, "Not owner");
        // execute the rest of the code.
        _;
    }
    
    // address passed in is not the zero address.
    modifier validAddress(address _address) {
        require(_address != address(0), "Not valid address");
        // execute the rest of the code.
        _;
    }
    
    address internal ownerAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    mapping (uint => Flower) internal flowers;
    uint internal flowersLength = 0;
    
    function createFlower(
        string memory _name,
        string memory _description,
        string memory _image,
        uint _price,
        bool _isSale
    )public{
        flowers[flowersLength] = Flower(
            payable(msg.sender),
            _name,
            _description,
            _image,
            _price,
            _isSale
        );
        flowersLength++;
    }
    
    function editFlower(
        uint _index,
        string memory _image,
        uint _price
    )public{
        Flower storage flower = flowers[_index];
        if(bytes(_image).length!=0){
            flower.image = _image;
        }
        if(_price !=0){
            flower.price = _price;
        }
    }
    
    function getFlower(uint _index) public view returns(
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        bool
    ){
        Flower storage flower  = flowers[_index];
        return (
            flower.owner,
            flower.name,
            flower.description,
            flower.image,
            flower.price,
            flower.forSale
        );
    }
    
    function buyFlower(uint _index) public payable{
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                flowers[_index].owner,
                flowers[_index].price
            ),
            "Transaction can not be performed"
        );
        flowers[_index].forSale = false;
        flowers[_index].owner = payable(msg.sender);
    }
    
    // ensures only owner can gift flower
    // ensures flower is gifted to a valid address
    function giftFlower(uint _index, address _address) public onlyOwner(_index) validAddress(_address) {
        flowers[_index].owner = payable(_address);
    }
    
    // ensures only owner can set and unset sale status
    function setForSale(uint _index) public onlyOwner(_index) {
        flowers[_index].forSale = !flowers[_index].forSale;
    }
    
    function getFlowerLength() public view returns (uint) {
        return (flowersLength);
    }
}