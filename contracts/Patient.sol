// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Import this file to use console.log
import "hardhat/console.sol";
contract Patient is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    struct PatientDetails {
        string personal;
        string medical;
        uint256 tokenId;
    }
    mapping(address => uint256) patientid;
    mapping(uint256 => PatientDetails)patientRecords;
    event patientId(uint256 patientId);
    constructor() ERC721("Health Care Records", "HCR") {
        _tokenIds.increment();
    }
    function createPatientAccount(string memory _personalDetails, address _patientAddress) external {
        if(patientid[_patientAddress] >0){
            emit patientId(patientid[_patientAddress]);
        }
        require(patientid[msg.sender]==0,"Patient Account already exists!!");

        patientid[_patientAddress] = _tokenIds.current();
        PatientDetails memory _patient;
        _patient.personal=_personalDetails;
        _patient.tokenId = _tokenIds.current();
        patientRecords[ _tokenIds.current()] = _patient;
        _safeMint(_patientAddress, _tokenIds.current());
        _tokenIds.increment();
         emit patientId(patientid[_patientAddress]);
         


    }
    function getPatientId(address _patientAdress)external view returns(uint256 _patientId){
        return patientid[_patientAdress];

    }
    function getPatientRecords(uint256 _patientId)external view returns(PatientDetails memory _patientrecord){
        return patientRecords[_patientId];

    }
    function getCurrentTokenId() external view returns(uint256 _tokenId){
        uint256 tokenId = _tokenIds.current();
        console.log(tokenId);
        return tokenId;
    }

    function addMedicalDetails(string memory _medicaldetails, address _patientAddress)external {
        uint256 _id=patientid[_patientAddress];
        patientRecords[_id].medical=_medicaldetails;

    }


}