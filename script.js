let canvas = document.querySelector("#canvas");
let content = canvas.getContext("2d");
let video = document.querySelector("#video");
const questionBox = document.getElementById("questionBox");
const answerBox = document.getElementById("answerBox");
let Buttons = document.getElementsByClassName("round-button");
let playerNameBox = document.getElementById ("playerNameBox");
let playerNameInput = document.getElementById ("player-name");
let playerNameButton = document.getElementById ("player-name-button");
let correctLabel = document.getElementById ("correct-answers");  
let incorrectLabel = document.getElementById ("incorrect-answers"); 
let modalHeader = document.getElementById ("modal-header");
let modalchecked = document.getElementById ("btn-modal"); 
let elems = document.getElementsByClassName('round-button');
let empezarButton = document.getElementsByClassName('lbl-empezar');

let questions = []
let playerName = "";
let playerRecords = [];
let cor;
let incor;
let counter;



if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({video:true}).then (stream =>{

        video.srcObject = stream;
        video.play;
        
    })

}



let increase = Math.PI * 2 / elems.length; 
let x = 0, y = 0, angle = -89.53, elem;

for (var i = 0; i < elems.length; i++) {  // He optado por formar el rosco con js de esta manera
    elem = elems[i];
    x =  15*Math.cos(angle) + 40;
    y =  28*Math.sin(angle) + 43;
    elem.style.position = 'fixed';
    elem.style.left = x + 'vw';
    elem.style.top = y + 'vh';
    elem.style.transform ="translate"
    angle += increase;
}

playerNameButton.addEventListener ("click", function(){  //Funcion que se llama al presionar el boton de jugar, dentro de la ventana modal

    playerName = playerNameInput.value;
    playerNameBox.value = playerName;
    if (playerName === null) {console.log(`Bye`); return false;}

    pasapalabra ();
    
});

setInterval(function(){

    

    if (counter > 0) {
        
        counter--;
        id = document.getElementById("count");
        id.innerHTML = counter;

    } else if (counter === 0 && modalchecked.checked === false) {counter = -1; gameOver(); return false};

},1000);


pasapalabra = function() {
    // Status: 0 = No respondida. 1 = Respuesta incorrecta. 2 = Respuesta correcta.
questions = [ // Esposible introducir varias preguntas/respuestas por letra en forma de array (En este caso la letra D), deben mantener el orden respuesta->pregunta. 
    // El programa las preguntará indistintamente en cada iteración si optamos por "saltarlas" con el comando "pasapalabra".

{ letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},

{ letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},

{ letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},

{ letter: "d", answer: ["diarrea", "dodecaedro", "dodo"], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", "CON LA D. Poliedro de doce caras", "CON LA D. Especie extinta de ave columbiforme de la subfamilia Raphinae"]},

{ letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},

{ letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},

{ letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},

{ letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},

{ letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},

{ letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},

{ letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},

{ letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},

{ letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},

{ letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},

{ letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},

{ letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},

{ letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},

{ letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},

{ letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},

{ letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},

{ letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},

{ letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},

{ letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},

{ letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},

{ letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},

{ letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal  por indígenas americanos"},

{ letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}, ];


cor = 0;
incor = 0;
correctLabel.value = cor;
incorrectLabel.value = incor;

counter = 150;

for (i=0; i<Buttons.length; i++) { // Sets all the buttons to the default state

    Buttons[i].classList.value = "round-button";

}

let firstButton = document.getElementById("a");

firstButton.classList.add ("current");
modalHeader.innerHTML = "Game Over";


nextQuestion();


};

function nextQuestion (questionInd = 0) {



    if (questions.some(item => item.status === 0)) { // Si quedan respuestas por responder

        if (typeof(questions[questionInd].question) === "object") {  // Checkea si es una letra con varias preguntas/respuestas
            
            let randomAnswerInd = printOneQuestion(questionInd); // Llama a una funcion que selecciona una pregunta, la imprime y devuelve el index de la pregunta que coincide con el de la respuesta.
            validateAnswer(questionInd, randomAnswerInd)
            
        }    

        else {

            questionBox.value = questions[questionInd].question; // Imprime la pregunta en caso de ser sólo haber una.
            validateAnswer (questionInd)
            
        }

    } else {counter = -1; gameOver();}  // Si se han respondido todas las preguntas el juego acaba.  

}

function printOneQuestion (questionInd){

    let randomQuestionInd
    if (!questions[questionInd].previousQuestion) {
        
        randomQuestionInd = Math.floor ((Math.random() * questions[questionInd].question.length)); // Elige aleatoriamente una pregunta
        questions[questionInd].previousQuestion = randomQuestionInd;   
    
    }
    else {randomQuestionInd = questions[questionInd].previousQuestion} 

    questionBox.value = questions[questionInd].question[randomQuestionInd];
    return randomQuestionInd; //devuelve el index de la pregunta que coincide con el index de la respuesta

}

function validateAnswer (questionInd, randomAnswerInd = 0) {

        
        answerBox.onkeypress = function(e){

            if (!e) e = window.event;
            var keyCode = e.code 

            if (keyCode == 'Enter'){

                answer = answerBox.value;
              
                if (answer === "END") {gameOver()} //Si la respuesta es "END" (en mayúscula) acaba el juego
      
                else if (questions[questionInd].status === 0) {  // Si la letra actual está NO está respondida
                      
                      checkAnswer (answer, questionInd, randomAnswerInd);
      
      
                } //else {questionInd++; nextQuestion(questionInd);} 


              return false;
            }
        }
        
        


}


function checkAnswer(answer, questionInd, randomAnswerInd = 0) {

    let matchingAnswer;
    if (typeof(questions[questionInd].question) === "object") { matchingAnswer =  questions[questionInd].answer[randomAnswerInd];

    } else {matchingAnswer =  questions[questionInd].answer;}

    switch(answer.toLowerCase()) {

            case matchingAnswer:
            cor++; //Suma uno al contador de respuestas correctas.
            correctLabel.value = cor;
            greenRed (2, questionInd);
            questionInd = arrayPointer(2,questionInd);
            nextButton(questionInd);

            nextQuestion(questionInd);

        break;
        case "pasapalabra":

            greenRed (4,questionInd)
            questionInd = arrayPointer(0,questionInd);
            nextButton(questionInd);
            nextQuestion(questionInd); 

        break;
        case "":    // Considero "" como un error involuntario así que vuelvo a preguntar la misma pregunta
            nextButton(questionInd);
            nextQuestion(questionInd);

        break;
        default: //Si se responde cualquier otra cosa, la respuesta será incorrecta            
            incor++; //Suma uno al contador de respuestas incorrectas.
            incorrectLabel.value = incor;
            greenRed (1, questionInd);
            questionInd = arrayPointer(1, questionInd);
            nextButton(questionInd);
            nextQuestion(questionInd);

    }

answerBox.value ="";

}

function greenRed (st, questionInd){

    let currentButton = document.getElementById(questions[questionInd].letter)

    if (st === 2) {currentButton.classList.add ("correct");}
    else if (st === 1) {currentButton.classList.add ("incorrect");}

    currentButton.classList.remove ("current")

}

function nextButton (questionInd) {

    let nextButton = document.getElementById(questions[questionInd].letter)

    nextButton.classList.add ("current");
}

function arrayPointer (st, questionInd) {

    questions[questionInd].status = st; //Le damos el status de correcta/incorrecta/sin responder a la pregunta 

    if (questionInd+1 < questions.length) {questionInd++}  // Si hay más preguntas después de esta en el array

    else if (questionInd+1 === questions.length && questions.some(item => item.status === 0)) { //Si estamos al final del array y hay aún preguntas sin responder
        
        questions = questions.filter(element => element.status === 0); // Actualizo el array para que en el siguiente loop contenga sólo preguntas por responder
        questionInd = 0  //Inicializo el index a 0 para que recorra el array desde el principio
    }

    return questionInd;

}


function gameOver(){

    if (!questions.some(item => item.status === 0)) { registerPlayer()} // Registra al jugador en el ranking y lo imprime en caso de que NO queden respuestas por responder.
    
    document.getElementById('ranking').innerHTML = "";

    playerRecords.forEach (element => {
        

        document.getElementById('ranking').innerHTML += `<p>#${(playerRecords.indexOf(element) + 1)} Player: ${element.name} --> Score: ${element.score} pt(s) </p>`;    


    });


    
    modalchecked.checked = true;

    playAgainQuestion();

}


function registerPlayer(){

    let playerScore = (cor - incor) + 73; // Puntuación basada en respuestas correctas e incorrectas (Todas correctas = 100 pts)
            
    if (playerRecords.length <= 4) {
        
        playerRecords.push({name: playerName, score: playerScore});

    } else {

        playerRecords.pop();
        playerRecords.push({name: playerName, score: playerScore});

    }

    playerRecords.sort(function(a, b){  // Organiza el array de puntuación de mayor a menor puntuación

        if (a.score < b.score) 
        {
          return 1;
        }    
        else if (a.score > b.score)
        {
          return -1;
        }   
        return 0;
      });

}



function playAgainQuestion () {

answer = null;

    if (answer === null) {console.log ('Bye'); return false;}
        else {

            switch(answer.toUpperCase()) {
                case "Y":
                    modalHeader.innerHTML = "Bienvenido a Pasapalabra";
                    pasapalabra();
                break;
                case "N":
                    console.log ('Bye');
                    return false;
                break;
                default:
                    playAgainQuestion(`Incorrect answer. Do you want to play again? (Y/N)`);
            }

        }


}