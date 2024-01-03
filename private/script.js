
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};
function getRankColor(rankName) {
    const rankColors = {
        'IRON': '#5C5C5C',
        'BRONZE': '#CD7F32',
        'SILVER': '#C0C0C0',
        'GOLD': '#FFD700',
        'PLATINUM': '#00BFFF',
        'DIAMOND': '#4B0082',
        'ASCENDANT': '#008000',
        'IMMORTAL': '#B22222',
        'RADIANT': '#FFA500'
    };

    return rankColors[rankName.split(" ")[0].toUpperCase()] || '#FFFFFF';
}

function createProgressBar(data){
    let rankName = data['data']['currenttierpatched']
    let rankColor = getRankColor(rankName)

    let progressbar = document.getElementById('rank-progress')
    let progressbarBottom = document.getElementById('rank-progress-bottom')

    let color = 'red'
    let last = data['data']['mmr_change_to_last_game']
    let currentMMR = data['data']['ranking_in_tier']
    if (last > 0) {
        color = 'green'
    }


    let bottomProgress
    let topProgress
    let topLabel = last + " RR"
    if(last > 0) {
        bottomProgress = currentMMR
        topLabel = "+" + topLabel
        topProgress = currentMMR - last
    }
    else{
        bottomProgress = currentMMR - last
        topProgress = currentMMR
    }

    topProgress = topProgress.clamp(0, 100)
    bottomProgress = bottomProgress.clamp(0, 100)

    progressbar.style.width = topProgress + '%'
    progressbar.textContent = topLabel;
    //progressbar.style.setProperty("--glowColor", color)
    progressbar.style.backgroundColor = rankColor


    progressbarBottom.style.width = bottomProgress + '%'
    //progressbarBottom.style.setProperty("--glowColor", color)
    progressbarBottom.style.backgroundColor = color
}

function createWebsiteData(data, scale){
    createProgressBar(data)

    document.getElementById('rank-shield-image').src = data['data']['images']['large'];
    let rankName = document.getElementById('rank-name');
    rankName.textContent = data['data']['currenttierpatched']
    rankName.style.color = getRankColor(data['data']['currenttierpatched']);

    document.getElementById('rank-percentage').textContent = data['data']['ranking_in_tier'] + " RR";

    document.getElementById('player-name').textContent = data['data']['name'];

    document.getElementById('rank-container').style.transform = `scale(${scale})`;
}

function fetchData() {
    // const name = '{{name}}';
    // const tag = '{{tag}}';
    // const scale = '{{scale}}';
    const name = document.getElementById("data-name").textContent;
    const tag = document.getElementById("data-tag").textContent;
    const scale = document.getElementById("data-scale").textContent;

    //Yao Ming/Faded
    //GodOfEuWest/6189
    //Timetraveller/9822

    fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${name}/${tag}`)
        .then(response => response.json())
        .then(data => createWebsiteData(data, scale))
        .catch(error => console.error('Error fetching data:', error));
}

fetchData();
setInterval(fetchData, 1000 * 60); // then every minute