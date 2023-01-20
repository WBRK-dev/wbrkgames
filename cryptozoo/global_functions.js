function currency(type, amount, com) {
    amount = Number(amount);
    if (type === "bronze") {
        bronzeAmount = Number($(".statusbar #bronze").attr("data-bronze"));
        if (amount >= 0) {
            $(".statusbar #bronze").attr("data-bronze", round(bronzeAmount + amount, 1));
            $(".statusbar #bronze span#currency").text(round(bronzeAmount + amount, 1));
        } else if (com === 1) {
            if (bronzeAmount >= (amount * -1)) {
                $(".statusbar #bronze").attr("data-bronze", round(bronzeAmount + amount, 1));
                $(".statusbar #bronze span#currency").text(round(bronzeAmount + amount, 1));
                return true;
            } else {
                return false;
            }
        } else {
            $(".statusbar #bronze").attr("data-bronze", round(bronzeAmount + amount, 1));
            $(".statusbar #bronze span#currency").text(round(bronzeAmount + amount, 1));
        }
    } else if (type === "silver") {
        silverAmount = Number($(".statusbar #silver").attr("data-silver"));
        if (amount >= 0) {
            $(".statusbar #silver").attr("data-silver", round(silverAmount + amount, 1));
            $(".statusbar #silver span#currency").text(round(silverAmount + amount, 1));
        } else if (com === 1) {
            if (silverAmount >= (amount * -1)) {
                $(".statusbar #silver").attr("data-silver", round(silverAmount + amount, 1));
                $(".statusbar #silver span#currency").text(round(silverAmount + amount, 1));
                return true;
            } else {
                return false;
            }
        } else {
            $(".statusbar #silver").attr("data-silver", round(silverAmount + amount, 1));
            $(".statusbar #silver span#currency").text(round(silverAmount + amount, 1));
        }
    } else if (type === "w-credit") {
        wCreditAmount = Number($(".statusbar #w-credit").attr("data-w-credit"));
        if (amount >= 0) {
            $(".statusbar #w-credit").attr("data-w-credit", round(wCreditAmount + amount, 1));
            $(".statusbar #w-credit span#currency").text(round(wCreditAmount + amount, 1));
        } else if (com === 1) {
            if (wCreditAmount >= (amount * -1)) {
                $(".statusbar #w-credit").attr("data-w-credit", round(wCreditAmount + amount, 1));
                $(".statusbar #w-credit span#currency").text(round(wCreditAmount + amount, 1));
                return true;
            } else {
                return false;
            }
        } else {
            $(".statusbar #w-credit").attr("data-w-credit", round(wCreditAmount + amount, 1));
            $(".statusbar #w-credit span#currency").text(round(wCreditAmount + amount, 1));
        }
    }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function createDinosaur() {
    random = round(Math.random(), 1);
    if (random === 0) { random = 0.1 };
    if (random < 0.5) {
        $(".main .list").append('<div class="dinosaur" gen="0" genb="' + random + '"><div class="genInfo"><p id="title">Dinosaur</p><p id="rarity">Rarity: common</p></div><p id="timeDisp">' + random + ' B/s</p></div>')
    } else if (random >= 0.5 && random < 0.75) {
        random = round(random * 1.2, 1);
        $(".main .list").append('<div class="dinosaur" gen="0" genb="' + random + '"><div class="genInfo"><p id="title">Dinosaur</p><p id="rarity">Rarity: uncommon</p></div><p id="timeDisp">' + random + ' B/s</p></div>')
    } else if (random >= 0.75 && random < 0.85) {
        random = round(random * 1.4, 1);
        $(".main .list").append('<div class="dinosaur" gen="0" genb="' + random + '"><div class="genInfo"><p id="title">Dinosaur</p><p id="rarity">Rarity: rare</p></div><p id="timeDisp">' + random + ' B/s</p></div>')
    } else if (random >= 0.85 && random < 0.92) {
        random = round(random * 1.6, 1);
        $(".main .list").append('<div class="dinosaur" gen="0" genb="' + random + '"><div class="genInfo"><p id="title">Dinosaur</p><p id="rarity">Rarity: epic</p></div><p id="timeDisp">' + random + ' B/s</p></div>')
    } else {
        random = round(random * 1.8, 1);
        $(".main .list").append('<div class="dinosaur" gen="0" genb="' + random + '"><div class="genInfo"><p id="title">Dinosaur</p><p id="rarity">Rarity: legendary</p></div><p id="timeDisp">' + random + ' B/s</p></div>')
    }
}

function hatchAll() {
    document.querySelectorAll(".list .egg").forEach((e) => {
        if (e.querySelector("#timeDisp").innerHTML === "Hatch!") {
            e.remove();
            createDinosaur();
        }
    })
}

function debugCountdown() {
    document.querySelectorAll(".list .egg").forEach((e) => {
        if (e.querySelector("#timeDisp").innerHTML !== "Hatch!") {
            e.querySelector("#timeDisp").innerHTML = "5";
        }
    })
}

function resetProg() {
	localStorage.removeItem("cryptozoo.saves");
	window.location.reload(true);
}

function setUpgrade(elem) {
    value = Number(elem.parent().attr("data-value"));
    adder = Number(elem.parent().attr("data-adder"));
    price = Number(elem.parent().attr("data-price"));
    if (currency("bronze", price * -1, 1)) {
        newValue = value + adder;
        newPrice = round(price * (1 + (1 * (0.5 + Math.random()))), 1);
        elem.parent().attr("data-value", newValue);
        elem.parent().attr("data-price", newPrice);
        elem.parent().children("#details").children("#value").children("span").text(newValue);
        elem.parent().children("button").text(newPrice+" Bronze");
    }
}