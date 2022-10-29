const fs = require("fs");

const skins = [
  {
    id: 0,
    url: "player",
    cost: 0
  },
  {
    id: 1,
    url: "skull",
    cost: 120
  },
  {
    id: 2,
    url: "smileyface",
    cost: 110
  },
  {
    id: 3,
    url: "target",
    cost: 100
  },
  {
    id: 4,
    url: "basketball",
    cost: 90
  },
  {
    id: 5,
    url: "sunglasses",
    cost: 80
  },
  {
    id: 6,
    url: "thumbsup",
    cost: 70
  },
  {
    id: 7,
    url: "expressionless",
    cost: 60
  },
  {
    id: 8,
    url: "magician",
    cost: 50
  },
  {
    id: 9,
    url: "lightning",
    cost: 40
  },
  {
    id: 10,
    url: "crown",
    cost: 30
  },
  {
    id: 11,
    url: "cap",
    cost: 20
  },
  {
    id: 12,
    url: "questionmark",
    cost: 10
  }
];

fs.writeFileSync("src/skins.json", JSON.stringify(skins));

skins.sort(function(a, b){return a.cost - b.cost});

module.exports = skins;
