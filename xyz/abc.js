$.get('https://fitm.sun-asterisk.vn//core_values/questions/random_question?language=en')
    .then(function (response) {
        answer(response.data.question.question_token, response.data.answers, response.data.answers.length - 1);
    });

function answer(question_token, answers, index) {
    if (index >= 0) {
        $.post('https://fitm.sun-asterisk.vn//core_values/questions/valid_answer', {
            "question_token": question_token,
            "answer_tokens[]": answers[index].answer_token
        }).then(function (response) {
            var result = parseJwt(response.data.token);
            if (result.correct) {
                doSomeThing(response.data.token);
            } else {
                index = index - 1;
                answer(question_token, answers, index);
            }
        });
    } else {
        alert('có câu hỏi multichoice, tôi chưa xử lý được nhé, bấm lại nút đi bạn ei!');
    }
}

function doSomeThing(token) {
    $('#token-core-value').val(token);
    $('#recaptcha-checkbox, #recaptcha-checkmark').toggleClass('hidden');
    $('#captcha-msg').addClass('hidden');
    if ($('#user_email').val() != '' && $('#user_password').val() != '') {
        $('#wsm-login-button').click();
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
