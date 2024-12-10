const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const firstDelay = Number(e.target.delay.value);
  const delayStep = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + delayStep * (i - 1);

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

// createPromise(2, 500)
//   .then(item => console.log(item))
//   .catch(error => console.error(error));

// ------------------------------------

// const start = document.querySelector('.js-start');
// const container = document.querySelector('.js-container');

// start.addEventListener('click', onStart);

// function onStart() {
//   const result = [];
//   [...container.children].forEach((box, i) => (box.textContent = ''));
//   [...container.children].forEach((box, i) => {
//     return createPromise(i)
//       .then(smile => {
//         box.textContent = smile;
//         result.push('1');
//       })
//       .catch(smile => {
//         box.textContent = smile;
//       })
//       .finally(() => {
//         setTimeout(() => {
//           if (i === container.children.length - 1) {
//             if (!result.length || result.length === 3) {
//               alert('Winner 🍒🍒🍒');
//             } else {
//               alert('❌Lost money!!!!😪😪😩');
//             }
//           }
//         }, 500);
//       });
//   });
// }

// function createPromise(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const random = Math.random();
//       if (random > 0.55) {
//         resolve('💵');
//       } else {
//         reject('❌');
//       }
//     }, 1000 * delay + 500);
//   });
// }

// ----------------------------------------------------------------

// const start = document.querySelector('.js-start');
// const container = document.querySelector('.js-container');

// start.addEventListener('click', onStart);

// function onStart() {
//   let counter = 0;

//   [...container.children].forEach((box, i) => (box.textContent = ''));
//   const promises = [...container.children].map((_, i) => createPromise(i));

//   Promise.allSettled(promises).then(items => {
//     items.forEach((item, i) => {
//       setTimeout(() => {
//         if (item.status === 'fulfilled') {
//           counter += 1;
//         }
//         container.children[i].textContent = item.value || item.reason;

//         if (i === container.children.length - 1) {
//           setTimeout(() => {
//             if (counter === container.children.length || !counter) {
//               alert('Winner 🍒🍒🍒');
//             } else {
//               alert('❌Lost money!!!!😪😪😩');
//             }
//           }, 500);
//         }
//       }, i * 1000);
//     });
//   });
// }

// function createPromise() {
//   return new Promise((resolve, reject) => {
//     const random = Math.random();
//     if (random > 0.55) {
//       resolve('💵');
//     } else {
//       reject('❌');
//     }
//   });
// }
