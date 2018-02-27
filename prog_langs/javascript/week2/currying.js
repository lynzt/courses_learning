const sorted3 = x => y => z => z >= y && y >= x;

let t10 = sorted3(7)(9)(11)
let t11 = sorted3(7)(12)(11)
// let t10 = sorted3(7);
console.log (`t10:`, t10)
console.log (`t11:`, t11)



// old way...
const sorted3_tupled = (x, y, z) => z >= y && y >= x;
let t1 = sorted3_tupled(7, 8, 9);
let t2 = sorted3_tupled(7, 9, 8);
console.log (`t1:`, t1, `t2:`, t2);
