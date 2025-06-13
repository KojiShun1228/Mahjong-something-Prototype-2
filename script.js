// 牌の定義
const TILES = {
    m: '萬子', p: '筒子', s: '索子', ton: '東', nan: '南', sha: '西', pei: '北', haku: '白', hatu: '發', chun: '中'
};
const groupTiles = {
    "man-tiles": ['1m','2m','3m','4m','5m','6m','7m','8m','9m'],
    "pin-tiles": ['1p','2p','3p','4p','5p','6p','7p','8p','9p'],
    "sou-tiles": ['1s','2s','3s','4s','5s','6s','7s','8s','9s'],
    "honor-tiles": ['ton','nan','sha','pei','haku','hatu','chun']
};

Object.entries(groupTiles).forEach(([containerId, tiles]) => {
    const container = document.getElementById(containerId);
    tiles.forEach(tileStr => {
        const tileEl = renderTile(tileStr);
        tileEl.addEventListener('click', () => {
            if (hand.length < 14) {
                hand.push(tileStr);
                updateHand();
            }
        });
        container.appendChild(tileEl);
    });
});

// 手牌を管理する配列
let hand = [];

// DOM要素の取得
const allTilesContainer = document.getElementById('all-tiles');
const handTilesContainer = document.getElementById('hand-tiles');
// const calculateBtn = document.getElementById('calculate-btn');
// const resultDiv = document.getElementById('result');

// 牌を描画する関数
function renderTile(tileStr) {
    const tile = document.createElement('div');
    tile.className = `tile tile-${tileStr}`; 
    tile.dataset.tile = tileStr;
    return tile;
}

// 牌の種類の順序を定義
const SUIT_ORDER = { m: 1, p: 2, s: 3, ton: 4, nan: 5, sha: 6, pei: 7, haku: 8, hatu: 9, chun: 10, };

// 麻雀ルールに基づいた比較関数
function compareTiles(a, b) {
    const suitA = a.charAt(1);
    const suitB = b.charAt(1);
    const numA = parseInt(a.charAt(0));
    const numB = parseInt(b.charAt(0));

    // 1. 種類が違う場合は、SUIT_ORDER に基づいて比較
    if (suitA !== suitB) {
        return SUIT_ORDER[suitA] - SUIT_ORDER[suitB];
    }
    // 2. 種類が同じ場合は、数字で比較
    else {
        return numA - numB;
    }
}

// 手牌の表示を更新する関数
function updateHand() {
    handTilesContainer.innerHTML = '';
    // 手牌をソートして見やすくする
    hand.sort(compareTiles);
    hand.forEach((tileStr, index) => {
        const tileEl = renderTile(tileStr);
        tileEl.addEventListener('click', () => {
            // クリックされた牌を手牌から削除
            hand.splice(index, 1);
            updateHand();
        });
        handTilesContainer.appendChild(tileEl);
    });
    // 計算結果をリセット
    resultDiv.textContent = '';
}
