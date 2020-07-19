# This Dockerfile uses multi-stage build to customize DEV and PROD images:
# https://docs.docker.com/develop/develop-images/multistage-build/

FROM python:3.8-slim-buster

LABEL maintainer="mhusseini1208@gmail.com"

ARG DJANGO_ENV

ENV DJANGO_ENV=${DJANGO_ENV} \
    # python:
    PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    # pip:
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # poetry:
    POETRY_VERSION=1.0.9 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry' \
    DJANGO_DEBUG=false


# System deps:
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    bash \
    build-essential \
    curl \
    gettext \
    git \
    libpq-dev \
    wget \
    # Cleaning cache:
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
    && pip install "poetry==$POETRY_VERSION" && poetry --version

# Copy only requirements, to cache them in docker layer
WORKDIR /usr/app
COPY ./poetry.lock ./pyproject.toml /usr/app/

# Project initialization:
RUN echo "$DJANGO_ENV" \
    && poetry install \
    $(if [ "$DJANGO_ENV" = 'production' ]; then echo '--no-dev'; fi) \
    --no-interaction --no-ansi \
    # Cleaning poetry installation's cache for production:
    && if [ "$DJANGO_ENV" = 'production' ]; then rm -rf "$POETRY_CACHE_DIR"; fi


COPY . /usr/app/.

CMD [ "bash", "/usr/app/gunicorn.sh" ]

# ENTRYPOINT ["sh", "/usr/app/gunicorn.sh"]

