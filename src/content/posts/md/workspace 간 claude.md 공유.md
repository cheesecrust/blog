
```bash
cat > ~/Repository/{repository_name}/.git/hooks/post-checkout << 'EOF'
#!/bin/sh
SOURCE="/Users/{user_name}/Repository/{repository_name}/CLAUDE.md"
TARGET="$(git rev-parse --show-toplevel)/CLAUDE.md"

if [ "$TARGET" != "$SOURCE" ] && [ ! -f "$TARGET" ]; then
    cp "$SOURCE" "$TARGET"
fi
EOF
chmod +x ~/Repository/{repository_name}/.git/hooks/post-checkout
```

