# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.


class AuditMixin(models.Model):

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
