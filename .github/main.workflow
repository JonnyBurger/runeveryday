workflow "Update github" {
  on = "schedule(0 * * * *)"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "update"
  secrets = ["GITHUB_TOKEN", "STRAVA_ACCESS_TOKEN", "STRAVA_CLIENT_ID", "STRAVA_CLIENT_SECRET", "MONGO_URL", "GOOGLE_MAPS_KEY", "TWITTER_API_PUBLIC_KEY", "TWITTER_API_SECRET_KEY", "TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_TOKEN_SECRET"]
}