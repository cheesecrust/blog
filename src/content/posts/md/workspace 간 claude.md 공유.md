
```bash
cat > ~/Repository/play-mcp-web/.git/hooks/post-checkout << 'EOF'
#!/bin/sh
REPO_ROOT="/Users/yan.su/Repository/play-mcp-web"
WORKTREE="$(git rev-parse --show-toplevel)"

if [ "$WORKTREE" = "$REPO_ROOT" ]; then
    exit 0
fi

copy_if_missing() {
    src="$REPO_ROOT/$1"
    dst="$WORKTREE/$1"
    if [ -f "$src" ] && [ ! -f "$dst" ]; then
        mkdir -p "$(dirname "$dst")"
        cp "$src" "$dst"
    fi
}

copy_if_missing "CLAUDE.md"
copy_if_missing "deploy/.env.local"
copy_if_missing "config.json"
EOF
chmod +x ~/Repository/play-mcp-web/.git/hooks/post-checkout
```

