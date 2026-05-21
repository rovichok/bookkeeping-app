FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Lentis.Api/Lentis.Api/Lentis.Api.csproj", "Lentis.Api/Lentis.Api/"]
RUN dotnet restore "Lentis.Api/Lentis.Api/Lentis.Api.csproj"

COPY . .
WORKDIR "/src/Lentis.Api/Lentis.Api"
RUN dotnet publish "Lentis.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Lentis.Api.dll"]