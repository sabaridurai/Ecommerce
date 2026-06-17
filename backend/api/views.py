import email
from itertools import product
import json
import random

from django.shortcuts import render



#  mail otp send logic
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

# phone otp send logic
from .utils import send_sms_otp

# Create your views here.
from rest_framework import generics
from .serializers import PaymentMethodSerializer, PaymentMethodSerializer, RegisterSerializer
# for dashboard
from django.db.models import Sum, Count
from datetime import datetime, timedelta



# loginapi
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

# For product api
from .models import OTPVerification, PaymentMethod, PaymentMethod, Product, ProductImage, ProductVideo, User, Order, OrderItem,Payment
from .serializers import ProductSerializer


# me api
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    
class SendOTPView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email")
        phone = request.data.get("phone")

        if not email and not phone:
            return Response(
                {
                    "message":
                    "Email or phone required"
                },
                status=400
            )

        otp = str(
            random.randint(
                100000,
                999999
            )
        )

        # remove old otp
        if email:
            OTPVerification.objects.filter(
                email=email
            ).delete()

        if phone:
            OTPVerification.objects.filter(
                phone=phone
            ).delete()

        OTPVerification.objects.create(
            email=email,
            phone=phone,
            otp=otp
        )

        try:

            # EMAIL OTP
            if email:

                html_content = f"""
                <div style="font-family:Arial;padding:20px;">
                    <h2 style="color:#2563eb;">
                        SecureTech Login OTP
                    </h2>

                    <p>Your OTP is:</p>

                    <h1 style="
                        color:#2563eb;
                        background:#f3f4f6;
                        padding:10px;
                        border-radius:8px;
                        width:fit-content;
                    ">
                        {otp}
                    </h1>

                    <p>
                        Valid for
                        <strong>5 minutes</strong>
                    </p>
                </div>
                """

                email_message = (
                    EmailMultiAlternatives(
                        subject=
                        "SecureTech OTP Verification",

                        body=
                        f"Your OTP is {otp}",

                        from_email=
                        settings.EMAIL_HOST_USER,

                        to=[email]
                    )
                )

                email_message.attach_alternative(
                    html_content,
                    "text/html"
                )

                email_message.send()

            # PHONE OTP
            if phone:

               sms_sent = send_sms_otp(phone,otp)
               if not sms_sent:
                   return Response(
                       {
                           "message":"Failed to send SMS OTP"
                       }, status=500

                 )


            return Response({
                "message":
                "OTP sent successfully"
            })

        except Exception as e:

            print("OTP ERROR:", e)

            return Response(
                {
                    "message":
                    "Failed to send OTP",

                    "error":
                    str(e)
                },
                status=500
            )



class VerifyOTPView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email")
        phone = request.data.get("phone")

        otp = str(
            request.data.get("otp")
        ).strip()

        if email:

            otp_obj = (
                OTPVerification.objects
                .filter(
                    email=email,
                    otp=otp
                )
                .order_by("-created_at")
                .first()
            )

        elif phone:

            otp_obj = (
                OTPVerification.objects
                .filter(
                    phone=phone,
                    otp=otp
                )
                .order_by("-created_at")
                .first()
            )

        else:

            return Response(
                {
                    "message":
                    "Email or phone required"
                },
                status=400
            )

        if not otp_obj:

            return Response(
                {
                    "message":
                    "Invalid OTP"
                },
                status=400
            )

        if otp_obj.is_expired():

            return Response(
                {
                    "message":
                    "OTP expired"
                },
                status=400
            )

        # find existing user

        if email:

            user = User.objects.filter(
                email__iexact=email
            ).first()

        else:

            user = User.objects.filter(
                phone=phone
            ).first()

        # create user automatically

        if not user:

            username = (
                email.split("@")[0]
                if email
                else f"user_{phone}"
            )

            original_username = username

            counter = 1

            while User.objects.filter(
                username=username
            ).exists():

                username = (
                    f"{original_username}_{counter}"
                )

                counter += 1

            user = User.objects.create(
                username=username,
                email=email or "",
                phone=phone,
                role=User.CUSTOMER
            )

            print(
                f"Created User: "
                f"{user.username}"
            )

        # delete used otp

        otp_obj.delete()

        refresh = RefreshToken.for_user(
            user
        )

        return Response({

            "access":
            str(refresh.access_token),

            "refresh":
            str(refresh),

            "username":
            user.username,

            "email":
            user.email,

            "phone":
            user.phone,

            "role":
            user.role
        })





class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if not user:
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "email": user.email,
            "role": user.role
        })
    

class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "role": request.user.role,
            "phone": request.user.phone
        })

class AdminLoginView(APIView):
    permission_classes = [AllowAny]   

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if not user:
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if user.role != "ADMIN":
            return Response(
                {"message": "Admin access required"},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role
        })
    
class ProductCreateView(APIView):

    def post(self, request):

        data = request.data


        product = Product.objects.create(
          name=data.get("name"),
          brand=data.get("brand"),
          category=data.get("category"),
          sub_category=data.get("sub_category"),
          model_number=data.get("model_number"),
          description=data.get("description"),
          price=data.get("price"),
          stock=data.get("stock"),
        )
        # IMAGES
        images = request.FILES.getlist("images")
        for img in images:
            ProductImage.objects.create(product=product, image=img)

        # VIDEOS
        videos = request.FILES.getlist("videos")
        for vid in videos:
            ProductVideo.objects.create(product=product, video=vid)

        return Response({"message": "Product created successfully"})


class ProductListView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    

    def get(self, request):
       
        print("META AUTH:", request.META.get("HTTP_AUTHORIZATION"))
        print("USER:", request.user)
        print("AUTH:", request.auth)
        products = Product.objects.all()

        data = []

        for p in products:
           data.append({
               "id": p.id,
               "name": p.name,
               "brand": p.brand,
               "category": p.category,
               "sub_category": p.sub_category,
               "model_number": p.model_number,
               "price": p.price,
               "stock": p.stock,
               "description": p.description,
               "images": [
                  img.image.url
                   for img in p.images.all()
                ],

               "videos": [
                  v.video.url
                  for v in p.videos.all()
               ],
            })
        return Response(data)
    


 
class ProductDetailView(APIView):

    # UPDATE
    def put(self, request, id):
        product = Product.objects.get(id=id)

        product.name = request.data.get("name")
        product.brand = request.data.get("brand")
        product.category = request.data.get("category")
        product.sub_category = request.data.get("sub_category")
        product.model_number = request.data.get("model_number")
        product.description = request.data.get("description")
        product.price = request.data.get("price")
        product.stock = request.data.get("stock")

        product.save()

        return Response({"message": "updated"})

    # DELETE
    def delete(self, request, id):
        product = Product.objects.get(id=id)
        product.delete()
        return Response({"message": "deleted"})   





class UploadPaymentProofView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        session_id = request.data.get("session_id")
        total_amount = request.data.get("total_amount")
        payment_method_id = request.data.get("payment_method")
        proof = request.FILES.get("proof")

        cart_items_raw = request.data.get("cart_items")

        if not session_id or not proof:
            return Response(
                {"error": "session_id and proof are required"},
                status=400
            )

        payment, created = Payment.objects.update_or_create(
            session_id=session_id,
            defaults={
                "user": request.user,
                "total_amount": total_amount,
                "payment_method_id": payment_method_id,
                "proof": proof,
            }
        )

        order = Order.objects.create(
            user=request.user,
            payment=payment,
            total_amount=total_amount
        )

        # ✅ SAFE parsing
        if cart_items_raw:
            try:
                session_data = json.loads(cart_items_raw)
            except Exception:
                return Response(
                    {"error": "Invalid cart_items JSON"},
                    status=400
                )

            for item in session_data:
                OrderItem.objects.create(
                    order=order,
                    product_id=item["id"],
                    quantity=item["quantity"],
                    price=item["price"]
                )

        return Response({
            "message": "Payment proof uploaded successfully"
        })





class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).order_by("-created_at").prefetch_related(
            "items__product__images",
            "payment"
        )

        data = []

        for order in orders:

            # =========================
            # PAYMENT DATA
            # =========================
            payment = order.payment

            payment_data = {
                "id": payment.id,
                "session_id": payment.session_id,
                "total_amount": float(payment.total_amount),
                "status": payment.status,

                # ✅ PAYMENT PROOF IMAGE
                "proof": request.build_absolute_uri(payment.proof.url)
                if payment.proof else None,

                "created_at": payment.created_at
            }

            # =========================
            # ORDER ITEMS
            # =========================
            items = []

            for item in order.items.all():

                product = item.product

                # PRODUCT IMAGES
                images = [
                    request.build_absolute_uri(img.image.url)
                    for img in product.images.all()
                ]

                items.append({
                    "id": item.id,
                    "quantity": item.quantity,
                    "price": float(item.price),

                    # PRODUCT DETAILS
                    "product": {
                        "id": product.id,
                        "name": product.name,
                        "brand": product.brand,
                        "category": product.category,
                        "sub_category": product.sub_category,
                        "model_number": product.model_number,
                        "description": product.description,
                        "price": float(product.price),
                        "stock": product.stock,
                        "images": images
                    }
                })

            # FINAL ORDER RESPONSE
            
            data.append({
                "id": order.id,
                "total_amount": float(order.total_amount),
                "status": order.status,
                "created_at": order.created_at,

                # PAYMENT
                "payment": payment_data,

                # ITEMS
                "items": items
            })

        return Response(data)



class AdminOrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Forbidden"}, status=403)

        orders = Order.objects.all()\
            .order_by("-created_at")\
            .prefetch_related("items__product__images", "payment", "user")

        data = []

        for order in orders:

            data.append({
                "id": order.id,

                "user": {
                    "id": order.user.id,
                    "username": order.user.username,
                    "email": order.user.email,
                    "phone": order.user.phone,
                },

                "payment": {
                    "id": order.payment.id,
                    "session_id": order.payment.session_id,
                    "status": order.payment.status,
                    "total_amount": float(order.payment.total_amount),
                    "proof": request.build_absolute_uri(order.payment.proof.url)
                    if order.payment.proof else None,
                },

                "items": [
                    {
                        "id": item.id,
                        "quantity": item.quantity,
                        "price": float(item.price),
                        "product": {
                            "id": item.product.id,
                            "name": item.product.name,
                            "images": [
                                request.build_absolute_uri(img.image.url)
                                for img in item.product.images.all()
                            ]
                        }
                    }
                    for item in order.items.all()
                ],

                "total_amount": float(order.total_amount),
                "status": order.status,
                "created_at": order.created_at,
            })

        return Response(data)

class AdminPaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Forbidden"}, status=403)

        payments = Payment.objects.all().order_by("-created_at")

        data = []

        for p in payments:
            data.append({
                "id": p.id,
                "session_id": p.session_id,
                "amount": float(p.total_amount),
                "status": p.status,

                "proof": request.build_absolute_uri(p.proof.url)
                if p.proof else None,

                "user": {
                    "id": p.user.id,
                    "username": p.user.username,
                    "email": p.user.email,
                },

                "created_at": p.created_at,
            })

        return Response(data)

class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Forbidden"}, status=403)

        users = User.objects.all()

        data = []

        for u in users:
            data.append({
                "id": u.id,
                "username": u.username,
                "email": u.email,
                "phone": u.phone,
                "role": u.role,
                "date_joined": u.date_joined,
                "is_active": u.is_active,
            })

        return Response(data)


class AdminDashboardHomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # only admin
        if request.user.role != "ADMIN":
            return Response({"message": "Forbidden"}, status=403)

        # =========================
        # BASIC COUNTS
        # =========================
        total_users = User.objects.count()
        total_orders = Order.objects.count()
        total_payments = Payment.objects.count()

        # =========================
        # REVENUE
        # =========================
        total_revenue = Payment.objects.filter(
            status="VERIFIED"
        ).aggregate(
            total=Sum("total_amount")
        )["total"] or 0

        # =========================
        # RECENT ORDERS
        # =========================
        recent_orders = Order.objects.select_related(
            "user", "payment"
        ).order_by("-created_at")[:5]

        orders_data = []
        for o in recent_orders:
            orders_data.append({
                "id": o.id,
                "user": o.user.username,
                "amount": float(o.total_amount),
                "status": o.status,
                "created_at": o.created_at,
            })

        # =========================
        # RECENT PAYMENTS
        # =========================
        recent_payments = Payment.objects.select_related(
            "user"
        ).order_by("-created_at")[:5]

        payments_data = []
        for p in recent_payments:
            payments_data.append({
                "id": p.id,
                "user": p.user.username,
                "amount": float(p.total_amount),
                "status": p.status,
                "session_id": p.session_id,
                "created_at": p.created_at,
            })

        # =========================
        # ORDER STATUS SUMMARY
        # =========================
        order_status = Order.objects.values("status").annotate(
            count=Count("id")
        )

        # =========================
        # PAYMENT STATUS SUMMARY
        # =========================
        payment_status = Payment.objects.values("status").annotate(
            count=Count("id")
        )

        # =========================
        # RESPONSE
        # =========================
        return Response({
            "summary": {
                "users": total_users,
                "orders": total_orders,
                "payments": total_payments,
                "revenue": float(total_revenue),
            },

            "recent_orders": orders_data,
            "recent_payments": payments_data,

            "order_status": list(order_status),
            "payment_status": list(payment_status),
        })





#  for admin payment detils


class PaymentMethodListCreateView(
    generics.ListCreateAPIView
):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer


class PaymentMethodDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
