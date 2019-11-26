$(function () {
    var words = (localStorage.getItem('listHihi') !== null) ? JSON.parse(localStorage.getItem('listHihi')) : [];
    var luckyNumber = 0;
    var timeoutRandom1 = 425;
    var timeoutRandom2 = [400, 456, 800, 756, 300, 900, 700];

    $('#people-modal').on('show.bs.modal', function (event) {
        if (words.length) {
            $('textarea.people').val(words.join('\n'));
        }
    });

    $('.btn-people').text('Nhập danh sách phát nào (' + words.length + ')');

    $('.save-people').on('click', function () {
        $('#people-modal').modal('hide');
        var people = $('textarea.people').val();
        processData(people);
    });

    function processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var arrayText = allTextLines.filter(function (el) {
            return el !== '';
        });
        words = [];
        $.each(arrayText, function(i, el) {
            if ($.inArray(el, words) === -1) {
                words.push(el);
            }
        });

        localStorage.setItem('listHihi', JSON.stringify(words));
        $('.btn-people').text('Nhập danh sách phát nào (' + words.length + ')');
    }

    $('button.let-party').on('click', function () {
        if (words.length) {
            $('button.let-party').addClass('hidden');
            startParty();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ố ồ',
                text: 'Nhập vào danh sách tên đi nàoooo!',
                footer: 'Bạn có thấy bị lỗi css ở phía trên kia không?'
            })
        }
    });

    $('.let-new-party').on('click', function () {
        localStorage.removeItem('listHihi');
        location.reload();
    });

    $('.remove-people').on('click', function () {
        localStorage.removeItem('listHihi');
        words = [];
        $('.btn-people').text('Nhập danh sách phát nào (' + words.length + ')');
        $('textarea.people').val('');
    });

    $('.let-retry').on('click', function () {
        location.reload();
    });

    function loading() {
        var randoms = window.document.getElementsByClassName('randoms');
        for (var i = 0; i < randoms.length; i++) {
            changeWord(randoms[i]);
        }
    }

    function stopLoading() {
        $('.right.first').empty();
        $('.left.first').empty();
        $('.hihihaha').removeClass('hidden');
    }

    function showLuckyNumber() {
        luckyNumber = getLuckyNumber();
        var result = words[luckyNumber].split(',');
        $('.result-right').removeClass('hidden').find('.id-hihi').empty().html(result[0]);
        $('.result-left').removeClass('hidden').find('.name-haha').empty().html(result[0]);
    }

    function changeWord(a) {
        a.style.opacity = '0.1';
        var ranhihi = getRandomInt(0, words.length - 1);
        a.innerHTML = words[ranhihi];

        window.setTimeout(function() {
            a.style.opacity = '1';
        }, timeoutRandom1);

        window.setTimeout(function() {
            changeWord(a);
        }, timeoutRandom2[getRandomInt(0, 6)]);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startParty() {
        loading();
        setTimeout(function () {
            stopLoading();
            showLuckyNumber();
        }, 6000);
    }

    function getLuckyNumber() {
        return getRandomInt(0, words.length - 1);
    }
});
