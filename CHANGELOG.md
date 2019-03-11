# Changelog

## [0.2.12](https://github.com/fimars/hell/releases/tag/v0.2.12) - 2019-03-11)

### Added

- set `@helldoc/cli` default sourceDir value as `process.cwd`;

### Fixed

- fix `siteConfig.dest` resolve path error.

## [0.2.11](https://github.com/fimars/hell/releases/tag/v0.2.11) - 2019-03-08)

### Added

- add `siteConfig.head` for customer site header tags.
- add `siteConfig.themeConfig` for config application theme.
- add WDS.contentBase and CopyPlugin to hold the static files.

### Changed

- modify some WDS config about serve static files.

## [0.2.10](https://github.com/fimars/hell/releases/tag/v0.2.10) - 2019-02-28)

### Fixed

- fix `siteConfig.base` not work bug.

## [0.2.9](https://github.com/fimars/hell/releases/tag/v0.2.9) - 2019-02-28)

### Added

- add `-o, --output <dir>` cli options for set output dir.

### Changed

- Make the output of the `dev` directive more friendly.
- Make the UE of docs app more friendly.

## [0.2.8](https://github.com/fimars/hell/releases/tag/v0.2.8) - 2019-02-21

### Added

- need `typescript` as runtime deps now.

## [0.2.7](https://github.com/fimars/hell/releases/tag/v0.2.7) - 2019-02-21

### Fixed

- fix another node_modules resolve error.

## [0.2.3](https://github.com/fimars/hell/releases/tag/v0.2.3) - 2019-02-20

### Fixed

- fix some app node_modules resolve error.

### Changed

- Use lerna hold the project now.

## [0.2.2](https://github.com/fimars/hell/releases/tag/v0.2.2) - 2019-02-19

### Added

- Add `hell.config.js` as doc config file.

### Changed

- Lazy loading article data.
- Rewrite product `siteData.js` part logic.

## [0.2.1](https://github.com/fimars/hell/releases/tag/v0.2.1) - 2019-02-13

### Added

- Hold the release with CHANGELOG.md.

## [0.2.0](https://github.com/fimars/hell/releases/tag/v0.2.0) - 2019-02-13

### Added

- A Readable READMD with `tl;dr` and first CHANGELOG.
- Simple CLI work well.
- The first @hell/core version for server a doc site.
