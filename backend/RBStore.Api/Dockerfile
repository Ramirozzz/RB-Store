FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["RBStore.Api.csproj", "./"]
RUN dotnet restore "RBStore.Api.csproj"

COPY . .
RUN dotnet publish "RBStore.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["sh", "-c", "dotnet RBStore.Api.dll --urls http://0.0.0.0:${PORT:-8080}"]