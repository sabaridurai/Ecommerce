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

class Product(models.Model):
    name = models.CharField(max_length=255)

    brand = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    category = models.CharField(max_length=100)

    sub_category = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    model_number = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/images/")


class ProductVideo(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="videos")
    video = models.FileField(upload_to="products/videos/")



#  for adminpayment methods


class PaymentMethod(models.Model):

    PAYMENT_TYPES = [
        ("UPI", "UPI"),
        ("QR", "QR"),
        ("BANK", "BANK"),
    ]

    title = models.CharField(max_length=100)

    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPES
    )

    qr_image = models.ImageField(
        upload_to="payments/qr/",
        blank=True,
        null=True
    )

    upi_id = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    account_holder = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    bank_name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    account_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    ifsc_code = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    mobile_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    instructions = models.TextField(
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class PaymentHistory(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    payment_method = models.ForeignKey(
        PaymentMethod,
        on_delete=models.SET_NULL,
        null=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    screenshot = models.ImageField(
        upload_to="payments/screenshots/"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.customer.username} - {self.amount}"