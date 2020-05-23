# -*- coding: utf-8 -*-
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        read_only_fields = ("created_at", "updated_at", "last_login", "bio", "is_email_verified", "avatar", "id")
        exclude = ["is_staff", "is_superuser", "is_active", "groups", "user_permissions"]
        extra_kwargs = {"password": {"write_only": True}}


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        read_only_fields = ("created_at", "updated_at", "last_login", "id")
        extra_kwargs = {"password": {"write_only": True}}
        exclude = ["is_staff", "is_superuser", "is_active", "groups", "user_permissions"]

    def save(self, **kwargs):
        super(UserRegistrationSerializer, self).save(**kwargs)
        self.instance.set_password(self.validated_data.get("password"))
        self.instance.save()
        return self.instance
