module.exports = function(str){
	let list = split(str);
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
			i = -1;
			l = -1;
		}		
	}

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

	return calc(args);
}

function split(str){
	let form = str.replace(/\s/g, "");
	let ope = [];

	let buffer = form[0]; //放第一個字進buffer
	// let isDigit = isDigit(buffer);  //buffer是否為字母

	for(let i=1; i<form.length; i++){
		if(isDigit(form[i]) && isDigit(buffer)){ //若下一個字為數字且buffer為數字, 放進buffer
			buffer += form[i];
		} else if(isDigit(form[i]) && !isDigit(buffer)){
			ope.push(buffer);
			buffer = form[i];
			// isDigit = true;
		} else if(!isDigit(form[i])){
			ope.push(buffer);
			buffer = form[i];
			// isDigit = false;
		}
	}
	ope.push(buffer);

	return ope;
}

function isDigit(arg){
	return /^[0123456789.]+$/.test(arg);
}