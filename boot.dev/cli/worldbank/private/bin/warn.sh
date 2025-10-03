#!/bin/sh

# This script is used to print nice warning messages
# branded in worldbanc style

# Defaults (can be overridden by env)
WARN_MESSAGE=${WARN_MESSAGE:-The auditor is here}
WARN_FROM_NAME=${WARN_FROM_NAME:-Your worst nightmare}

echo "============================================"
echo "=========== WORLDBANC WARNING =============="
echo "============================================"
echo "$WARN_MESSAGE"
echo "============================================"
echo "From: $WARN_FROM_NAME"
echo "============================================"

if [ -z "$WARN_MESSAGE" ]; then
    echo "WARN_MESSAGE is not set. Exiting with error."
    exit 69
fi

if [ -z "$WARN_FROM_NAME" ]; then
    echo "WARN_FROM_NAME is not set. Exiting with error."
    exit 69
fi
