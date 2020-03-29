
// 計算因數
function factorCalc(number){
    var resultsArr = [];
    for(let i = 1; i <= number; i++){
        if(number % i == 0){
            resultsArr.push(i);
        }
    };
    return resultsArr;
};



exports.factorCalc = factorCalc;

