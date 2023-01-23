$("head").append('<link rel="stylesheet" href="/wbrkgames/betaProgram.css">')
betaPopup = '<div class="betaPopup"><div class="popup"><h2>This is the beta program.</h2><a href="https://wbrkgames.netlify.app">Goto Release</a><a onclick="betaRemove()">Close</a></div></div>';
$("body").append(betaPopup);
function betaRemove() {$(".betaPopup").remove()};