# -*- coding: utf-8 -*-
import datetime
from pichu.utils.models import AuditMixin
from pichu.utils.test_helpers import AbstractModelMixinTestCase, AuditFieldTestMixin


class AuditMixinTestCase(AbstractModelMixinTestCase, AuditFieldTestMixin):
    """Test abstract model AuditMixin."""

    mixin = AuditMixin

    def test_object_creation(self):
        self.model.objects.create()
        self.assertNotEqual(self.model.objects.count(), 0)

    def test_has_created_at(self):
        instance = self.model.objects.create()
        self.assertIsInstance(instance.created_at, datetime.datetime)

    def test_has_updated_at(self):
        instance = self.model.objects.create()
        self.assertIsInstance(instance.updated_at, datetime.datetime)
