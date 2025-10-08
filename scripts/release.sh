#!/bin/bash

# 🚀 Script de création de release
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔭 Observatory Release Script${NC}"
echo ""

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ Git working directory is not clean. Please commit or stash your changes.${NC}"
    git status -s
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}📦 Current version: ${YELLOW}v${CURRENT_VERSION}${NC}"

# Determine version bump type
BUMP_TYPE=${1:-patch}
if [[ ! "$BUMP_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "${RED}❌ Invalid bump type. Use: patch, minor, or major${NC}"
    exit 1
fi

echo -e "${BLUE}⬆️  Bump type: ${YELLOW}${BUMP_TYPE}${NC}"

# Check if CHANGELOG.md exists
if [ ! -f "CHANGELOG.md" ]; then
    echo -e "${YELLOW}⚠️  CHANGELOG.md not found. Creating one...${NC}"
    cat > CHANGELOG.md << EOF
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release

EOF
fi

# Ask for confirmation
echo ""
echo -e "${YELLOW}⚠️  Before proceeding:${NC}"
echo "   1. Have you updated CHANGELOG.md?"
echo "   2. Are all tests passing?"
echo "   3. Does the build work? (npm run build)"
echo ""
read -p "Continue with $BUMP_TYPE release? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Release cancelled${NC}"
    exit 1
fi

# Run tests and build
echo -e "${BLUE}🧪 Running build...${NC}"
npm run build:clean

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Fix errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"

# Bump version
echo -e "${BLUE}⬆️  Bumping version...${NC}"
npm version $BUMP_TYPE --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}✅ New version: ${YELLOW}v${NEW_VERSION}${NC}"

# Commit version bump
git add package.json package-lock.json
git commit -m "chore: bump version to v${NEW_VERSION}"

# Create tag
echo -e "${BLUE}🏷️  Creating tag v${NEW_VERSION}...${NC}"
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"

# Push
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push origin main
git push origin "v${NEW_VERSION}"

echo ""
echo -e "${GREEN}✅ Release v${NEW_VERSION} created successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Next steps:${NC}"
echo "   1. Go to GitHub Actions to monitor the build"
echo "   2. Wait ~2-3 minutes for the release to be created"
echo "   3. Check GitHub Releases for the ZIP file"
echo ""
echo -e "${BLUE}🔗 Links:${NC}"
echo "   • Actions: https://github.com/YOUR-USERNAME/observatory/actions"
echo "   • Releases: https://github.com/YOUR-USERNAME/observatory/releases"
echo ""

