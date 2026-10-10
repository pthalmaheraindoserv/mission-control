#!/usr/bin/env bash
set -euo pipefail
command -v docker >/dev/null || { echo 'Docker belum terpasang'; exit 1; }
[ -f .env ] || cp .env.example .env
docker compose up -d --build
echo 'Mission Control aktif di http://localhost:3000'
