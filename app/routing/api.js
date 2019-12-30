// Link data to source file
let profiles = require("../data/profiles");

module.exports = function(app) {
  // Feeds back json data when app/starter page is visited
  app.get("/api/profiles", function(req, res) {
    res.json(profiles);
  });

  // Action when use submits survey
  app.post("/api/profiles", function(req, res) {
    let profileMatch = {
      name: "",
      photo: "",
      prolfileDifference: 100
    };

    // Store results from survery to parse
    let userData = req.body;
    let userScores = userData.scores;

    // Holds difference between database and user score
    let totalDifference;

    // Iterate through all starter sin database.
    for (let i = 0; i < profiles.length; i++) {
      let checkProfiles = profiles[i];
      totalDifference = 0;

      // Loop through all scores
      for (let j = 0; j < checkProfiles.scores.length; j++) {
        let currentprofilescore = checkProfiles.scores[j];
        let currentUserScore = userScores[j];

        // Calulate differences
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentprofilescore));
      }

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= profileMatch.starterDifference) {
        // Reset the starterMatch to be the new starter.
        prolfileMatch.name = checkProfiles.name;
        prolfileMatch.photo = checkProfiles.photo;
        profileMatch.profileDifference = totalDifference;
      }
    }

    // Save user data as new pokemon
    profiles.push(userData);

    // Return a JSON with the user's starterMatch. This will be used by the HTML in the next page
    res.json(profileMatch);
  });
};