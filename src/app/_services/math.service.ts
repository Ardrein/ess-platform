import { Injectable } from '@angular/core';


/**
* Service used to test the sintaxis of the formulas from the indicators.
*/
@Injectable()
export class MathService {
	/**
	* @ignore
	*/
	constructor() { }


	/**
	* Function to validate the sintaxis of a formula.
	* @param {string} formula The formula string to validate.
	* @return True if the formula is valid, false otherwise.
	*/
	public isFormulaValid(formula: string): boolean{
		if(formula === ""){
			return false;
		}

		formula = this.deleteWhiteSpaces(formula);
		formula = this.replaceDecimalNumbers(formula, "a");

		if(this.replaceRegExp(formula, /\w+/, "a") === "a"){
			return true;
		}

		if(this.replaceBinaryOperatorsOrParentheses(formula, "a") === "a"){
			return true;
		}

		return false;

	}


	/**
	* Function to replace the operands with binary expressions and the parentheses that encompases
	* a single operand for a replacement string in a cicle. Ex: having the formula 'a+b', or the formula
	* '(a)', or the formula 'a+(b+c)' and the replacement string '2' the resulting string will be '2'
	* for the three cases.
	* @param {string} str Formula string to replace.
	* @param {string} replacement The Replacement string.
	* @return The string with the matches replaced.
	*/
	private replaceBinaryOperatorsOrParentheses(str: string, replacement: string): string{
		//expression = (var [+ - / *] var)  | (var) | var [+ - / *] var
 		let expression = /\(\w+[\+\-\/\*]{1}\w+\)|\(\w+\)|\w+[\+\-\/\*]{1}\w+/;
		let regExp = new RegExp(expression);

		while(regExp.test(str)){
			str = this.replaceRegExp(str, expression, replacement);
		}

		return str;
	}

	/**
	* Function to replace all decimal numbers for a replacement string.
	* @param {string} str String in which the decimal numbers will be replaced.
	* @param {string} replacement Replacement string.
	* @return String with the decimal numbers replaced.
	*/
	private replaceDecimalNumbers(str: string, replacement: string): string{
		return this.replaceRegExp(str, /\d+[\.]{1}\d+/, replacement);
	}


	/**
	* Function to delete all whitespaces from a string.
	* @param {string} str String in which the whitespaces will be deleted.
	* @return The string without whitespaces.
	*/
	private deleteWhiteSpaces(str: string): string{
		return this.replaceRegExp(str, /\s/, "");
	}


	/**
	* Function that uses a regular expression to search in a string and replace the match cases for
	* another string.
	* @param {string} str String in which the search will be realized.
	* @param {} search The expression used to search.
	* @param {string} replacement String used to replace the matches. 
	* @return String with the replacements made.
	*/
	private replaceRegExp(str:string, search, replacement: string): string{
		return str.replace(new RegExp(search, 'g'), replacement);
	}

}
