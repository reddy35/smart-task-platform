# Smart Task Coordination & Notification Platform

Tech stack:
- Django + DRF
- Celery + Redis
- Flask notification microservice (SMTP emails)
- PostgreSQL
- React + Plotly frontend
- Docker + Nginx

## Quick start (Docker)

```bash
docker-compose up --build
```

Then open: http://localhost

Apply migrations:

```bash
docker-compose exec django python manage.py migrate
docker-compose exec django python manage.py loaddata fixtures/sample_tasks.json
```

Configure SMTP by editing `flask_service/.env.example` values.
