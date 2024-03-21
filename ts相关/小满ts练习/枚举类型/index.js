//增长枚举
var Types1;
(function (Types1) {
    Types1[Types1["Red"] = 0] = "Red";
    Types1[Types1["Green"] = 1] = "Green";
    Types1[Types1["Blue"] = 2] = "Blue";
})(Types1 || (Types1 = {}));
//字符串枚举
var Types2;
(function (Types2) {
    Types2["Red"] = "red";
    Types2["Green"] = "green";
    Types2["Blue"] = "blue";
})(Types2 || (Types2 = {}));
//异构枚举
var Types3;
(function (Types3) {
    Types3["No"] = "no";
    Types3[Types3["Yes"] = 1] = "Yes";
})(Types3 || (Types3 = {}));
//接口枚举
var Types4;
(function (Types4) {
    Types4[Types4["yyds"] = 0] = "yyds";
    Types4[Types4["dddd"] = 1] = "dddd";
})(Types4 || (Types4 = {}));
var obj = {
    red: Types4.yyds
};
var Enum;
(function (Enum) {
    Enum[Enum["fall"] = 0] = "fall";
})(Enum || (Enum = {}));
var a = Enum.fall;
console.log(a);
var nameOfa = Enum[a];
console.log(nameOfa);
