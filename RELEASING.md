# Releasing

Task Pulse is a single package with no runtime dependencies. A release is a version bump, a rebuilt client bundle, a tag, and a GitHub release.

1. Update `version` in `package.json` and add the entry to `CHANGELOG.md`.
2. Rebuild and test:

   ```sh
   npm run build
   npm test
   ```

3. Commit the version, changelog, and any rebuilt files.

   ```sh
   git add -A
   git commit -m "chore: release v0.2.1"
   ```

4. Tag and push:

   ```sh
   git tag v0.2.1
   git push origin main --tags
   ```

5. Create a GitHub Release from the tag, using the matching `CHANGELOG.md` section as the notes.

6. Optional: publish to npm. The package has no build step for consumers and ships `lib/client.js`:

   ```sh
   npm publish --access public
   ```

   Publishing is independent of GitHub installs; the plugin manager can install either the Git repository or the npm package.
