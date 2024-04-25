
process.on('message', (message) => {
    if (message === 'start') {
     const result = performLongComputation();
     process.send(result);
    }
  });
  
  function performLongComputation() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }
  