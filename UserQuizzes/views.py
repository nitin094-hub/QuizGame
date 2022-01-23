# from rest_framework.generics import ListCreateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from UserQuizzes.serializers import QuizSerializer
from .models import Quizzes

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
