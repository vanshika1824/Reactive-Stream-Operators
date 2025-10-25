const { of, from, merge, concat, zip } = require('rxjs');
const { map, filter, flatMap, reduce, take } = require('rxjs/operators');

// 1️⃣ CREATION OPERATORS
console.log("1️⃣ CREATION OPERATORS:");
of(1, 2, 3, 4, 5).subscribe(x => console.log("of():", x));
from([10, 20, 30]).subscribe(x => console.log("from():", x));
console.log("----");

// 2️⃣ TRANSFORMATION OPERATORS
console.log("2️⃣ TRANSFORMATION OPERATORS:");
of(1, 2, 3).pipe(map(x => x * 2)).subscribe(x => console.log("map():", x));
of('A', 'B').pipe(flatMap(x => of(x, x + x))).subscribe(x => console.log("flatMap():", x));
of(1, 2, 3, 4, 5)
  .pipe(reduce((acc, val) => acc + val, 0))
  .subscribe(sum => console.log("reduce(): Sum =", sum));

console.log("----");

// 3️⃣ FILTERING OPERATORS
console.log("3️⃣ FILTERING OPERATORS:");
of(1, 2, 3, 4, 5).pipe(filter(x => x % 2 === 0)).subscribe(x => console.log("filter():", x));
of(10, 20, 30, 40).pipe(take(2)).subscribe(x => console.log("take():", x));
console.log("----");

// 4️⃣ JOIN CREATION OPERATORS
console.log("4️⃣ JOIN CREATION OPERATORS:");
merge(of(1, 3, 5), of(2, 4, 6)).subscribe(x => console.log("merge():", x));
concat(of('A', 'B'), of('C', 'D')).subscribe(x => console.log("concat():", x));
console.log("----");

// 5️⃣ JOIN OPERATORS
console.log("5️⃣ JOIN OPERATORS:");
zip(of('A', 'B', 'C'), of(10, 20, 30)).subscribe(([name, mark]) =>
  console.log(`zip(): ${name} scored ${mark}`)
);
console.log("----");

// 6️⃣ MULTICASTING OPERATOR (shareReplay equivalent)
console.log("6️⃣ MULTICASTING OPERATOR:");
const { shareReplay } = require('rxjs/operators');
const source = of(1, 2, 3).pipe(shareReplay(1));
source.subscribe(x => console.log("Subscriber 1 ->", x));
source.subscribe(x => console.log("Subscriber 2 ->", x));
console.log("----");

// 7️⃣ ERROR HANDLING OPERATOR
console.log("7️⃣ ERROR HANDLING OPERATOR:");
const { catchError } = require('rxjs/operators');
from([10, 5, 0, 2])
  .pipe(
    map(x => 10 / x),
    catchError(err => {
      console.log("Error handled:", err.message);
      return of(-1);
    })
  )
  .subscribe(x => console.log("Output:", x));
