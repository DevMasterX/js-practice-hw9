function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

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

const start = document.querySelector('.js-start');
const container = document.querySelector('.js-container');

start.addEventListener('click', onStart);

function onStart() {
  let counter = 0;

  [...container.children].forEach((box, i) => (box.textContent = ''));
  const promises = [...container.children].map((_, i) => createPromise(i));

  Promise.allSettled(promises).then(items => {
    items.forEach((item, i) => {
      setTimeout(() => {
        if (item.status === 'fulfilled') {
          counter += 1;
        }
        container.children[i].textContent = item.value || item.reason;

        if (i === container.children.length - 1) {
          setTimeout(() => {
            if (counter === container.children.length || !counter) {
              alert('Winner 🍒🍒🍒');
            } else {
              alert('❌Lost money!!!!😪😪😩');
            }
          }, 500);
        }
      }, i * 1000);
    });
  });
}

function createPromise() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.55) {
      resolve('💵');
    } else {
      reject('❌');
    }
  });
}
