#!/bin/bash
# Marlene Brits Attorneys - Enhancement Daemon
# Runs health checks every 5 minutes in the background

PROJECT_DIR="/home/z/my-project"
LOG_FILE="$PROJECT_DIR/enhancement-log.txt"
INTERVAL=300  # 5 minutes

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Enhancement daemon started (PID: $$)" >> "$LOG_FILE"

while true; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Health check
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ]; then
        echo "[$TIMESTAMP] Health: OK (HTTP 200)" >> "$LOG_FILE"
    else
        echo "[$TIMESTAMP] Health: WARNING (HTTP $HTTP_CODE)" >> "$LOG_FILE"
    fi
    
    # Lint check
    cd "$PROJECT_DIR"
    LINT_OUTPUT=$(bun run lint 2>&1)
    if [ $? -eq 0 ]; then
        echo "[$TIMESTAMP] Lint: PASSED" >> "$LOG_FILE"
    else
        echo "[$TIMESTAMP] Lint: FAILED" >> "$LOG_FILE"
        echo "$LINT_OUTPUT" >> "$LOG_FILE"
    fi
    
    sleep $INTERVAL
done
