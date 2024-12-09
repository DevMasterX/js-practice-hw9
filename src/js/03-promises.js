function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

// ------------------------------------

// const promise = new Promise((res, rej) => {
//   setTimeout(() => {
//     const val = Math.random();

//     if (val > 0.5) {
//       res('yesssss');
//     } else {
//       rej('Nooooooooo');
//     }
//   }, 3000);
// });
// console.log(promise);

// promise
//   .then(val => {
//     return val + '😁';
//   })
//   .then(val => console.log(val))
//   .catch(err => console.error(err))
//   .finally(() => console.log('Finally'));

// const promise = fetch('https://pokeapi.co/api/v2/pokemon/ditto');
// console.log('🚀  promise:', promise);

// promise
//   .then(resp => resp.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

const start = document.querySelector('.js-start');
const container = document.querySelector('.js-container');

start.addEventListener('click', onStart);

function onStart() {
  const result = [];
  [...container.children].forEach((box, i) => (box.textContent = ''));
  [...container.children].forEach((box, i) => {
    return createPromise(i)
      .then(smile => {
        box.textContent = smile;
        result.push('1');
      })
      .catch(smile => {
        box.textContent = smile;
      })
      .finally(() => {
        setTimeout(() => {
          if (i === container.children.length - 1) {
            if (!result.length || result.length === 3) {
              alert('Winner');
            } else {
              alert('Lost money!!!!😪😪😩');
            }
          }
        }, 500);
      });
  });
}

function createPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.55) {
        resolve('💵');
      } else {
        reject('❌');
      }
    }, 1000 * delay + 1000);
  });
}
