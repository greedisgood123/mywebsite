# Git Version Control Workflow

## 🎯 Why Version Control Matters

Version control is essential for:
- **Collaboration**: Work with others safely
- **Backup**: Never lose your work
- **History**: Track changes over time
- **Experimentation**: Try new features without risk
- **Deployment**: Deploy specific versions reliably

## 📋 Git Basics

### Repository Structure
```
/Users/fadhlankhalid/Downloads/Folder/
├── .git/                    # Git repository data
├── .gitignore              # Files to ignore
├── index.html              # Main HTML file
├── assets/                 # Static assets
├── README.md               # Project documentation
└── *.md                    # Additional documentation
```

### Basic Commands

```bash
# Check repository status
git status

# Add files to staging
git add filename.txt
git add .                    # Add all files

# Commit changes
git commit -m "feat: add new feature"

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b feature-branch

# Switch between branches
git checkout main

# Merge branches
git merge feature-branch

# Push to remote repository
git push origin main

# Pull latest changes
git pull origin main
```

## 📝 Commit Message Convention

Follow conventional commit format:

```bash
# Format: type(scope): description

# Examples:
git commit -m "feat: add user authentication"
git commit -m "fix: resolve mobile menu bug"
git commit -m "docs: update installation guide"
git commit -m "style: format CSS with Prettier"
git commit -m "refactor: simplify navigation logic"
git commit -m "test: add unit tests for form validation"
git commit -m "chore: update dependencies"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🌿 Branching Strategy

### Main Branches
- `main` (or `master`): Production-ready code
- `develop`: Integration branch for features

### Feature Branches
```bash
# Create feature branch
git checkout -b feature/user-login

# Work on feature
# ... make changes ...
# ... commit changes ...

# Merge back to develop
git checkout develop
git merge feature/user-login

# Delete feature branch
git branch -d feature/user-login
```

### Branch Naming Convention
- `feature/description`: New features
- `bugfix/issue-description`: Bug fixes
- `hotfix/critical-bug`: Critical fixes for production
- `release/v1.2.0`: Release preparation

## 🔄 Workflow for This Project

### Daily Development
```bash
# 1. Get latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-contact-form

# 3. Make changes and commit
git add .
git commit -m "feat: implement contact form validation"

# 4. Push feature branch
git push origin feature/add-contact-form

# 5. Create Pull Request (on GitHub/GitLab)
# ... review and merge ...

# 6. Switch back to main
git checkout main
git pull origin main
```

### Handling Merge Conflicts
```bash
# When you have conflicts during merge
git status                    # See conflicted files
# Edit conflicted files manually
git add resolved-file.js      # Mark as resolved
git commit                    # Complete the merge
```

## 📊 Git Best Practices

### Commit Often
- Make small, focused commits
- Commit related changes together
- Write clear commit messages

### Branch Management
- Keep branches short-lived
- Delete merged branches
- Use descriptive branch names

### Code Review
- Always review code before merging
- Use pull requests for collaboration
- Test changes before merging

### Repository Health
- Keep repository clean
- Use `.gitignore` properly
- Avoid committing large files
- Regular maintenance (squash, rebase)

## 🔧 Git Configuration

### Basic Setup
```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main

# Enable helpful features
git config --global core.autocrlf input  # For macOS/Linux
git config --global pull.rebase true
```

### Useful Aliases
```bash
# Add to ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
```

## 🚨 Common Issues and Solutions

### Forgot to Add Files
```bash
# Amend last commit
git add forgotten-file.js
git commit --amend
```

### Wrong Commit Message
```bash
# Fix last commit message
git commit --amend -m "New message"
```

### Committed to Wrong Branch
```bash
# Move commit to correct branch
git log --oneline          # Find commit hash
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset --hard HEAD~1    # Remove from wrong branch
```

### Lost Changes
```bash
# Recover lost commits
git reflog
git checkout commit-hash
```

## 📈 Advanced Git Features

### Interactive Rebase
```bash
# Clean up commit history
git rebase -i HEAD~3        # Last 3 commits
# Choose: pick, squash, edit, drop
```

### Stashing Changes
```bash
# Temporarily save work
git stash save "work in progress"

# Restore stashed work
git stash pop

# List stashes
git stash list
```

### Git Bisect
```bash
# Find bug introduction
git bisect start
git bisect bad HEAD
git bisect good commit-hash
# Test each commit
git bisect reset
```

## 🔗 Remote Repository Setup

### GitHub Setup
```bash
# Add remote repository
git remote add origin https://github.com/username/repo-name.git

# Push to GitHub
git push -u origin main

# Clone repository
git clone https://github.com/username/repo-name.git
```

### SSH vs HTTPS
```bash
# Use SSH for better security
git remote set-url origin git@github.com:username/repo-name.git

# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add to ssh-agent and GitHub
```

## 📊 Git Statistics

### Repository Statistics
```bash
# View contributors
git shortlog -sn

# File change statistics
git log --stat

# Commit frequency
git log --pretty=format:"%h %ad %s" --date=short
```

### GitHub Insights
- **Pulse**: Weekly activity summary
- **Contributors**: Contribution statistics
- **Traffic**: Repository visitors
- **Commits**: Commit activity graph

## 🎯 Next Steps

1. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository
   - Push your local repository

2. **Set Up Collaboration**
   - Add collaborators
   - Set up branch protection
   - Configure CI/CD pipelines

3. **Learn Advanced Git**
   - Git hooks for automation
   - Git LFS for large files
   - Git submodules for dependencies

## 📚 Resources

### Documentation
- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Guides](https://guides.github.com/)

### Tools
- [GitHub Desktop](https://desktop.github.com/)
- [GitKraken](https://www.gitkraken.com/)
- [Sourcetree](https://www.sourcetreeapp.com/)

### Learning
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Exercises](https://gitexercises.fracz.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

*Remember: Git is a powerful tool that becomes more valuable as you use it consistently. Start with the basics and gradually adopt more advanced features as needed.*
