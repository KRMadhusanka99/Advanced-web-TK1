function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;               
  }
  
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

// Tests
console.log(isPrime(1));    // false
console.log(isPrime(2));    // true
console.log(isPrime(9));    // false
console.log(isPrime(17));   // true
console.log(isPrime(97));   // true
console.log(isPrime(100));  // false
console.log(isPrime(7.5));  // false