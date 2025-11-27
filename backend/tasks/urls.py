from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, task_stats

router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="task")

urlpatterns = [
    path("", include(router.urls)),
    path("stats/", task_stats, name="task-stats"),
]
