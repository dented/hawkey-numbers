jQuery(function($) {

  const $startBtn = $('#start-random');
  const $stopBtn = $('#stop-random');
  const $resetBtn = $('#reset-random');
  const $settingForm = $('#form-setting');
  const $numberToChange = $('#main-number');
  const $bgToChange = $('#main-background');
  const $timer = $('#timer');
  const $audioCountdown = document.getElementById('audio-countdown')
  let howLongToWait = 1000;
  let shouldRun = true;
  let minimum = 1;
  let maximum = 10;
  let timer = 0;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function resetAll() {
    $settingForm.find('#minimum').val('1');
    $settingForm.find('#maximum').val('10');
    $settingForm.find('#wait').val('1000');
    $startBtn.removeClass('d-none');
    $stopBtn.addClass('d-none');
    $numberToChange.text('Are you ready?');
    $timer.text('0');
    timer = 0;

    howLongToWait = 1000;
    shouldRun = false;
  }

  async function startCountdown() {
    $timer.text('0');
    $startBtn.addClass('d-none');
    $stopBtn.removeClass('d-none');
    minimum = $settingForm.find('#minimum').val();
    maximum = $settingForm.find('#maximum').val();
    howLongToWait = $settingForm.find('#wait').val();
    $audioCountdown.play();

    $numberToChange.text('5');
    await sleep(1000);
    $numberToChange.text('4');
    await sleep(1000);
    $numberToChange.text('3');
    await sleep(1000);
    $numberToChange.text('2');
    await sleep(1000);
    $numberToChange.text('1');
    await sleep(1000);
    $numberToChange.text('Go!');
    await sleep(1000);
    runTimer();
    startNumbers();
  }

  $startBtn.on('click', function(evt) {
    evt.preventDefault();
    shouldRun = true;
    startCountdown();
  });

  $resetBtn.on('click', function(evt) {
    evt.preventDefault();
    resetAll();
  });

  $stopBtn.on('click', function(evt) {
    evt.preventDefault();
    shouldRun = false;
    $startBtn.removeClass('d-none');
    $stopBtn.addClass('d-none');
    timer = 0;
  });

  $('#bg-options .form-check-input').on('change', function(evt) {
    const $body = $(document.body);
    $body.removeClass().addClass($(this).val());
  });

  async function startNumbers() {
    while(shouldRun) {
      $numberToChange.text(getRandomInt(minimum, maximum));
      await sleep(howLongToWait);
    }
  }

  async function runTimer() {
    while(shouldRun) {
      timer += 1;
      $timer.text(timer);
      await sleep(1000);
    }
  }

});