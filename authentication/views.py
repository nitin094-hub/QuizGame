from django.shortcuts import render
from rest_framework import generics,status
from .serializers import RegisterSerializer
from rest_framework.response import Response
# Create your views here.

class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self,request):
        user = request.data 
        serializer_obj = self.serializer_class(data=user)
        serializer_obj.is_valid(raise_exception=True)
        serializer_obj.save()

        user_data = serializer_obj.data 
        return Response(user_data,status=status.HTTP_201_CREATED)
