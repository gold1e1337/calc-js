function calculator(string) {
  const numbers = string.split(/[+\-*/]/g);
  if (numbers.length !== 2) {
    throw new Error('должно состоять из 2х чисел');
  }

  let isRoman = false;
  let num1, operator, num2;

  if (string.includes('I') || string.includes('V') || string.includes('X')) {
    isRoman = true;
    [num1, operator, num2] = string.split(' ');

    const romanValues = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
      X: 10,
    };
    num1 = romanValues[num1];
    num2 = romanValues[num2];

    // Проверка допустимых римских чисел
    if (!num1 || !num2) {
      throw new Error('Число не может быть больше X');
    }
  } else {
    [num1, operator, num2] = string.split(' ');
    num1 = Number(num1);
    num2 = Number(num2);
  }

  if (num1 > 10 || num2 > 10 || num1 <= 0 || num2 <= 0) {
    throw new Error('Число должно быть от 1 до 10');
  }

  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        throw new Error('Division by zero');
      }
      result = Math.floor(num1 / num2);
      break;
    default:
      throw new Error('Invalid operator');
  }

  if (isRoman) {
    if (result < 1) return '';

    const arabicToRoman = (number) => {
      let result = '';
      const romanValues = [
        ['I', 'IV', 'V', 'IX'],
        ['X', 'XL', 'L', 'XC'],
        ['C', 'CD', 'D', 'CM'],
        ['M'],
      ];
      let numeralGroup = 0;

      while (number > 0) {
        let numeralValue = number % 10;
        let group = romanValues[numeralGroup];
        switch (numeralValue) {
          case 1:
          case 2:
          case 3:
            result = group[0].repeat(numeralValue) + result;
            break;
          case 4:
            result = group[1] + result;
            break;
          case 5:
          case 6:
          case 7:
          case 8:
            result = group[2] + group[0].repeat(numeralValue - 5) + result;
            break;
          case 9:
            result = group[3] + result;
            break;
          default:
            break;
        }
        number = Math.floor(number / 10);
        numeralGroup += 1;
      }
      return result;
    };
    
    return arabicToRoman(result);
  }

  return String(result);
}

module.exports = calculator;