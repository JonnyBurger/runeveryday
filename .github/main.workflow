workflow "Update github" {
  on = "schedule(0/5 * * * *)"
  resolves = ["GitHub Action for npm"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "i"
}

action "Update" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "update"
  needs = ["install"]
  secrets = ["GITHUB_TOKEN", "STRAVA_ACCESS_TOKEN", "STRAVA_CLIENT_ID", "STRAVA_CLIENT_SECRET", "MONGO_URL", "GOOGLE_MAPS_KEY", "TWITTER_API_PUBLIC_KEY", "TWITTER_API_SECRET_KEY", "TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_TOKEN_SECRET"]
}
