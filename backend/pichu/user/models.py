# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager

from pichu.utils.models import AuditMixin

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin, AuditMixin):

    objects = UserManager()

    id = models.BigAutoField(primary_key=True)
    username = models.CharField(_("username"), max_length=64, unique=True, null=False)
    email = models.EmailField(_("email address"), unique=True, null=False)
    name = models.CharField(_("name"), max_length=128, null=True, blank=True, default="Anonymous")
    bio = models.TextField(_("bio"), null=True, blank=True)
    avatar = models.ImageField(_("avatar"), null=True, blank=True)

    is_staff = models.BooleanField(
        _("staff status"), default=False, help_text=_("Designates whether the user can log into this admin site.")
    )

    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. " "Unselect this instead of deleting accounts."
        ),
    )

    is_email_verified = models.BooleanField(
        _("email verified"), default=False, help_text=_("Designates whether this user has a verified email address.")
    )

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
