## CONTRIBUTING

### Commit Message Format

All commits must follow [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Each commit messages consists of a `type` and a `short summary`, the `(<scope>)` field is optional:

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope, normally will be the domain or a feature.
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test

```

#### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests
