# from rest_framework.generics import ListCreateAPIView
from urllib import response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from UserQuizzes.serializers import QuestionSerializer, QuizSerializer, UserScoreSerializer
from .models import Questions, Quizzes, UserScores
from rest_framework import status

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
            quiz=self.request.GET.get("quiz","")
            return Questions.objects.filter(quiz=quiz)
        return Questions.objects.filter(quiz__in = Quizzes.objects.filter(owner = self.request.user))
    
    def post(self, request, *args, **kwargs):
        response =  super().post(request, *args, **kwargs)
        object = Quizzes.objects.get(id = response.data['quiz'])
        object.max_score = object.max_score + response.data["points"]
        object.no_of_questions +=1
        object.save()
        return response
        
class QuestionsAPI(generics.RetrieveUpdateDestroyAPIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = QuestionSerializer

    def get_queryset(self):
        return Questions.objects.filter(quiz__in = Quizzes.objects.filter(owner = self.request.user))
    
    def delete(self, request, *args, **kwargs):
        object = Quizzes.objects.get(id = request.data['quiz'])
        object.max_score = object.max_score - request.data["points"]
        object.no_of_questions -=1
        object.save()
        return super().delete(self, request, *args, **kwargs)

    
class ScoreAPIView(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = UserScoreSerializer

    def get(self,request):
        queryset = UserScores.objects.filter(user = request.user)
        serializer_obj = self.serializer_class(queryset,many = True)
        return Response(serializer_obj.data)
    
    def post(self,request):
        points = 0
        correct_ans = 0
        try:
            ques = Questions.objects.filter(quiz = request.data['quizId'])
            quiz = Quizzes.objects.get(id = request.data['quizId'])
            for answer in request.data['answers']:
                Q = ques.get(id = answer["quesId"])
                if Q.ans == answer['option']:
                    points+=Q.points
                    correct_ans+=1
            data = {
                "user":request.user.id,
                "quiz":request.data['quizId'],
                "score":points,
                "total":quiz.max_score
                }
            serialzer_obj = self.serializer_class(data=data)
            serialzer_obj.is_valid(raise_exception=True)
            serialzer_obj.save()
            quiz.attended +=1
            quiz.save()
            
        except:
            return Response("something went wrong",status=status.HTTP_400_BAD_REQUEST)
        return Response({"correct":correct_ans,'points':points},status=status.HTTP_200_OK)