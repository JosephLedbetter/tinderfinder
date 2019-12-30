let profiles = require("../data/starting.js");

module.exports = function(app) {
  app.get("/api/profiles", function(req, res) {
    res.json(profiles);
  });

  app.post("/api/profiles", function(req, res) {
    let profileMatch = {
      name: "",
      photo: "",
      prolfileDifference: 100
    };

    let userData = req.body;
    let userScores = userData.scores;

    let totalDifference;

    for (let i = 0; i < profiles.length; i++) {
      let checkProfiles = profiles[i];
      totalDifference = 0;

      for (let j = 0; j < checkProfiles.scores.length; j++) {
        let currentprofilescore = checkProfiles.scores[j];
        let currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentprofilescore));
      }

      if (totalDifference <= profileMatch.starterDifference) {

        prolfileMatch.name = checkProfiles.name;
        prolfileMatch.photo = checkProfiles.photo;
        profileMatch.profileDifference = totalDifference;
      }
    }

    profiles.push(userData);

    res.json(profileMatch);
  });
};