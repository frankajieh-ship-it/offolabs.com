#!/bin/bash

# OFFO Launch Platform - MongoDB Restore Script
# Usage: ./restore-db.sh <backup-file.tar.gz>

# Load environment variables
set -a
source ../.env
set +a

# Check if backup file provided
if [ -z "$1" ]; then
    echo "❌ Error: No backup file specified"
    echo "Usage: ./restore-db.sh <backup-file.tar.gz>"
    echo ""
    echo "Available backups:"
    ls -lh ./backups/*.tar.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
BACKUP_DIR="./backups"
TEMP_DIR="${BACKUP_DIR}/temp"

# Check if backup file exists
if [ ! -f "${BACKUP_FILE}" ]; then
    echo "❌ Error: Backup file not found: ${BACKUP_FILE}"
    exit 1
fi

echo "⚠️  WARNING: This will restore the database from backup"
echo "📁 Backup file: ${BACKUP_FILE}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Restore cancelled"
    exit 0
fi

# Create temp directory
mkdir -p "${TEMP_DIR}"

# Extract backup
echo "📦 Extracting backup..."
tar -xzf "${BACKUP_FILE}" -C "${TEMP_DIR}"

# Find the backup directory
BACKUP_NAME=$(basename "${BACKUP_FILE}" .tar.gz)
RESTORE_PATH="${TEMP_DIR}/${BACKUP_NAME}"

# Perform restore
echo "🔄 Restoring database..."
if mongorestore --uri="${MONGODB_URI}" --drop "${RESTORE_PATH}"; then
    echo "✅ Database restored successfully!"

    # Clean up temp files
    rm -rf "${TEMP_DIR}"

    echo "✨ Restore complete!"
    exit 0
else
    echo "❌ Restore failed!"
    rm -rf "${TEMP_DIR}"
    exit 1
fi
