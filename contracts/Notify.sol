pragma solidity ^0.8.4;

contract Notify{
    string welcomeText;
    function storeText (string memory text)public view {
        welcomeText= text;

    }

}