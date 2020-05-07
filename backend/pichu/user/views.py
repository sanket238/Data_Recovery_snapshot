# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import user_logged_in, user_logged_out
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView
from django.conf import settings

from pichu.user.permissions import IsActive
from pichu.user.serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView

from pichu.data_recovery.api import DataRecoveryAPI

data_recovery_api = DataRecoveryAPI(base_url=settings.RECOVERY_FILE_PARSER_SERVER_URL)

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

class DataView(APIView):
    permission_classes = (IsAuthenticated, IsActive)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        data = data_recovery_api.get_recovery_data("")
        status = 200
        if data is None:
            status = 204
        return Response(data=data, status=status)
