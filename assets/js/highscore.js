var scoreList = document.getElementById("score-list")







function displayScores() {
    var allScores = JSON.parse(localStorage.getItem("displayScore")) || [];

    for (var i = 0; i < allScores.length; i++) {
        var listEl = document.createElement("li")
        listEl.textContent = allScores[i].initials + " " + allScores[i].Score

        scoreList.appendChild(listEl);
    }


}
displayScores();

function clearStorage() {
    localStorage.removeItem("displayScore")
    window.location.reload()

}