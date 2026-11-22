const text = "To be or not to be!";

// 1. Is there a "be" in the text?
console.log(/be/.test(text));                  // true

// 2. Is there a "BE" in the text, case-insensitive?
console.log(/BE/i.test(text));                 // true  (i flag = ignore case)
console.log(/BE/.test(text));                  // false (for comparison)

// 3. Does "be" match the FULL string?
console.log(/^be$/.test(text));                // false (^ and $ anchor start and end)

// 4. Does "1234" consist only of digits?
console.log(/^\d+$/.test("1234"));             // true
console.log(/^\d+$/.test("12a4"));             // false

// 5. Is "24-12-2026" a date: day (1-2 digits), month (1-2 digits), year (4 digits)?
const dateRe = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
const date = "24-12-2026";
console.log(dateRe.test(date));                // true

const result = date.match(dateRe);
console.log(result[1]);                        // "24"   (day)
console.log(result[2]);                        // "12"   (month) <- the answer to the task
console.log(result[3]);                        // "2026" (year)

// Negative tests
console.log(dateRe.test("2026-12-24"));        // false
console.log(dateRe.test("24-12-26"));          // false (year needs 4 digits)