function a() {
  console.log(233);
}

function fn() {
  setTimeout(() => {
    console.log(6);
  });

  new Promise((resolve) => {
    resolve(false);
  })
    .then(() => console.log(3))
    .then(() => console.log(4))
    .catch(() => console.log(5));

  console.log(1);
}

function fn2() {
  console.log(2);
}

fn();
fn2();
