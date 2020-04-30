# -*- coding: utf-8 -*-
import pytest
from django.test import TestCase

from pichu.user.models import User
from pichu.utils.test_helpers import basic_auth_header
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from pichu.user.permissions import IsActive, IsStaff, IsSuperuser

factory = APIRequestFactory()


class PermissionInstanceView(APIView):
    def get(self, request, **kwargs):
        return Response(data={"data": "data"})


class IsActivePermissionView(PermissionInstanceView):
    permission_classes = (IsActive,)


is_active_permission_view = IsActivePermissionView().as_view()


class IsStaffPermissionView(PermissionInstanceView):
    permission_classes = (IsStaff,)


is_staff_permission_view = IsStaffPermissionView().as_view()


class IsSuperuserPermissionView(PermissionInstanceView):
    permission_classes = (IsSuperuser,)


is_superuser_permission_view = IsSuperuserPermissionView().as_view()


@pytest.mark.django_db
class CustomPermissionsTests(TestCase):
    def setUp(self):
        User.objects.create_user("username", "username@example.com", "password")
        credentials = basic_auth_header("username", "password")
        self.user = User.objects.get(username="username")
        self.request = factory.get("/1", format="json", HTTP_AUTHORIZATION=credentials)

    def test_is_active_permission_denied(self):
        self.user.is_active = False
        self.user.save()
        response = is_active_permission_view(self.request, pk=1)
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_is_active_permission_ok(self):
        response = is_active_permission_view(self.request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_is_staff_permission_forbidden(self):
        response = is_staff_permission_view(self.request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_is_staff_permission_ok(self):
        self.user.is_staff = True
        self.user.save()
        response = is_staff_permission_view(self.request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_is_superuser_permission_forbidden(self):
        response = is_superuser_permission_view(self.request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_is_superuser_permission_ok(self):
        self.user.is_superuser = True
        self.user.save()
        response = is_superuser_permission_view(self.request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
