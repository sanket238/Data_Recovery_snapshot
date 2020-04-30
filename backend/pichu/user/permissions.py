# -*- coding: utf-8 -*-
"""
Provides a set of pluggable permission policies.
"""

from rest_framework.permissions import BasePermission
from django.utils.translation import ugettext_lazy as _


class IsActive(BasePermission):
    """
    Allows access only to active users.
    """

    message = _("The account is deactivated!")

    def has_permission(self, request, view):
        return request.user and request.user.is_active


class IsStaff(BasePermission):
    """
    Allows access only to staff users.
    """

    message = _("The account does not have staff permissions!")

    def has_permission(self, request, view):
        return request.user and request.user.is_active and request.user.is_staff


class IsSuperuser(BasePermission):
    """
    Allows access only to superusers.
    """

    message = _("The account does not have superuser permissions!")

    def has_permission(self, request, view):
        return request.user and request.user.is_active and request.user.is_superuser
