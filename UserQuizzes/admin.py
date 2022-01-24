from django.contrib import admin
from .models import Quizzes,Questions

# Register your models here.
admin.site.register(Questions)
admin.site.register(Quizzes)