#!/usr/bin/env sh

set -o errexit
set -o nounset


# Check that $DJANGO_ENV is set to "production",
# fail otherwise, since it may break things:
echo "DJANGO_ENV is $DJANGO_ENV"
if [ "$DJANGO_ENV" != 'production' ]; then
  echo 'Error: DJANGO_ENV is not set to "production".'
  echo 'Application will not start.'
  exit 1
fi

export DJANGO_ENV

# Start gunicorn:
gunicorn stock_service.wsgi \
  --workers=4 `# Sync worker settings` \
  --max-requests=2000 \
  --max-requests-jitter=400 \
  --bind='0.0.0.0:80' `# Run Django on 80 port` \
  --bind='0.0.0.0:8000' `# Run Django on 80 port` \
  --bind='unix:/var/gunicorn/tmp/gunicorn.sock' `# Run Django on 80 port` \
  # --bind='stock_service:80'  \
  --chdir='/usr/app/'   `# Locations` \
  --log-file='/etc/django_log' \
  --worker-tmp-dir='/dev/shm'