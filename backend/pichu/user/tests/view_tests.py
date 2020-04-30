# -*- coding: utf-8 -*-
import pytest
from unittest import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import status

from pichu.user.models import User
from pichu.user.views import LoginView, LogoutView, RegisterView
from pichu.utils.test_helpers import basic_auth_header

factory = APIRequestFactory()


@pytest.mark.django_db
class ViewsTests(TestCase):
    def setUp(self):
        User.objects.create_user("username", "username@example.com", "password")
        self.credentials = basic_auth_header("username", "password")
        self.user = User.objects.get(username="username")

    def test_login_view_success(self):
        request = factory.post("/1", format="json", HTTP_AUTHORIZATION=self.credentials)
        login_view = LoginView.as_view()
        response = login_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_view_denied(self):
        request = factory.post("/1", format="json")
        login_view = LoginView.as_view()
        response = login_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_view_success(self):
        request = factory.post("/1", format="json", HTTP_AUTHORIZATION=self.credentials)
        logout_view = LogoutView.as_view()
        response = logout_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_view_denied(self):
        request = factory.post("/1", format="json")
        logout_view = LogoutView.as_view()
        response = logout_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_view_bad_request(self):
        request = factory.post("/1", format="json")
        register_view = RegisterView.as_view()
        response = register_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_view_success(self):
        data = {"username": "tony_stark", "email": "tony@stark.ind", "password": "12345678"}
        request = factory.post("/1", format="json", data=data)
        register_view = RegisterView.as_view()
        response = register_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
