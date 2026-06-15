from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    CUSTOMER = "CUSTOMER"
    ADMIN = "ADMIN"

    ROLE_CHOICES = [
        (CUSTOMER, "Customer"),
        (ADMIN, "Admin"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=CUSTOMER
    )

    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)