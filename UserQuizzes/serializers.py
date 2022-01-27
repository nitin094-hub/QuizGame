from rest_framework import serializers
from .models import Questions, Quizzes

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = "__all__"