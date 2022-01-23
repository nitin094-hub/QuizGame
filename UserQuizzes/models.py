from turtle import title
from django.db import models
import uuid
from authentication.models import User

# Create your models here.

class Quizzes(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
    )
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
    time_limit = models.IntegerField(default=0)
    attended = models.IntegerField(default=0)
    max_score = models.IntegerField()

    def __str__(self):
        return self.title

class Questions(models.Model):
    question = models.TextField(max_length=511)
    opt1 = models.CharField(max_length=255)
    opt2 = models.CharField(max_length=255)
    opt3 = models.CharField(max_length=255)
    opt4 = models.CharField(max_length=255)
    ans = models.CharField(max_length=255)
    points = models.IntegerField(default=0)
    quiz = models.ForeignKey(to=Quizzes,on_delete=models.CASCADE)

    def __str__(self):
        return self.question