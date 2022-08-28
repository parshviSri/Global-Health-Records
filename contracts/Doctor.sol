// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Import this file to use console.log
import "hardhat/console.sol";
contract Doctor is ERC721, Ownable {
     using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    constructor() ERC721("Doctor Records", "Doc") {
        _tokenIds.increment();
    }
    function mintNFt()external{
        _safeMint(msg.sender,_tokenIds.current());

    }
}