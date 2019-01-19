let count = 1342;

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

let handlers = [];

for (let i of arr){
    let r = count++;
    handlers.push((req, res, next) => {
        console.log(`${i}: ${r}`);
        next();
    });
}
// handlers.shift()
// if ()