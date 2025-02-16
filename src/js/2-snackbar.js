import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const delay = Number(this.elements.delay.value);
    const state = this.elements.state.value;

    console.log(`Delay: ${delay}, State: ${state}`); // Додано для перевірки

    if (!delay || !state) {
      console.error('Помилка: не вибраний стан або не вказана затримка!');
      return;
    }
  
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  
    promise
      .then(delay => {
        window.alert(`✅ Fulfilled promise in ${delay}ms`),
        console.log(`✅ Fulfilled promise in ${delay}ms`)
})
      .catch(delay => {
        window.alert(`❌ Rejected promise in ${delay}ms`),
        console.log(`❌ Rejected promise in ${delay}ms`)
});
  });