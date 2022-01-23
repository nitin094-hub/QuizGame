from django.urls import path

from UserQuizzes.views import QuizListCreateAPIView

urlpatterns = [
    path('quiz/',QuizListCreateAPIView.as_view()),
]