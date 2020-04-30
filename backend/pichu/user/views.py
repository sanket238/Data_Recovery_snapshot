# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import user_logged_in, user_logged_out
from rest_framework.authtoken.models import Token

from pichu.user.permissions import IsActive
from pichu.user.serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView


# Create your views here.


class LoginView(APIView):
    permission_classes = (IsAuthenticated, IsActive)

    @staticmethod
    def post(request):
        user = request.user
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        token, created = Token.objects.get_or_create(user=user)
        response = {"token": "Token " + token.key, **UserSerializer(user).data}
        return Response(response)


class LogoutView(APIView):

    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        user = request.user
        user_logged_out.send(sender=user.__class__, request=request, user=user)
        Token.objects.filter(user=request.user).delete()
        return Response()


class RegisterView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
