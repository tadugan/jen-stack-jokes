console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    fetchJokes();
    $('#addJokeButton').on('click', submitJoke);
}


function fetchJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes'
    })
    .then(function (response) {
        console.log('updating jokes on DOM');
        displayJokes(response);
    })
    .catch(function (err) {
        console.log('Error', err);
    });
}


function submitJoke() {
    if (areInputsEmpty()) {
        alert('Please make sure all input fields are filled properly.');
        return;
    }
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: {
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val()
        }
    })
    .then(function (response) {
        console.log(response);
        fetchJokes();
        clearInputs();
    })
    .catch(function (err) {
        console.log('Error', err);
    });
}


function displayJokes(jokeArray) {
    let el = $('#outputDiv');
    el.empty();
    for (let joke of jokeArray) {
        el.append(`<p>${joke.whoseJoke}: "${joke.jokeQuestion}" <br> Answer: "${joke.punchLine}"</p>`);
    }
}

function clearInputs() {
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}

function areInputsEmpty() {
    if ($('#whoseJokeIn').val() === '' || $('#questionIn').val() === '' || $('#punchlineIn').val() === '') {
        return true;
    }
}