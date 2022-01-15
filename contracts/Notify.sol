pragma solidity ^0.8.4;

contract Notify{
    string public welcomeText;
    function storeText (string memory text)public  {
        welcomeText= text;

    }

}