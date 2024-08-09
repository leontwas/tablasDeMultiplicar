document.addEventListener('DOMContentLoaded', function () {
  const tablas = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  let currentTable = null;
  let currentMultiplier = Math.floor(Math.random() * 10) + 1;
  let attempts = 0;
  const maxAttempts = 3;

  const questionElement = document.getElementById('question');
  const answerInput = document.getElementById('answer');
  const resultElement = document.getElementById('result');
  const hintElement = document.getElementById('hint');
  const statusImage = document.getElementById('status-image');
  const submitButton = document.getElementById('submit');
  const hintButton = document.getElementById('hint-btn');
  const practiceButton = document.getElementById('practice-btn');
  const tableSelect = document.getElementById('table-select');

  function setQuestion() {
    if (currentTable === null) return; // Si no se ha seleccionado una tabla

    questionElement.textContent = `¿Cuánto es ${currentTable} x ${currentMultiplier}?`;
    statusImage.src = 'images/image1.png';
    resultElement.textContent = '';
    hintElement.textContent = '';
    answerInput.value = '';
    answerInput.focus();
    attempts = 0;
  }

  function getHint(correctAnswer) {
    const answerString = correctAnswer.toString();
    const hintOptions = [
      `Comienza con ${answerString.charAt(0)}`,
      `Termina con ${answerString.charAt(answerString.length - 1)}`
    ];
    return hintOptions[Math.floor(Math.random() * hintOptions.length)];
  }

  function checkAnswer() {
    if (currentTable === null) return; // Si no se ha seleccionado una tabla

    const userAnswer = parseInt(answerInput.value, 10);
    const correctAnswer = currentTable * currentMultiplier;
    
    if (userAnswer === correctAnswer) {
      resultElement.textContent = '¡Correcto!';
      resultElement.classList.remove('text-danger', 'text-warning');
      resultElement.classList.add('text-success', 'message');
      statusImage.src = 'images/image2.png';
      setTimeout(nextQuestion, 2000);
    } else {
      attempts++;
      if (attempts < maxAttempts - 1) {
        resultElement.textContent = `Incorrecto. Intenta de nuevo.`;
        resultElement.classList.remove('text-success', 'text-warning');
        resultElement.classList.add('text-danger', 'message');
        hintElement.textContent = getHint(correctAnswer);
        statusImage.src = 'images/image3.png';
      } else if (attempts === maxAttempts - 1) {
        resultElement.textContent = `Te queda un intento.`;
        resultElement.classList.remove('text-success', 'text-danger');
        resultElement.classList.add('text-warning', 'message');
        statusImage.src = 'images/image4.png';
      } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta es ${correctAnswer}.`;
        resultElement.classList.remove('text-success', 'text-warning');
        resultElement.classList.add('text-danger', 'message');
        statusImage.src = 'images/image0.png';
        setTimeout(nextQuestion, 2000);
      }
    }
  }

  function showDecenaHint() {
    const correctAnswer = currentTable * currentMultiplier;
    const decena = Math.floor(correctAnswer / 10) * 10;
    hintElement.textContent = `El resultado está en la decena de los ${decena}.`;
  }

  function nextQuestion() {
    if (currentTable === null) return; // Si no se ha seleccionado una tabla

    currentMultiplier = Math.floor(Math.random() * 10) + 1;
    setQuestion();
  }

  function goToPracticePage() {
    window.location.href = 'tablas.html';
  }

  tableSelect.addEventListener('change', function() {
    currentTable = parseInt(tableSelect.value, 10);
    currentMultiplier = Math.floor(Math.random() * 10) + 1;
    setQuestion();
  });

  submitButton.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });
  hintButton.addEventListener('click', showDecenaHint);
  practiceButton.addEventListener('click', goToPracticePage);

  // Iniciar con la tabla seleccionada, si ya se ha seleccionado una.
  if (tableSelect.value) {
    currentTable = parseInt(tableSelect.value, 10);
    setQuestion();
  }
});
