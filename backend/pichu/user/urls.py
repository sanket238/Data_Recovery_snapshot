# -*- coding: utf-8 -*-
from django.conf.urls import url

from pichu.user import views

urlpatterns = [
    url(r"^login/$", views.LoginView.as_view(), name="api_user_login"),
    url(r"^logout/$", views.LogoutView.as_view(), name="api_user_logout"),
    url(r"^register/$", views.RegisterView.as_view(), name="api_user_register"),
    url(r"^data/$", views.DataView.as_view(), name="api_user_data"),
    url(r"^profile/$", views.ProfileView.as_view(), name="api_user_profile"),
]
