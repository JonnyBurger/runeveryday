workflow "Update jonny.run" {
  resolves = ["Install", "Update"]
  on = "schedule(0/5 * * * *)"
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "i"
}

action "Update" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  secrets = ["GITHUB_TOKEN", "STRAVA_ACCESS_TOKEN", "STRAVA_CLIENT_ID", "STRAVA_CLIENT_SECRET", "MONGO_URL", "GOOGLE_MAPS_KEY", "TWITTER_API_PUBLIC_KEY", "TWITTER_API_SECRET_KEY", "TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_TOKEN_SECRET"]
  args = "run update"
}

workflow "Update Twitter Bio" {
  resolves = ["GitHub Action for npm-1"]
  on = "schedule(0/5 * * * *)"
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "i"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for npm"]
  args = "run update-twitter-bio"
  secrets = ["TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_TOKEN_SECRET", "TWITTER_API_PUBLIC_KEY", "TWITTER_API_SECRET_KEY"]
}
