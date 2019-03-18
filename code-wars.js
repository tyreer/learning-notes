// Regex validate PIN code
// https://www.codewars.com/kata/55f8a9c06c018a0d6e000132/

// My solution
const validatePIN = pin => {
  const validLength = pin.length === 4 || pin.length === 6;
  const integerQuantity = pin.match(/[0-9]/g) ? pin.match(/[0-9]/g).length : 0;
  return validLength && integerQuantity === pin.length;
};

// Community solutionss
function validatePIN(pin) {
  return /^(\d{4}|\d{6})$/.test(pin);
}
// \d = digits!
// ^ = start of a line
// $ = end of a line
// /REGEX/.test(thingToTest)

function validatePIN(pin) {
  return (pin.length == 4 || pin.length == 6) && parseInt(pin) == pin;
}

// Complementary DNA
// https://www.codewars.com/kata/554e4a2f232cdd87d9000038/

// My solution
const DNAStrand = dna => {
  const complimentMap = {
    A: "T",
    T: "A",
    G: "C",
    C: "G"
  };

  return dna.replace(/A|T|G|C/gi, match => complimentMap[match]);
};

// Good to know the match can be passed into a replacement function

// Community solution
let pairs = { A: "T", T: "A", C: "G", G: "C" };
const DNAStrand = dna => dna.replace(/./g, c => pairs[c]);

// Can just use the '.' to return each character and map that

// Find The Parity Outlier
// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/

// My solution
const findOutlier = integers => {
  const isEven = int => Math.abs(int) % 2 === 0 || int === 0;

  let mostlyEven = integers.filter(int => isEven(int)).length > 1;

  const outlierIndex = integers.findIndex(val =>
    mostlyEven ? val % 2 !== 0 : val % 2 === 0
  );
  return integers[outlierIndex];
};

// Community solution
function findOutlier(integers) {
  const even = integers.filter(int => int % 2 === 0);
  const odd = integers.filter(int => int % 2 !== 0);
  return even.length === 1 ? even[0] : odd[0];
}

// Equal Sides Of An Array
// https://www.codewars.com/kata/5679aa472b8f57fb8c000047/

// My answer
const findEvenIndex = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    const leftSegment = arr.slice(0, i + 1).reduce((acc, cur) => acc + cur, 0);
    const rightSegment = arr.slice(i).reduce((acc, cur) => acc + cur, 0);

    if (leftSegment === rightSegment) {
      return i;
    }
  }

  return -1;
};

// Community answer
const sum = (a, from, to) => a.slice(from, to).reduce((a, b) => a + b, 0);
const findEvenIndex = a =>
  a.findIndex((el, i) => sum(a, 0, i) === sum(a, i + 1));

// findIndex tracks down exactly what you're iterating for in other approaches, and returns -1 if none found

// Sum of Digits / Digital Root
// https://www.codewars.com/kata/541c8630095125aba6000c00

// My solution
const digital_root = n => {
  const sum = String(n)
    .split("")
    .map(parseFloat)
    .reduce((acc, cur) => acc + cur);
  if (sum < 10) return digital_root(sum);
  return sum;
};

// Community
function digital_root(n) {
  return ((n - 1) % 9) + 1;
}

// Stop gninnipS My sdroW!
// https://www.codewars.com/kata/5264d2b162488dc400000001/

// My solution
const spinWords = incoming => {
  const reverse = word =>
    word
      .split("")
      .reverse()
      .join("");

  return incoming
    .split(" ")
    .map(word => (word.length > 5 ? reverse(word) : word));
};

// Community solutions

function spinWords(string) {
  return string.replace(/\w{5,}/g, function(w) {
    return w
      .split("")
      .reverse()
      .join("");
  });
}

// Playing with digits
// https://www.codewars.com/kata/5552101f47fc5178b1000050/

// My solution
const digPow = (n, p) => {
  const summedDigits = String(n)
    .split("")
    .map(Number)
    .reduce((cur, acc, index) => cur + acc ** (index + p), 0);

  let candidate = 0;

  while (candidate <= n * 2) {
    if (summedDigits % candidate === 0 && candidate * n === summedDigits) {
      return candidate;
    }
    candidate++;
  }

  return -1;
};

//Community solution
function digPow(n, p) {
  var x = String(n)
    .split("")
    .reduce((s, d, i) => s + Math.pow(d, p + i), 0);
  return x % n ? -1 : x / n;
}

// x % n = any positive number would evaluate to true
// x % n = 0 is falsey and means divisible, so you can just divide

// Tribonacci Sequence
// https://www.codewars.com/kata/556deca17c58da83c00002db/

// My solution

const tribonacci = (signature, n) => {
  if (n == 0) {
    return [];
  }

  if (n < 3) {
    return signature.slice(0, n);
  }

  const returnArray = signature;
  for (let x = 2; x < n - 1; x++) {
    const nextValue = returnArray[x] + returnArray[x - 1] + returnArray[x - 2];
    returnArray.push(nextValue);
  }
  return returnArray;
};

// Community solutions

function tribonacci(signature, n) {
  const sequence = signature;

  for (var i = 0; i < n - 3; i++) {
    sequence.push(sequence[i] + sequence[i + 1] + sequence[i + 2]);
  }

  return sequence.slice(0, n);
}

// Single slice at the end
// slice(0,0) = []

function tribonacci(signature, n) {
  while (signature.length < n) {
    signature.push(signature.slice(-3).reduce(sum));
  }
  return signature.slice(0, n);
}

function sum(a, b) {
  return a + b;
}

// slice(-3) allowing previous three elements, then immediate reduce

// Highest and Lowest
// https://www.codewars.com/kata/554b4ac871d6813a03000035/

// My solution
const highAndLow = str => {
  const asArray = str.split(" ").map(el => parseFloat(el));
  return `${Math.max(...asArray)} ${Math.min(...asArray)}`;
};

// Community solutions
function highAndLow(numbers) {
  numbers = numbers.split(" ").map(Number);
  return Math.max.apply(0, numbers) + " " + Math.min.apply(0, numbers);
}

// .map(Number)

// Sum of a sequence
// https://www.codewars.com/kata/586f6741c66d18c22800010a

// My solution:
const sequenceSum = (begin, end, step) => {
  let sequence = [];

  while (step * sequence.length + begin <= end) {
    sequence.push(begin + step * sequence.length);
  }
  return sequence.reduce((acc, cur) => acc + cur, 0);
};

// Community solutions:
// Super elegant recursion
// Ending condition "return 0" ends the recursion of the last return call, allowing a number to be returned
const sequenceSum = (begin, end, step) => {
  if (begin > end) {
    return 0;
  }
  return begin + sequenceSum(begin + step, end, step);
};

// Similar to mine structurally, but probably equally gross to read
const sequenceSum = (begin, end, step) => {
  var sum = 0;
  for (var i = begin; i <= end; i += step) {
    sum += i;
  }
  return sum;
};

// Delete occurrences of an element if it occurs more than n times
// https://www.codewars.com/kata/554ca54ffa7d91b236000023/

// My solution:
const deleteNth = (arr, n) => {
  const countObj = {};
  const returnArr = [];

  arr.map(val => {
    countObj[val] = countObj[val] >= 0 ? countObj[val] + 1 : 0;

    if (countObj[val] >= n) {
      return null;
    } else {
      returnArr.push(val);
    }
  });

  return returnArr;
};

// Community solution
// return straight from filter()
// (cache[n]||0) to establish initial value
// filter() with a basic condition

function deleteNth(arr, x) {
  var cache = {};
  return arr.filter(function(n) {
    cache[n] = (cache[n] || 0) + 1;
    return cache[n] <= x;
  });
}

// Remove the minimum
// https://www.codewars.com/kata/563cf89eb4747c5fb100001b/

// My solution
const removeSmallest = numbers => {
  if (numbers.length === 0) return [];

  const lowest = numbers.reduce((acc, cur) => (cur < acc ? cur : acc));
  const indexAway = numbers.indexOf(lowest);

  return [...numbers.slice(0, indexAway), ...numbers.slice(indexAway + 1)];
};

// Community solution
// Math.min(...numbers) is slick!

function removeSmallest(numbers) {
  let indexOfMin = numbers.indexOf(Math.min(...numbers));
  return [...numbers.slice(0, indexOfMin), ...numbers.slice(indexOfMin + 1)];
}

// Take a Ten Minute Walk
// https://www.codewars.com/kata/54da539698b8a2ad76000228/

// My solution
const isValidWalk = walk => {
  if (walk.length !== 10) {
    return false;
  }

  let xPosition = 0;
  let yPosition = 0;

  walk.map(direction => {
    switch (direction) {
      case "n":
        yPosition++;
        break;
      case "s":
        yPosition--;
        break;
      case "e":
        xPosition++;
        break;
      case "w":
        xPosition--;
        break;
      default:
        console.log("Invalid direction");
    }
  });

  return xPosition === 0 && yPosition === 0;
};

// Community solution
// Nice compact switch spacing
function isValidWalk(walk) {
  var dx = 0;
  var dy = 0;
  var dt = walk.length;

  for (var i = 0; i < walk.length; i++) {
    switch (walk[i]) {
      case "n":
        dy--;
        break;
      case "s":
        dy++;
        break;
      case "w":
        dx--;
        break;
      case "e":
        dx++;
        break;
    }
  }

  return dt === 10 && dx === 0 && dy === 0;
}

// Persistent Bugger.
// https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec/

// My solution
// Recursion note: I forgot to *return* persistence in the else clause

const persistence = (num, count = 0) => {
  if (num < 10 && count === 0) return 0;

  const digits = [];
  const numberArray = [...num.toString()];
  let multiplied = 1;
  count += 1;

  numberArray.map(digit => {
    multiplied = parseInt(digit) * multiplied;
  });

  if (multiplied < 10) {
    return count;
  } else return persistence(multiplied, count);
};

// Community solution A
function persistence(num) {
  var times = 0;

  num = num.toString();

  while (num.length > 1) {
    times++;
    num = num
      .split("")
      .map(Number)
      .reduce((a, b) => a * b)
      .toString();
  }

  return times;
}

// Community solution B
const persistence = num => {
  return `${num}`.length > 1
    ? 1 + persistence(`${num}`.split("").reduce((a, b) => a * +b))
    : 0;
};

// Categorize New Member
// https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa/

// My solution

const openOrSenior = data => {
  const output = [];

  for (const person of data) {
    if (person[0] >= 55 && person[1] > 7) {
      output.push("Senior");
    } else {
      output.push("Open");
    }
  }
  return output;
};

// Community solution
// * Destructuring!

function openOrSenior(data) {
  return data.map(([age, handicap]) =>
    age > 54 && handicap > 7 ? "Senior" : "Open"
  );
}

// Disemvowel challenge

// My solution

function disemvowel(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let devoweled = str;

  for (const letter in str) {
    if (vowels.includes(str[letter].toLowerCase())) {
      devoweled = devoweled.replace(str[letter], "");
    }
  }

  return devoweled;
}

// Community solution

function disemvowel(str) {
  return str.replace(/[aeiou]/gi, "");
}
