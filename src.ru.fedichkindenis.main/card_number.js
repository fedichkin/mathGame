(function(w, d) {

    w.fd             = {};
    var fd           = w.fd,
        model        = {},
        keyNumbers   = [1, 2, 4, 8, 16],
        currentIndex = 0,
        result       = 0;

    function init() {
        var userNumberBtn = d.querySelector(".user_number"),
            yesBtn        = d.querySelector(".yes"),
            noBtn         = d.querySelector(".no"),
            title         = d.querySelector(".title");

        userNumberBtn.addEventListener("click", function() {
            var buttons = d.querySelector(".buttons");

            title.innerHTML = "В данной таблице присутствует Ваше число?";
            generateCard();
            buttons.style.display = "block";
        });

        yesBtn.addEventListener("click", function() {
            var cardNumbers = d.querySelector(".card_numbers"),
                buttons     = d.querySelector(".buttons");

            if (currentIndex < keyNumbers.length) {
                title.innerHTML = "В данной таблице присутствует Ваше число?";
                result += keyNumbers[currentIndex];
            }

            currentIndex++;

            if (currentIndex < keyNumbers.length) {
                generateCard();
            } else {
                cardNumbers.innerHTML = "";
                title.innerHTML       = "Ваше число: " + result;
                buttons.style.display = "none";
            }
        });

        noBtn.addEventListener("click", function() {
            var cardNumbers = d.querySelector(".card_numbers"),
                buttons     = d.querySelector(".buttons");

            currentIndex++;

            if (currentIndex < keyNumbers.length) {
                title.innerHTML = "В данной таблице присутствует Ваше число?";
                generateCard();
            } else {
                cardNumbers.innerHTML = "";
                title.innerHTML       = "Ваше число: " + result;
                buttons.style.display = "none";
            }
        });
    }

    function generateCards() {
        var index, keyNumber;

        for (index = 0; index < keyNumbers.length; index++) {
            keyNumber        = keyNumbers[index];
            model[keyNumber] = checkNumbers(keyNumber);
        }
    }

    function checkNumbers(keyNumber) {
        var selectNumber = [],
            index;

        for (index = 1; index <= 30; index++) {
            if ((index & keyNumber) !== 0) {
                selectNumber.push(index);
            }
        }

        return selectNumber;
    }

    function generateCard() {
        var cardNumbers = d.querySelector(".card_numbers"),
            table       = d.createElement("table"),
            indexR, indexC, row, cell;

        cardNumbers.innerHTML = "";

        for (indexR = 0; indexR < 3; indexR++) {
            row = table.insertRow();

            for (indexC = 0; indexC < 5; indexC++) {
                cell           = row.insertCell();
                cell.innerHTML = model[keyNumbers[currentIndex]][indexC + (indexR * 5)];
            }
        }

        cardNumbers.appendChild(table);
    }

    fd.show = function() {
        init();
        generateCards();
    }

})(window, document);