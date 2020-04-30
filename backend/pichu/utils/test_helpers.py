# -*- coding: utf-8 -*-
import base64

from rest_framework import HTTP_HEADER_ENCODING
from django.db.models import DateTimeField
from django.db.models.base import ModelBase
from django.db import connection
from django.test import TransactionTestCase


class AbstractModelMixinTestCase(TransactionTestCase):
    """
    Base class for tests of model mixins/abstract models.
    To use, subclass and specify the mixin class variable.
    A model using the mixin will be made available in self.model
    """

    @classmethod
    def setUpClass(self):
        # Create a dummy model
        if not hasattr(self.mixin.Meta, "app_label"):
            self.mixin.Meta.app_label = self.mixin.__name__

        self.model = ModelBase(
            "__TestModel__" + self.mixin.__name__, (self.mixin,), {"__module__": self.mixin.__module__}
        )
        # Create the schema for our test model
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(self.model)

    @classmethod
    def tearDownClass(self):
        # Delete the schema for the test model
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(self.model)


class AuditFieldTestMixin(object):
    """
    Mixin for tests of model who inherit AuditMixin.
    A model using the mixin will be made available in self.model
    """

    def test_has_datetime_created_at_field(self):
        field_name = "created_at"
        self.assertTrue(hasattr(self.model, field_name))
        created_at_field = self.model._meta.get_field(field_name)
        self.assertIsInstance(created_at_field, DateTimeField)

    def test_created_at_has_auto_now_add(self):
        field_name = "created_at"
        self.assertTrue(hasattr(self.model, field_name))
        created_at_field = self.model._meta.get_field(field_name)
        self.assertTrue(created_at_field.auto_now_add)

    def test_created_at_is_not_editable(self):
        field_name = "created_at"
        self.assertTrue(hasattr(self.model, field_name))
        created_at_field = self.model._meta.get_field(field_name)
        self.assertFalse(created_at_field.editable)

    def test_created_at_has_editable_false(self):
        field_name = "created_at"
        self.assertTrue(hasattr(self.model, field_name))
        created_at_field = self.model._meta.get_field(field_name)
        self.assertFalse(created_at_field.editable)

    def test_has_datetime_updated_at_field(self):
        field_name = "updated_at"
        self.assertTrue(hasattr(self.model, field_name))
        updated_at_field = self.model._meta.get_field(field_name)
        self.assertIsInstance(updated_at_field, DateTimeField)

    def test_updated_at_has_auto_now(self):
        field_name = "updated_at"
        self.assertTrue(hasattr(self.model, field_name))
        updated_at_field = self.model._meta.get_field(field_name)
        self.assertTrue(updated_at_field.auto_now)


def basic_auth_header(username, password):
    credentials = "%s:%s" % (username, password)
    base64_credentials = base64.b64encode(credentials.encode(HTTP_HEADER_ENCODING)).decode(HTTP_HEADER_ENCODING)
    return "Basic %s" % base64_credentials
