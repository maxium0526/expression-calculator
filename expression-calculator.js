module.exports = function(str){
	let list = split(str);
	// console.log(list.join(" "));
	list = normalize(list);
	// console.log(list.join(" "));
	validate(list);
	return calc(list);
}

function calc(args){
	if(args.length===3){
		switch(args[1]){
			case "+": return (parseFloat(args[0]) + parseFloat(args[2])).toString();
			case "-": return (parseFloat(args[0]) - parseFloat(args[2])).toString();
			case "*": return (parseFloat(args[0]) * parseFloat(args[2])).toString();
			case "/": return (parseFloat(args[0]) / parseFloat(args[2])).toString();
		}	
	}

	//計括號
	let l = -1;
	for(let i=0; i<args.length; i++){
		if(args[i]==="("){
			l = i;
		}
		else if(args[i]===")"){
			args.splice(l, i-l+1, calc(args.slice(l+1, i)));
			args = normalize(args);
			i = -1;
			l = -1;
		}		
	}
	args = normalize(args);
	//計乘除
	for(let i=0; i<args.length; i++){
		if(/^[*/]$/.test(args[i])){
			args.splice(i-1, 3, calc(args.slice(i-1, i+2)));
			i=-1;
		}
	}

	//計加減
	for(let i=0; i<args.length; i++){
		if(/^[+-]$/.test(args[i])){
			args.splice(i-1, 3, calc(args.slice(i-1, i+2)));
			i=-1;
		}
	}

	if(args.length===1){
		return args[0];
	}

	throw "Calculate error occured, x" + args.length;
	return null;
}

function split(str){
	let form = str.replace(/\s/g, "");
	let ope = [];

	let buffer = form[0]; //放第一個字進buffer
	// let isDigit = isDigit(buffer);  //buffer是否為字母

	for(let i=1; i<form.length; i++){
		if(isDigit(form[i]) && isNumber(buffer)){ //若下一個字為數字且buffer為數字, 放進buffer
			buffer += form[i];
		} else if(isDigit(form[i]) && !isNumber(buffer)){
			ope.push(buffer);
			buffer = form[i];
		} else if(!isDigit(form[i])){
			ope.push(buffer);
			buffer = form[i];
		}
	}
	ope.push(buffer);

	return ope;
}

function isDigit(arg){
	return /^[0123456789.]$/.test(arg);
}

function isNumber(arg){
	return /^\-*[0123456789.]+$/.test(arg);
}

function isSymbol(arg){
	return /^[+\-*/()]$/.test(arg);
}

function isOperator(arg){
	return /^[+\-*/]$/.test(arg);
}

function isBracket(arg){
	return /^[()]$/.test(arg);
}

function normalize(arr){
	let result = arr.slice();
	for(let i=0; i<result.length;i++){
		if((isOperator(result[i-1])||!result[i-1]) && result[i]==="-" && isNumber(result[i+1])){//7*-16, -(9+7)
			if(result[i+1][0]==="-"){
				result[i+1] = result[i+1].substring(1);
			} else {
				result[i+1] = "-" + result[i+1];
			}
			result.splice(i,1);
			i--;
		}
		if(isNumber(arr[i]) && arr[i+1]==="("){//16(7+4)
			result.splice(i+1,0,"*");
		}
		if(arr[i]===")" && isNumber(arr[i+1])){//(7+4)16
			result.splice(i+1,0,"*");
		}
		if(arr[i]===")" && arr[i+1]==="("){//(7+4)(7+9)
			result.splice(i+1,0,"*");
		}
	}
	return result;
}

function validate(arr){
	let numBrackets = 0;

	for(let i=0;i<arr.length;i++){
		if(isOperator(arr[i]) && isOperator(arr[i+1]) && (arr[i+1]!="-" && arr[i+2]!="(")){
			throw "Invalid Expression at :"+i+", more than 1 operator.";
			return false;
		}
		if(isDigit(arr[i]) && isDigit(arr[i+1])){
			throw "Invalid Expression at :"+i+", more than 1 number.";
			return false;
		}
		if(arr[i]==="(") numBrackets++;
		if(arr[i]===")") numBrackets--;
		if(numBrackets<0){
			throw 'Invalid Expression at :'+i+', unexpected ")" token.';
			return false;
		}
	}
	if(numBrackets!=0){
			throw 'Invalid Expression. Not equal numbers of "(" and ")".';
			return false;
		}

	return true;
}