# -*- coding: utf-8 -*-
import pytest
from django.utils.translation import ugettext_lazy as _
from django.db.models import BigAutoField, CharField, BooleanField, DateTimeField, ImageField, TextField
from django.test import TestCase
from django.contrib.auth.models import UserManager

from pichu.user.models import User
from pichu.utils.test_helpers import AuditFieldTestMixin

# Create your tests here.


@pytest.mark.django_db
class UserModelTest(TestCase, AuditFieldTestMixin):

    model = User

    def test_has_datetime_created_at_field(self):
        field_name = "created_at"
        self.assertTrue(hasattr(User, field_name))
        created_at_field = User._meta.get_field(field_name)
        self.assertIsInstance(created_at_field, DateTimeField)

    def test_has_datetime_updated_at_field(self):
        field_name = "updated_at"
        self.assertTrue(hasattr(User, field_name))
        updated_at_field = User._meta.get_field(field_name)
        self.assertIsInstance(updated_at_field, DateTimeField)

    def test_has_big_auto_id_field(self):
        field_name = "id"
        self.assertTrue(hasattr(User, field_name))
        id_field = User._meta.get_field(field_name)
        self.assertIsInstance(id_field, BigAutoField)

    def test_id_is_primary_key(self):
        id_field = User._meta.get_field("id")
        self.assertTrue(id_field.primary_key)

    def test_has_char_username_field(self):
        field_name = "username"
        self.assertTrue(hasattr(User, field_name))
        username_field = User._meta.get_field(field_name)
        self.assertIsInstance(username_field, CharField)

    def test_username_max_length_64(self):
        field_name = "username"
        self.assertTrue(hasattr(User, field_name))
        username_field = User._meta.get_field(field_name)
        self.assertEqual(username_field.max_length, 64)

    def test_username_is_unique(self):
        field_name = "username"
        self.assertTrue(hasattr(User, field_name))
        username_field = User._meta.get_field(field_name)
        self.assertTrue(username_field.unique)

    def test_username_is_not_null(self):
        field_name = "username"
        self.assertTrue(hasattr(User, field_name))
        username_field = User._meta.get_field(field_name)
        self.assertFalse(username_field.null)

    def test_has_char_email_field(self):
        field_name = "email"
        self.assertTrue(hasattr(User, field_name))
        email_field = User._meta.get_field(field_name)
        self.assertIsInstance(email_field, CharField)

    def test_email_is_unique(self):
        field_name = "email"
        self.assertTrue(hasattr(User, field_name))
        email_field = User._meta.get_field(field_name)
        self.assertTrue(email_field.unique)

    def test_email_is_not_null(self):
        field_name = "email"
        self.assertTrue(hasattr(User, field_name))
        email_field = User._meta.get_field(field_name)
        self.assertFalse(email_field.null)

    def test_has_char_password_field(self):
        field_name = "password"
        self.assertTrue(hasattr(User, field_name))
        password_field = User._meta.get_field(field_name)
        self.assertIsInstance(password_field, CharField)

    def test_has_bool_is_active_field(self):
        field_name = "is_active"
        self.assertTrue(hasattr(User, field_name))
        is_active_field = User._meta.get_field(field_name)
        self.assertIsInstance(is_active_field, BooleanField)

    def test_is_active_is_default_true(self):
        field_name = "is_active"
        self.assertTrue(hasattr(User, field_name))
        is_active_field = User._meta.get_field(field_name)
        self.assertEqual(is_active_field.default, True)

    def test_has_bool_is_staff_field(self):
        field_name = "is_staff"
        self.assertTrue(hasattr(User, field_name))
        is_staff_field = User._meta.get_field(field_name)
        self.assertIsInstance(is_staff_field, BooleanField)

    def test_is_staff_is_default_false(self):
        field_name = "is_staff"
        self.assertTrue(hasattr(User, field_name))
        is_staff_field = User._meta.get_field(field_name)
        self.assertEqual(is_staff_field.default, False)

    def test_has_bool_is_email_verified_field(self):
        field_name = "is_email_verified"
        self.assertTrue(hasattr(User, field_name))
        is_email_verified_field = User._meta.get_field(field_name)
        self.assertIsInstance(is_email_verified_field, BooleanField)

    def test_is_email_verified_is_default_false(self):
        field_name = "is_email_verified"
        self.assertTrue(hasattr(User, field_name))
        is_email_verified_field = User._meta.get_field(field_name)
        self.assertEqual(is_email_verified_field.default, False)

    def test_user_email_field(self):
        self.assertTrue(User.EMAIL_FIELD, "email")

    def test_user_username_field(self):
        self.assertTrue(User.USERNAME_FIELD, "username")

    def test_has_char_name_field(self):
        field_name = "name"
        self.assertTrue(hasattr(User, field_name))
        name_field = User._meta.get_field(field_name)
        self.assertIsInstance(name_field, CharField)

    def test_name_field_blank_true(self):
        field_name = "name"
        self.assertTrue(hasattr(User, field_name))
        name_field = User._meta.get_field(field_name)
        self.assertTrue(name_field.blank)

    def test_name_field_null_true(self):
        field_name = "name"
        self.assertTrue(hasattr(User, field_name))
        name_field = User._meta.get_field(field_name)
        self.assertTrue(name_field.null)

    def test_name_max_length_128(self):
        field_name = "name"
        self.assertTrue(hasattr(User, field_name))
        name_field = User._meta.get_field(field_name)
        self.assertEqual(name_field.max_length, 128)

    def test_has_text_bio_field(self):
        field_bio = "bio"
        self.assertTrue(hasattr(User, field_bio))
        bio_field = User._meta.get_field(field_bio)
        self.assertIsInstance(bio_field, TextField)

    def test_bio_field_blank_true(self):
        field_bio = "bio"
        self.assertTrue(hasattr(User, field_bio))
        bio_field = User._meta.get_field(field_bio)
        self.assertTrue(bio_field.blank)

    def test_bio_field_null_true(self):
        field_bio = "bio"
        self.assertTrue(hasattr(User, field_bio))
        bio_field = User._meta.get_field(field_bio)
        self.assertTrue(bio_field.null)

    def test_has_image_avatar_field(self):
        field_avatar = "avatar"
        self.assertTrue(hasattr(User, field_avatar))
        avatar_field = User._meta.get_field(field_avatar)
        self.assertIsInstance(avatar_field, ImageField)

    def test_avatar_field_blank_true(self):
        field_avatar = "avatar"
        self.assertTrue(hasattr(User, field_avatar))
        avatar_field = User._meta.get_field(field_avatar)
        self.assertTrue(avatar_field.blank)

    def test_avatar_field_null_true(self):
        field_avatar = "avatar"
        self.assertTrue(hasattr(User, field_avatar))
        avatar_field = User._meta.get_field(field_avatar)
        self.assertTrue(avatar_field.null)

    def test_string_representation(self):
        username = "test_user"
        user = User(username=username)
        self.assertEqual(str(user), username)

    def test_verbose_name_plural(self):
        self.assertEqual(str(User._meta.verbose_name_plural), _("users"))

    def test_user_manager(self):
        user_manager = User._default_manager
        print(dir(user_manager))
        self.assertIsInstance(user_manager, UserManager)

    def test_user_manager_has_create_superuser(self):
        user_manager = User._default_manager
        self.assertTrue(hasattr(user_manager, "create_superuser"))

    def test_user_manager_has_create_user(self):
        user_manager = User._default_manager
        self.assertTrue(hasattr(user_manager, "create_user"))

    def test_user_manager_has_get_by_natural_key(self):
        user_manager = User._default_manager
        self.assertTrue(hasattr(user_manager, "get_by_natural_key"))
