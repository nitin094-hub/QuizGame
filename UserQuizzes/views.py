# from rest_framework.generics import ListCreateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from UserQuizzes.serializers import QuestionSerializer, QuizSerializer
from .models import Questions, Quizzes

class QuizListCreateAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    serializer_class = QuizSerializer
    def get(self,request):
        queryset = Quizzes.objects.filter(owner=request.user)
        serialzer_obj = self.serializer_class(queryset,many = True)
        return Response(serialzer_obj.data)
    
    def post(self,request):
        serialzer_obj = self.serializer_class(data=request.data)
        serialzer_obj.is_valid(raise_exception=True)
        serialzer_obj.save()
        return Response(serialzer_obj.data)

class QuizAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Quizzes.objects.filter(owner=user)
    
class QuestionsListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = QuestionSerializer
    
    def get_queryset(self):
        if(self.request.method=="GET"):
            return Questions.objects.filter(quiz=self.request.GET.get("quiz",""))
        return Questions.objects.filter(quiz__in = Quizzes.objects.filter(owner = self.request.user))
    
class QuestionsAPI(generics.RetrieveUpdateDestroyAPIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = QuestionSerializer

    def get_queryset(self):
        return Questions.objects.filter(quiz__in = Quizzes.objects.filter(owner = self.request.user))
