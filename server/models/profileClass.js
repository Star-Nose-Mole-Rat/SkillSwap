class profileClass {
  constructor(profile, videos) {
    this._id = profile._id;
    this.displayName = profile.displayName;
    this.username = profile.username;
    this.videos = videos;
    this.points = profile.points;
    this.savedSkills = profile.savedSkills;
    this.__v = profile.__v;
  }
}

module.exports = profileClass;
