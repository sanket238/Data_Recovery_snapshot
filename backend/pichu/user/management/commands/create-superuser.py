# -*- coding: utf-8 -*-
from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError


class Command(createsuperuser.Command):
    help = "Create a superuser with a password non-interactively"

    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)
        parser.add_argument(
            "--password", dest="password", default=None, help="Specifies the password for the superuser."
        )

    def handle(self, *args, **options):
        options.setdefault("interactive", False)
        database = options.get("database")
        password = options.get("password")
        username = options.get("username")
        email = options.get("email")

        if not password or not username or not email:
            raise CommandError("--email --username and --password are required options")

        user_data = {"username": username, "password": password, "email": email}

        if self.username_field.unique:
            try:
                self.UserModel._default_manager.db_manager(database).get_by_natural_key(username)
            except self.UserModel.DoesNotExist:
                pass
            else:
                raise CommandError("That %s is already taken." % self.username_field.verbose_name)

        email_field = self.UserModel._meta.get_field(self.UserModel.EMAIL_FIELD)
        if email_field.unique:
            try:
                self.UserModel.objects.get(**{self.UserModel.EMAIL_FIELD: email})
            except self.UserModel.DoesNotExist:
                pass
            else:
                raise CommandError("That %s is already taken." % email_field.verbose_name)

        self.UserModel._default_manager.db_manager(database).create_superuser(**user_data)

        if options.get("verbosity", 0) >= 1:
            self.stdout.write("Superuser created successfully.")
