const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
};

/*----------------------------------------------------------------------------------------------------*/

const formatString = (format, parameters) => 
{
	let formattedString = format;

	for (let i = 0; i < parameters.length; i++) {
		formattedString = formattedString.replace("{"+ i +"}", parameters[i]);
	}

	return formattedString;
}

/*----------------------------------------------------------------------------------------------------*/

const maskInput = (currentValue, mask) => 
{	
	let newValue = "";
	
	if (currentValue === "") {
		return newValue;
	}

	const isNumeric  = (c) => c >= "0" && c <= "9";
	const isMinDigit = (c) => c >= "a" && c <= "z";
	const isMaxDigit = (c) => c >= "A" && c <= "Z";
	const maskIsNumeric  = (c) => c === "9";
	const maskIsMinDigit = (c) => c === "a";
	const maskIsMaxDigit = (c) => c === "A";
	const maskIsMidDigit = (c) => c === "i";
	
	let i, j;

	for(i = 0; i < mask.length; i++)
	{
		if (!maskIsNumeric(mask[i]) && !maskIsMinDigit(mask[i]) && !maskIsMaxDigit(mask[i]) && !maskIsMidDigit(mask[i])) {
			currentValue = currentValue.replace(mask[i], "");
		}
	}

	for(i = 0, j = 0; i < mask.length && j < currentValue.length; i++)
	{
		if(maskIsNumeric(mask[i]) && isNumeric(currentValue[j])) 
		{
			newValue += currentValue[j];
			j++;
		} else if (maskIsMinDigit(mask[i]) && (isMaxDigit(currentValue[j]) || isMinDigit(currentValue[j]))) 
		{
			newValue += currentValue[j].toLowerCase();
			j++;
		} else if (maskIsMaxDigit(mask[i]) && (isMaxDigit(currentValue[j]) || isMinDigit(currentValue[j]))) 
		{
			newValue += currentValue[j].toUpperCase();
			j++;
		} else if (maskIsMidDigit(mask[i]) && (isMaxDigit(currentValue[j]) || isMinDigit(currentValue[j]))) 
		{
			newValue += currentValue[j];
			j++;
		} else if (!maskIsNumeric(mask[i]) && !maskIsMinDigit(mask[i]) && !maskIsMaxDigit(mask[i]) && !maskIsMidDigit(mask[i])) {
			newValue += mask[i];
		} else {
			break;
		}
	}

	if (newValue.length === 1 && !maskIsNumeric(mask[0]) && !maskIsMinDigit(mask[0]) && !maskIsMaxDigit(mask[0]) && !maskIsMidDigit(mask[0])) {
		newValue = "";
	} 

	return newValue;
}

/*----------------------------------------------------------------------------------------------------*/

const moneyMask = (currentValue) => {
	
	const isNumeric  = (c) => c >= "0" && c <= "9";
	let newValue = "0,00";
	
	if (currentValue === "") {
		return newValue;
	}

	let countComma = 0;
	let countDot   = 0;
	
	for (let i = 0; i < currentValue.length; i++) 
	{
		if (currentValue[i] === ".") {
			countDot++;
		} else if (currentValue[i] === ",") {
			countComma++;
		}
	}
	
	if(countComma === 0 && countDot === 1) 
	{
		if (currentValue.split('.')[1].length === 1) {
			currentValue += "0";
		} else if (currentValue.split('.')[1].length > 2) {
			currentValue = parseFloat(currentValue).toFixed(2) + "";
		}
	}
	else if (countComma === 0 && countDot === 0) {
		currentValue += "00";
	}

	const aux = currentValue;
	currentValue = "";
	for (let i = 0; i < aux.length; i++) 
	{
		if (aux[i] !== "." && aux[i] !== ",") {
			currentValue += aux[i];
		}
	}

	currentValue = currentValue.replace(".", "");
	currentValue = currentValue.replace(",", "");

	if (!isNumeric(currentValue[currentValue.length - 1])) {
		currentValue = currentValue.substring(0, currentValue.length-1);
	}

	if (currentValue === "0000") {
		currentValue = "000";
	}

	if (currentValue.length > 3 && currentValue[0] === "0") {
		currentValue = currentValue.substring(1, currentValue.length);
	}

	if (currentValue.length < 3) {
		currentValue = "0".repeat(3 - currentValue.length) + currentValue;
	}
	
	const n = currentValue.length;
	currentValue = currentValue.substring(0, n-2) + "," + currentValue.substring(n-2, n)
	
	let decimalPart = "";
	let dotCount = 0;
	for (let i = currentValue.length - 4; i >= 0; i--) 
	{
		if(dotCount === 3) 
		{
			decimalPart += ".";
			dotCount = 0;
		}
		decimalPart += currentValue[i];
		dotCount++;
	}

	newValue = decimalPart.split("").reverse().join("") + currentValue.substring(currentValue.length - 3);

	return newValue;
}

/*----------------------------------------------------------------------------------------------------*/

const regexInput = (currentValue, represent) => 
{
	
	let value = currentValue;
	if (represent === "cpf") {
		value = maskInput(currentValue, "999.999.999-99");
	}
	if (represent === "cep") {
		value = maskInput(currentValue, "99999-999");
	}
	if (represent === "pis") {
		value = maskInput(currentValue, "999.99999.99-9");
	}
	if (represent === "plate") {
		value = maskInput(currentValue, "AAA-9999");
	}
	if (represent === "phone") {
		value = maskInput(currentValue, "(99) 9999-9999");
	}
	if (represent === "cellphone") {
		value = maskInput(currentValue, "(99) 99999-9999");
	}
	if (represent === "date") {
		value = maskInput(currentValue, "99/99/9999");
	}
	if (represent === "datetime") {
		value = maskInput(currentValue, "99/99/9999 99:99:99");
	}
	if (represent === "money") {
		value = moneyMask(currentValue);
	}

	return value;
}

export { sleep, regexInput, formatString };