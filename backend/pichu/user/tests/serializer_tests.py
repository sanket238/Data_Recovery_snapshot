# -*- coding: utf-8 -*-
import pytest
from unittest import TestCase

from pichu.user.models import User
from pichu.user.serializers import UserSerializer, UserRegistrationSerializer


@pytest.mark.django_db
class UserSerializerTest(TestCase):
    def setUp(self):
        self.data = {"username": "tony_stark", "email": "tony@stark.ind", "password": "12345678"}
        self.user = User.objects.create_user(**self.data)
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        included_fields = [
            "created_at",
            "updated_at",
            "last_login",
            "username",
            "email",
            "id",
            "is_email_verified",
            "name",
            "avatar",
            "bio",
        ]
        excluded_fields = ["password", "is_staff", "is_superuser", "is_active", "groups", "user_permissions"]
        self.assertCountEqual(data.keys(), included_fields)
        section = list(set(data.keys()).intersection(excluded_fields))
        self.assertCountEqual(section, [])


@pytest.mark.django_db
class UserRegistrationSerializerTest(TestCase):
    def setUp(self):
        self.data = {"username": "tony_stark", "email": "tony@stark.ind", "password": "mysupersecretpas"}
        self.user = User(**self.data)
        self.serializer = UserRegistrationSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        included_fields = [
            "created_at",
            "updated_at",
            "last_login",
            "username",
            "email",
            "id",
            "is_email_verified",
            "name",
            "avatar",
            "bio",
        ]
        excluded_fields = ["is_staff", "is_superuser", "is_active", "groups", "user_permissions", "password"]
        self.assertCountEqual(data.keys(), included_fields)
        section = list(set(data.keys()).intersection(excluded_fields))
        self.assertCountEqual(section, [])

    def test_save(self):
        serializer = UserRegistrationSerializer(data=self.data)
        serializer.is_valid()
        serializer.save()
