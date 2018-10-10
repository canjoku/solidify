pragma solidity ^0.4.17;

contract Inbox {

    string public name;
    string public surname;

    constructor(string Fname, string Sname) public {
        name = Fname;
        surname = Sname;
    }

    function setFname(string Fname) public {
        name = Fname;
    }

    function setSurname(string Sname) public {
        surname = Sname;
    }
}
