if (localStorage.getItem("cryptozoo.saves") !== null) {
	loadedState = JSON.parse(localStorage.getItem("cryptozoo.saves"));
	
	if (loadedState.resetData !== 1) {
		jsonObj = {"bronze": 10, "silver": 0, "calcEggPrice": 10, "dinosaurs": [], "eggs": [], "upgrades": {}, "resetData": 1};
		localStorage.setItem("cryptozoo.saves", JSON.stringify(jsonObj));
		window.location.reload(true);
	}

	$(".statusbar #bronze").attr("data-bronze", loadedState.bronze);
	$(".statusbar #bronze span#currency").text(loadedState.bronze);
	$(".statusbar #silver").attr("data-silver", loadedState.silver);
	$(".statusbar #silver span#currency").text(loadedState.silver);
	$(".shop #buyegg").attr("data-price", loadedState.calcEggPrice);
	$(".shop #buyegg p#price span").text(loadedState.calcEggPrice);
	if (loadedState.upgrades.maxDinos !== undefined) {
		$(".list #maxDinos span#max").text(loadedState.upgrades.maxDinos.value);
		$(".popups #upgrades #maxDinos").attr("data-value", loadedState.upgrades.maxDinos.value);
		$(".popups #upgrades #maxDinos").attr("data-price", loadedState.upgrades.maxDinos.calcPrize);
		$(".popups #upgrades #maxDinos #details #value span").text(loadedState.upgrades.maxDinos.value);
		$(".popups #upgrades #maxDinos button").text(loadedState.upgrades.maxDinos.calcPrize + " Bronze");
	}
	if (loadedState.upgrades.maxGen !== undefined) {
		$(".list #maxGen span#max").text(loadedState.upgrades.maxGen.value);
		$(".popups #upgrades #maxGen").attr("data-value", loadedState.upgrades.maxGen.value);
		$(".popups #upgrades #maxGen").attr("data-price", loadedState.upgrades.maxGen.calcPrize);
		$(".popups #upgrades #maxGen #details #value span").text(loadedState.upgrades.maxGen.value);
		$(".popups #upgrades #maxGen button").text(loadedState.upgrades.maxGen.calcPrize + " Bronze");
	}
	$.each(loadedState.dinosaurs, (i, value) => {
		$(".main .list").append('<div class="dinosaur" gen="'+value.gen+'" genb="' + value.bPS + '"><div class="genInfo"><p id="title">'+value.title+'</p><p id="rarity">'+value.rarity+'</p></div><p id="timeDisp">' + value.bPS + ' B/s</p></div>')
	});	
	$.each(loadedState.eggs, (i, value) => {
		$(".main .list").append('<div class="egg" data-time="'+value.countTotal+'"><div class="genInfo"><p id="title">Egg</p><p id="rarity">Rarity: unknown</p></div><p id="timeDisp">'+value.countLeft+'</p></div>');
	});	
}




$(".shop #buyegg").click(() => {
	if (Number($(".statusbar #bronze span#currency").text()) >= Number($(".shop #buyegg").attr("data-price")) && $(".list .dinosaur").length + $(".list .egg").length < $(".popups #upgrades #maxDinos").attr("data-value")) {
		currency("bronze", Number($(".shop #buyegg").attr("data-price")) * -1, 1);
		random = Math.floor((Math.random() * 100) + 1) + 20;
		$(".main .list").append('<div class="egg" data-time="'+random+'"><div class="genInfo"><p id="title">Egg</p><p id="rarity">Rarity: unknown</p></div><p id="timeDisp">'+random+'</p></div>');
		calcEggPrice();
	}
});

setInterval(function () {
	allEggs = document.querySelectorAll(".list .egg");
	allEggs.forEach((e) => {
		time = e.querySelector("#timeDisp").innerHTML;
		if (time > 1) {
			e.querySelector("#timeDisp").innerHTML = time - 1;
		} else if (time === "Hatch!") {
		
		} else {
			e.querySelector("#timeDisp").innerHTML = "Hatch!";
		}
		
	});
	genMoneyDino();
	calcMaxDinos();
	saveData();
}, 1000);

function genMoneyDino() {
	allDinos = document.querySelectorAll(".list .dinosaur");
	totalPerSecond = 0;
	allDinos.forEach((e) => {
		$(".statusbar #bronze").attr("data-bronze", round(Number($(".statusbar #bronze span#currency").text()) + Number(e.getAttribute("genb")), 1));
		$(".statusbar #bronze span#currency").text(round(Number($(".statusbar #bronze span#currency").text()) + Number(e.getAttribute("genb")), 1));
		totalPerSecond += Number(e.getAttribute("genb"));
	});
	$(".statusbar #bronze span#ps").text(round(totalPerSecond, 1))
}

function calcEggPrice() {
	allDinos = $(".list .dinosaur").length + $(".list .egg").length;
	if (allDinos === 0) {
		$(".shop #buyegg").attr("data-price", "10");
		$(".shop #buyegg p#price span").text("10");
	} else {
		money = round(10 * (allDinos * (Math.random() + 0.5)), 1);
		$(".shop #buyegg").attr("data-price", money);
		$(".shop #buyegg p#price span").text(money);
	}
}

function calcMaxDinos() {
	allDinos = $(".list .dinosaur").length + $(".list .egg").length;
	$(".list #maxDinos").attr("data-current", allDinos);
	$(".list #maxDinos span#current").text(allDinos);
	$(".list #maxDinos span#max").text($(".popups #upgrades #maxDinos").attr("data-value"));
}

function saveData() {
	let jsonObj = {"bronze": 0, "silver": 0, "calcEggPrice": 0, "dinosaurs": [], "eggs": [], "upgrades": {}, "resetData": 0};
	jsonObj.bronze = Number($(".statusbar #bronze").attr("data-bronze"));
	jsonObj.silver = Number($(".statusbar #silver").attr("data-silver"));
	jsonObj.calcEggPrice = $(".shop #buyegg").attr("data-price");
	
	if (localStorage.getItem("cryptozoo.saves") !== null) {
		jsonObj.resetData = JSON.parse(localStorage.getItem("cryptozoo.saves")).resetData

	}
	jsonObj.upgrades.maxDinos = {"calcPrize": Number($(".popups #upgrades #maxDinos").attr("data-price")), "value": Number($(".popups #upgrades #maxDinos").attr("data-value")),};
	jsonObj.upgrades.maxGen = {"calcPrize": Number($(".popups #upgrades #maxGen").attr("data-price")), "value": Number($(".popups #upgrades #maxGen").attr("data-value")),};
	document.querySelectorAll(".list .dinosaur").forEach((e) => {
		title = e.querySelector("#title").innerHTML;
		rarity = e.querySelector("#rarity").innerHTML;
		bPS = Number(e.getAttribute("genb"));
		gen = Number(e.getAttribute("gen"));
		jsonObj.dinosaurs.push({
			title:title,
			rarity:rarity,
			bPS:bPS,
			gen:gen
		})
	});
	document.querySelectorAll(".list .egg").forEach((e) => {
		countLeft = Number(e.querySelector("#timeDisp").innerHTML);
		countTotal = Number(e.getAttribute("data-time"));
		jsonObj.eggs.push({
			countLeft: countLeft,
			countTotal: countTotal
		})
	});
	localStorage.setItem("cryptozoo.saves", JSON.stringify(jsonObj));
}





$(".shop .options .shop-item#fuse").click(() => {
	if (Number($(".statusbar #silver").attr("data-silver")) >= 10) {
		$(".shop .options").hide();
		$(".shop .fuse").show();
	
		$(".list .dinosaur").click(function () {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			} else {
				if ($(".list .dinosaur.selected").length === 1) {
					dino1 = $(".list .dinosaur.selected");
					dino2 = $(this);
					if (Number(dino1.attr("gen")) === Number(dino2.attr("gen")) && Number(dino1.attr("gen")) < Number($(".popups #upgrades #maxGen").attr("data-value")) && Number(dino2.attr("gen")) < Number($(".popups #upgrades #maxGen").attr("data-value"))) {
						if (currency("silver", -10, 1)) {
							bPS = Number(dino1.attr("genb")) + Number(dino2.attr("genb"));
							let newGen = "";
							if (Number(dino1.attr("gen")) > Number(dino2.attr("gen"))) {newGen = Number(dino1.attr("gen")) + 1;} else {newGen = Number(dino2.attr("gen")) + 1;};
							newBPS = round(bPS * (1 + (0.05 * newGen)), 1);
							let newRarity = "";
							random = Math.random();
							if (random > 0.5) {newRarity = dino1.children(".genInfo").children("#rarity").text()} else {newRarity = dino2.children(".genInfo").children("#rarity").text()};
							dino1.remove(); dino2.remove();
							$(".main .list").append('<div class="dinosaur" gen="'+newGen+'" genb="' + newBPS + '"><div class="genInfo"><p id="title">Dinosaur Gen '+newGen+'</p><p id="rarity">'+newRarity+'</p></div><p id="timeDisp">' + newBPS + ' B/s</p></div>');
						}
						$(".list .dinosaur").off("click");
						$(".list .dinosaur").removeClass("selected");
						$(".shop .fuse").hide();
						$(".shop .options").show();
					}
				} else {
					$(this).addClass("selected");
				}
			}
		});
	}
});

$(".shop .fuse .button").click(() => {
	$(".list .dinosaur").off("click");
	$(".list .dinosaur").removeClass("selected");
	$(".shop .fuse").hide();
	$(".shop .options").show();
});





$(".shop .options .shop-item#shop").click(() => {
	$(".popups > div").hide();
	$(".popups #shop").show();
	$(".popups").show();
});

$(".shop .options .shop-item#upgrades").click(() => {
	$(".popups > div").hide();
	$(".popups #upgrades").show();
	$(".popups").show();
});

$(".shop .options .shop-item#settings").click(() => {
	$(".popups > div").hide();
	$(".popups #settings").show();
	$(".popups").show();
});

$(".popups .header #close").click(() => {$(".popups").hide();});

$(".popups #shop .content .buy-item button").click(function () {
	jsonData = JSON.parse($(this).parent().attr("data-buy"));
	if (currency(jsonData.pay.type, jsonData.pay.amount * -1, 1)) {
		currency(jsonData.get.type, jsonData.get.amount);
	}
});

$(".popups #upgrades .upgrade button").click(function () {
	setUpgrade($(this));
});