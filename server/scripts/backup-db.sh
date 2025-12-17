#!/bin/bash

# OFFO Launch Platform - MongoDB Backup Script
# Usage: ./backup-db.sh

# Load environment variables
set -a
source ../.env
set +a

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="offo-launch-backup-${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

echo "🔄 Starting MongoDB backup..."
echo "📦 Backup name: ${BACKUP_NAME}"

# Perform backup
if mongodump --uri="${MONGODB_URI}" --out="${BACKUP_PATH}"; then
    echo "✅ Backup completed successfully!"

    # Compress backup
    echo "📦 Compressing backup..."
    tar -czf "${BACKUP_PATH}.tar.gz" -C "${BACKUP_DIR}" "${BACKUP_NAME}"

    # Remove uncompressed backup
    rm -rf "${BACKUP_PATH}"

    echo "✅ Backup compressed: ${BACKUP_PATH}.tar.gz"

    # Calculate backup size
    BACKUP_SIZE=$(du -h "${BACKUP_PATH}.tar.gz" | cut -f1)
    echo "📊 Backup size: ${BACKUP_SIZE}"

    # Clean up old backups (keep last 7 days)
    echo "🧹 Cleaning up old backups..."
    find "${BACKUP_DIR}" -name "offo-launch-backup-*.tar.gz" -mtime +7 -delete

    # Upload to cloud (optional - uncomment if using AWS S3)
    # echo "☁️  Uploading to S3..."
    # aws s3 cp "${BACKUP_PATH}.tar.gz" s3://your-bucket/backups/

    echo "✨ Backup process complete!"
    exit 0
else
    echo "❌ Backup failed!"
    exit 1
fi
