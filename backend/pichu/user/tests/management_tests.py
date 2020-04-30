# -*- coding: utf-8 -*-
from io import StringIO
from django.core.management import call_command, CommandError
from django.test import TestCase

from pichu.user.models import User


class CreateSuperUserCommandTest(TestCase):
    def test_command_without_arguments_raises_commanderror(self):
        out = StringIO()
        with self.assertRaises(CommandError):
            call_command("create-superuser", stdout=out)
            self.assertEqual(out.getvalue(), "--email --username and --password are required options")

    def test_command_without_username_raises_commanderror(self):
        out = StringIO()
        with self.assertRaises(CommandError):
            call_command("create-superuser", password="fairlycomplex", email="tony@stark.ind", stdout=out)
            self.assertEqual(out.getvalue(), "--email --username and --password are required options")

    def test_command_without_email_raises_commanderror(self):
        out = StringIO()
        with self.assertRaises(CommandError):
            call_command("create-superuser", username="Tony Stark", password="fairlycomplex", stdout=out)
            self.assertEqual(out.getvalue(), "--email --username and --password are required options")

    def test_command_without_password_raises_commanderror(self):
        out = StringIO()
        with self.assertRaises(CommandError):
            call_command("create-superuser", email="tony@stark.ind", username="tony_stark", stdout=out)
            self.assertEqual(out.getvalue(), "--email --username and --password are required options")

    def test_command_success(self):
        out = StringIO()
        username = "tonystark"
        password = "fairlycomplex"
        email = "tony@stark.ind"

        call_command("create-superuser", email=email, username=username, password=password, stdout=out)
        self.assertEqual(out.getvalue(), "Superuser created successfully.\n")
        superuser = User.objects.get(username=username)
        self.assertEqual(superuser.username, username)
        self.assertEqual(superuser.email, email)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_active)

    def test_command_with_same_username_raises_commanderror(self):
        out = StringIO()
        username = "tonystark"
        password = "fairlycomplex"
        email = "tony@stark.ind"

        User(username=username, email=email).save()

        with self.assertRaises(CommandError):
            call_command("create-superuser", email=email, username=username, password=password, stdout=out)
            self.assertEqual(out.getvalue(), "That username is already taken.")

    def test_command_with_same_email_raises_commanderror(self):
        out = StringIO()
        username = "tonystark"
        password = "fairlycomplex"
        email = "tony@stark.ind"

        User(username="steve_rogers", email=email).save()

        with self.assertRaises(CommandError):
            call_command("create-superuser", email=email, username=username, password=password, stdout=out)
            self.assertEqual(out.getvalue(), "That email is already taken.")
