# Django Project

- To make docker image for Django project one should know,
  - How Django starts, what it needs, and how it's configured for production

Python + dependencies + env vars + startup command + open port

## Project structure

- `manage.py`: run commands
- `settings.py`: config via env vars
- `wsgi.py`, `asgi.py` and `settings.py`: production entry point
- App & project folders: copied into image

## Dependencies

- `requirements.txt` or `pyproject.toml` with all packages listed
- `pip freeze > requirements.txt` Docker installs these during build.

## Configuration Management

- Use environment variables for settings (never hardcode secrets)
- Use `os.environ` or libraries like `django-environ.` to make env vars dynamically configurable
- Critical settings: SECRET_KEY, DEBUG, ALLOWED_HOSTS, DATABASE_URL

## Static & Media Files

- Configure STATIC_ROOT and MEDIA_ROOT in settings
- Plan for serving static files (Django doesn't serve in production)
- Options: Collect static during build or use volumes/cloud storage
- `python manage.py collectstatic`

## Database

- Database lives in a separate container (PostgreSQL/MySQL)
- DB config comes from env vars. (POSTGRES_HOST, POSTGRES_DB, etc.)
- Migrations: Run `python manage.py migrate` on container start
- Don't use SQLite in production containers (use PostgreSQL/MySQL)

## WSGI/ASGI Server

- In production Gunicorn (WSGI) or Uvicorn (ASGI) server should be used.
- `gunicorn project.wsgi:application`

## Security Essentials

- Set `DEBUG=False` in production
- Set `ALLOWED_HOSTS` (e.g., ["*"] for dev, specific domains for prod)
- Use `.dockerignore` to exclude secrets, virtual env, **pycache**


## ENTRYPOINT and CMD

- Both define what command runs when the container starts.
- CMD: Sets default arguments that get passed to the `ENTRYPOINT`.
- ENTRYPOINT: Sets the main, fixed command for the container. Think of it as the executable.