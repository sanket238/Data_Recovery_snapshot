# -*- coding: utf-8 -*-
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from pichu.user.models import User

# Register your models here.


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ("username", "email", "is_staff")
    readonly_fields = ("created_at", "updated_at", "last_login")
    list_filter = ("is_superuser", "is_staff", "is_active")
    search_fields = ("username", "email")
    fieldsets = (
        (_("Important dates"), {"fields": ("last_login", "created_at", "updated_at")}),
        (_("Account Info"), {"fields": ("username", "password", "email")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("username", "email", "password1", "password2")}),)
