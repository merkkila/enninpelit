$(function () {
    if (typeof window.games === 'undefined') {   
        window.games = {}
        console.log("got created", window.games)
    } else {
        console.log("was already created")
    }
    let activeGame = '';
    /*     $('button').click(function (e) {
            console.log("moi")
            $(e.currentTarget).hasClass('right') ? $(this).addClass('btn-success') : $(this).addClass('btn-danger');
        }) */
    $('#toggle-game-selection').click(function () {
        $('.game-selection').slideToggle(400);
    })

    $('.game-card').click(function () {
        if (activeGame !== $(this).data('game')) {
            games[$(this).data('game')].initGame();
            activeGame = $(this).data('game');
        }
        $('.game-selection').slideToggle(400);
    })

})

let games = {
    'quiz': {
        clearTextName: 'Tie-to-vi-sa',
        initGame: function () {
            console.log('quiz initiated')
            quiz(questions);
        }
    },
    'math': {
        clearTextName: 'Plus ja mii-nus',
        initGame: function () {
            console.log('math initiated')
            math();
        }
    }
}


function math() {
    if (typeof window.games.math === 'undefined') {
        window.games.math = {
            score: 0,
            answer: ''
        }   
    }
    console.log('math game init, current points', window.games.math.score)
    paintMathQuestion();
    //check math question
    $('.game-container').on('click','#btn-answer-math',function(){
        if($('#mathAnswer').val() == window.games.math.answer){ 
            setScore('math',1)
            $('#btn-answer-math').hide();
            $('#btn-new-question-math').show();
            $('#right-or-wrong').html(`<span id="right-answer-math"><i class="fa fa-check"></i> Oi-kein! <span class="motivational-emoji">&#128588;</span></span>
            `);
        } else {
            $('#right-or-wrong').html(`           
            <span id="wrong-answer-math"> Ei ai-van oi-kein <span class="motivational-emoji">&#129300;</span></span>`);
        }
    })
    $('.game-container').on('click','#btn-new-question-math',function(){
        $('#btn-new-question-math').hide();
        paintMathQuestion();
    })

}

function paintMathQuestion(){ // game title etc could stay?
    $('.game-container').html(`
    <h2 class="game-title">Las-ke!</h2>
    <div class="question">
    <div class="form-group" id="form-group-math">
        <label for="mathAnswer" class="question-text" id="mathQuestion"> ${generateMathQuestion()}
        </label>
        <input type="number" min="0" step="1" id="mathAnswer" placeholder="?"/>
        <button class="btn btn-primary" id="btn-answer-math">Tar-kis-ta</button>
        <button class="btn btn-primary" id="btn-new-question-math">Uu-si Ky-sy-mys</button>
        <div id="right-or-wrong"></div>
    </div>
`)
}

function generateMathQuestion() { 
    let leftSide = getRandomIntInclusive(1, 10) 
    let operator = Math.random() >= 0.5 ? '+' : '-' 
    let rightSide = operator === '-' ? getRandomIntInclusive(1, leftSide) : getRandomIntInclusive(1,10)
    window.games.math.answer = operator === '-' ? leftSide - rightSide : leftSide + rightSide
    return ` ${leftSide} ${operator} ${rightSide} = `
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setScore(game,pointsToAdd){
    console.log(window.games['math'])
    window.games[game].score = window.games[game].score + pointsToAdd;
    console.log("new score set " + game ,window.games[game].score)
    //add visually to a scoreboard
}


let questions = [
    {
        question: 'Mon-ta-ko jal-kaa on kis-sal-la?',
        type: 'multiple',
        answer: 4,
        choices: [
            2, 4, 6, 8
        ]
    },
    {
        question: 'Mon-ta-ko jal-kaa on ku-kol-la?',
        type: 'multiple',
        answer: 2,
        choices: [
            2, 4, 6, 8
        ]
    },

]

/* function painter() */
function quiz(questions) {
    let currentQuestion = 0;
    let choices = '';
    questions[currentQuestion].choices.forEach(element => {
        choices += `<button class="btn btn-primary">${element}</button>`
    })
    $('.game-container').html(`
    <div class="question" id="question-${currentQuestion}">
    <div class="question-text"> ${questions[currentQuestion].question} </div>
    <div class="answers">
        ${choices}
    </div>
</div> `)
    /*events  ${choices}*/
}