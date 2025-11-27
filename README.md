.

🧠 Smart Task Coordination & Notification Platform

A real-time task management and automated reminder system designed for distributed teams to streamline workflow coordination, avoid missed deadlines, and improve productivity with live dashboards and email notifications.

🚀 Tech Stack
Area	Technology
Backend	Django, Django REST Framework
Frontend	React, Plotly.js
Async Processing	Celery, Redis
Notifications	Flask Microservice, SMTP Email
Database	PostgreSQL
Deployment	Docker, Docker Compose, Nginx
Version Control	Git & GitHub
📌 Features

📑 Create, update, assign and track tasks in real time

📨 Automated email reminders via Celery + Flask + SMTP

⏱ Scheduled triggers for reminders & deadlines

📊 Dashboard with interactive analytics (Plotly charts)

👥 Status tracking: Pending, In-progress & Completed

🧱 Modular microservices architecture

🐳 Fully containerized deployment using Docker + Nginx

📁 PostgreSQL persistence with DRF REST APIs

🏗 System Architecture
React Frontend → Nginx Reverse Proxy → Django REST API → PostgreSQL
                                  ↓
                           Celery + Redis
                                  ↓
                     Flask Notification Microservice → SMTP Email

⚙️ Run the Project (Docker)
1️⃣ Start application
docker-compose up --build

2️⃣ Apply Django migrations
docker-compose exec django python manage.py migrate

3️⃣ Load sample data (optional)
docker-compose exec django python manage.py loaddata fixtures/sample_tasks.json

🌍 Access UI
http://localhost

🧪 API Endpoints (Examples)
Method	Endpoint	Description
GET	/api/tasks/	List tasks
POST	/api/tasks/	Create task
PUT / PATCH	/api/tasks/<id>/	Update task
DELETE	/api/tasks/<id>/	Delete task
GET	/api/stats/	Dashboard stats
📂 Project Structure
smart-task-platform/
│── backend/               # Django + DRF + Celery backend
│── flask_service/         # Email microservice
│── frontend/              # React + Plotly UI
│── nginx/                 # Reverse proxy config
│── docker-compose.yml
│── README.md

🎯 Purpose of the Project

This platform was built to solve challenges related to manual task follow-ups, poor coordination, and deadline tracking in distributed teams. By combining automation, real-time dashboards, and microservices architecture, the system improves productivity and communication efficiency.
<img width="1280" height="964" alt="output" src="https://github.com/user-attachments/assets/a333a4d5-725e-4ad4-b5f1-16ace9cc2465" />
