from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import PaymentMethod, Product, ProductImage, ProductVideo


User = get_user_model()


class SendOTPSerializer(serializers.Serializer):

    email = serializers.EmailField(
        required=False
    )

    phone = serializers.CharField(
        required=False
    )

    def validate(self, data):

        if (
            not data.get("email")
            and
            not data.get("phone")
        ):
            raise serializers.ValidationError(
                "Email or phone required"
            )

        return data


class VerifyOTPSerializer(serializers.Serializer):

    email = serializers.EmailField(
        required=False
    )

    phone = serializers.CharField(
        required=False
    )

    otp = serializers.CharField()

    def validate(self, data):

        if (
            not data.get("email")
            and
            not data.get("phone")
        ):
            raise serializers.ValidationError(
                "Email or phone required"
            )

        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "phone"
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            phone=validated_data.get("phone"),
            password=validated_data["password"]
        )
        return user



class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]


class ProductVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVideo
        fields = ["id", "video"]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"




# for adminpayment detils

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"