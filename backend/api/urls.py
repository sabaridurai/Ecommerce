from django.urls import path
from .views import (
    AdminLoginView,
    RegisterView,
    LoginView,
    MeView
)

urlpatterns = [

    path(
        "auth/register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "auth/login/",
        LoginView.as_view(),
        name="login"
    ),

    path(
        "auth/me/",
        MeView.as_view(),
        name="me"
    ),
    path(
    "auth/admin-login/",
    AdminLoginView.as_view(),
    name="admin-login"
),
]