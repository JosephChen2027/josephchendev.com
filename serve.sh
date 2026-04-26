#!/bin/bash
# Serve the Joseph Chen portfolio on localhost for preview.
# Defaults to port 8765; override with: ./serve.sh 9000
# Auto-opens in your default browser.

cd "$(dirname "$0")"
PORT="${1:-8765}"

if lsof -i ":$PORT" -t >/dev/null 2>&1; then
  echo "Port $PORT already in use. Killing existing process..."
  lsof -i ":$PORT" -t | xargs kill -9 2>/dev/null || true
  sleep 1
fi

URL="http://localhost:$PORT/"
echo "Serving $(pwd) at $URL"
echo "Press Ctrl+C to stop."
echo ""

(sleep 0.8 && open "$URL") &

exec python3 -m http.server "$PORT" --bind 127.0.0.1
