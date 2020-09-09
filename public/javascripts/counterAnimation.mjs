const counterAnimation = (el, initialNum, finalNum) => {
    if (Number.isInteger(finalNum)) {
      let interval = setInterval(function() {
        el.innerHTML = initialNum;
        (initialNum >= finalNum) ? clearInterval(interval) : '';
        initialNum++;
      }, 50);
    }
    else {
      let intInitialNum = Math.floor(initialNum);
      let intFinalNum = Math.floor(finalNum);
      let interval = setInterval(function() {
        el.innerHTML = intInitialNum;
        if (intInitialNum >= intFinalNum) {
          clearInterval(interval);
          el.innerHTML = `${finalNum.toString().replace('.', ',')}`;
        }
        intInitialNum++;
      }, 50);
    }
  }

  export {counterAnimation}
    