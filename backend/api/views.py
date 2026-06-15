from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .serializers import RegisterSerializer

# loginapi


from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

# For product api
from .models import Product, ProductImage, ProductVideo
from .serializers import ProductSerializer


# me api
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer



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
            description=data.get("description"),
            price=data.get("price"),
            category=data.get("category"),
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    

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
                "price": p.price,
                "category": p.category,
                "stock": p.stock,

                # 👇 IMPORTANT (images fix)
                "images": [img.image.url for img in p.images.all()],
                "videos": [v.video.url for v in p.videos.all()],
            })

        return Response(data)
    


 
class ProductDetailView(APIView):

    # UPDATE
    def put(self, request, id):
        product = Product.objects.get(id=id)

        product.name = request.data.get("name")
        product.description = request.data.get("description")
        product.price = request.data.get("price")
        product.category = request.data.get("category")
        product.stock = request.data.get("stock")
        product.save()

        return Response({"message": "updated"})

    # DELETE
    def delete(self, request, id):
        product = Product.objects.get(id=id)
        product.delete()
        return Response({"message": "deleted"})   
