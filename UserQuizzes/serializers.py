from rest_framework import serializers
from .models import Questions, Quizzes, UserScores

class QuizSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d/%b/%Y %H:%M",read_only = True)
    class Meta:
        model = Quizzes
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = "__all__"

class UserScoreSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d/%b/%Y %H:%M",read_only = True)
    class Meta:
        model = UserScores
        fields = "__all__"