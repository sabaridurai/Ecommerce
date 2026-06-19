from django.urls import path
from .views import (AdminLoginView,VerifyPaymentView,SidebarCountsView,AdminOrderListView,AdminDashboardHomeView,AdminPaymentListView,AdminUserListView, OrderListView, PaymentMethodDetailView, PaymentMethodListCreateView, ProductCreateView, ProductDetailView, ProductListView,RegisterView, LoginView, MeView, SendOTPView, UploadPaymentProofView, VerifyOTPView)

urlpatterns = [

    path("auth/register/",RegisterView.as_view(),name="register"),

    path("auth/login/",LoginView.as_view(),name="login"    ),

    path("auth/me/",MeView.as_view(),name="me"),
    path("auth/admin-login/",AdminLoginView.as_view(),name="admin-login"),
    path("products/", ProductListView.as_view()),
    path("products/create/", ProductCreateView.as_view()),
    path("products/<int:id>/", ProductDetailView.as_view()),
    path("ordersList/", AdminOrderListView.as_view()),
    path("paymentsList/", AdminPaymentListView.as_view()),
    path("usersList/", AdminUserListView.as_view()),
    path("dashboard/", AdminDashboardHomeView.as_view()),
    path(
    "sidebar-counts/",
    SidebarCountsView.as_view()
),

path(
    "payments/<int:pk>/verify/",
    VerifyPaymentView.as_view(),
    name="verify-payment"
),


# for admin payment detils
    path(
        "payment-methods/",
        PaymentMethodListCreateView.as_view()
    ),

    path(
        "payment-methods/<int:pk>/",
        PaymentMethodDetailView.as_view()
    ),
    path(
    "payments/upload-proof/",
    UploadPaymentProofView.as_view()
),
path("orders/", OrderListView.as_view(), name="order-list"),







path(
    "auth/send-otp/",
    SendOTPView.as_view()
),

path(
    "auth/verify-otp/",
    VerifyOTPView.as_view()
),

]