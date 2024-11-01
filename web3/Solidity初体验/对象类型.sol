// SPDX-License-Identifier: MIT  
pragma solidity ^0.7.4;  


contract Test{

    //创建结构体
    struct User{
        uint id;
        string name;
        uint age;
    }

    //结构体对象数组
    User[] public UserList;
    //User[10] public UserList;  创建10条

    //给数组新增元素
    function addList(string memory _name,uint _age) public returns (uint){
         uint num = UserList.length;
         uint index = num+1;
         UserList.push(User(index,_name,_age));
         return UserList.length;
    }
}