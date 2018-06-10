
const lstm = new ml5.LSTMGenerator('trump', modelReady);


let textInput;
let tempSlider;
let lengthSlider;


function modelReady() {
  select('#status').html('Model Loaded');
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  button = select('#generate');

  // textInput.input(generate);
  textInput.keyPressed
  button.mousePressed(generate);

}

function generate() {

  select('#status').html('Generating...');

  let original = textInput.value();
  let txt = original.toLowerCase();

  if (txt.length > 0) {
    let data = {
      seed: txt,
      temperature: 0.5, 
      length: txt.length * 1.5 > 100 ? txt.length * 1.5 : 100
    };

    lstm.generate(data, gotData);

    function gotData(result) {
      select('#status').html('Ready!');
      select('#result').html(result.generated);
    }
  }
}

function onEnterPressed() {
  let key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    generate();
    return false;
  }
  else {
    return true;
  }
}
