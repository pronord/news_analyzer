export class CommitList {
  constructor(container, createCommit) {
    this.container = container;
    this.createCommit = createCommit;
    this.commitlist = null;
  }

  _addCommit(date, photo, name, email, text) {
    const newCommit = this.createCommit(date, photo, name, email, text);
    this.container.append(newCommit);
  }

  render(arr) {
    arr.slice(0, 20).forEach(item => {
      this._addCommit(item.commit.committer.date, item.author.avatar_url, item.commit.author.name, item.commit.author.email, item.commit.message);
    });
  }
}