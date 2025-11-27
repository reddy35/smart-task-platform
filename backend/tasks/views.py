from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import Task
from .serializers import TaskSerializer
from .tasks import schedule_reminder_for_task

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("-created_at")
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()
        if task.reminder_at:
            schedule_reminder_for_task(task.id, task.reminder_at)

    def perform_update(self, serializer):
        task = serializer.save()
        if task.reminder_at:
            schedule_reminder_for_task(task.id, task.reminder_at)


@api_view(["GET"])
def task_stats(request):
    total = Task.objects.count()
    completed = Task.objects.filter(status="completed").count()
    pending = Task.objects.filter(status="pending").count()
    in_progress = Task.objects.filter(status="in_progress").count()

    today = timezone.now().date()
    completed_today = Task.objects.filter(
        status="completed", updated_at__date=today
    ).count()

    return Response(
        {
            "total": total,
            "completed": completed,
            "pending": pending,
            "in_progress": in_progress,
            "completed_today": completed_today,
        }
    )
