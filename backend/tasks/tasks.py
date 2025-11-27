    import requests
    from datetime import datetime
    from celery import shared_task
    from django.conf import settings
    from django.utils import timezone
    from .models import Task

    @shared_task
    def send_task_reminder(task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return "Task not found"

        payload = {
            "to": task.assignee_email,
            "subject": f"Reminder: {task.title}",
            "body": f"""Hi,

This is a reminder for the task:

Title: {task.title}
Description: {task.description}
Status: {task.status}
Due at: {task.due_at}

Thanks,
Smart Task Platform
"""
        }

        url = f"{settings.NOTIFICATION_SERVICE_URL}/notify"
        try:
            resp = requests.post(url, json=payload, timeout=5)
            return f"Notification sent, status={resp.status_code}"
        except Exception as exc:
            return f"Notification error: {exc}"


    def schedule_reminder_for_task(task_id, reminder_at: datetime):
        if reminder_at < timezone.now():
            send_task_reminder.delay(task_id)
        else:
            send_task_reminder.apply_async((task_id,), eta=reminder_at)
