from django.urls import path
from .views import (AdminLoginView, ProductCreateView, ProductDetailView, ProductListView,RegisterView, LoginView, MeView)

urlpatterns = [

    path("auth/register/",RegisterView.as_view(),name="register"),

    path("auth/login/",LoginView.as_view(),name="login"    ),

    path("auth/me/",MeView.as_view(),name="me"),
    path("auth/admin-login/",AdminLoginView.as_view(),name="admin-login"),
    path("products/", ProductListView.as_view()),
    path("products/create/", ProductCreateView.as_view()),
    path("products/<int:id>/", ProductDetailView.as_view())

]