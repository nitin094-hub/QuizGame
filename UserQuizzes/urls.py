from django.urls import path

from UserQuizzes.views import QuestionsAPI, QuestionsListCreateAPIView, QuizAPI, QuizListCreateAPIView, ScoreAPIView

urlpatterns = [
    path('quiz/',QuizListCreateAPIView.as_view()),
    path('quiz/<uuid:pk>',QuizAPI.as_view()),
    path('questions/',QuestionsListCreateAPIView.as_view()),
    path('questions/<int:pk>',QuestionsAPI.as_view()),
    path('scores/',ScoreAPIView.as_view()),
]