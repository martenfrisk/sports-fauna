# Övergripande mål

> Notis: Målen nedan som denoteras med \* är i fall din idé inte ska göras som en webbapplikation utan en inbäddad applikation, vilket är tillåtet. I sådan fall diskutera din idé med din lärare omgående för vilken omfattning som kommer krävas.

## Uppgiften \*\*skall uppfylla följande övergripande mål

### Inlämning ska fungera i följande enheter och kommer testas i dem\*:

- PC desktop (upplösning 1920x1080p och uppåt)
- Laptop (upplösning 1280 x 900 och uppåt)
- Mobil (upplösning 414×746)

### Inlämning ska fungera i de senaste versionerna av följande webbläsare och kommer testas i dem\*:

- Chrome
- Firefox
- Safari
- Edge

### Inlämning ska följa teknisk Teknisk kravspecifikation för u11

- Inlämning ska ha en design kopplad till Personas och Scenarios

- Inlämning ska deployas på webbleverantör som stödjer Node.JS. Heroku som är gratis, alternativt liknande tjänster. Tänk på begränsningar såsom CORS (Cross-Origin Resource Sharing) och HTTPS

- Inlämning ska nyttja en databas, i form av dokumentdatabasen (MongoDB)
- Inlämning ska använda Node.JS med Express för att implementera serverkod
  Uppgiften bör uppfylla följande övergripande mål:
- Inlämning bör ha en användarstudie/användningsanalys med minst 10 svar från olika personer (det är okej att fråga i klassen)
  Se guide på https://webbriktlinjer.se/anvandarcentrering-tjanstedesign/utfor-anvandningsanalys/
- Inlämning bör använda antingen React eller Angular för att implementera frontend, det är inte ett krav att använda Flux, Redux eller liknande för statehantering
- Inlämning bör göras tillgänglig för användning även offline (PWA)
- Inlämning bör ha fullgod dokumentation för API (via t.ex. Postman)
  Generella krav på arbetsprocess
  Uppgiften måste versionshanteras i Git, inlämningar med en commit i vid inlämning kommer inte godkännas.
  För denna uppgift ska du följa GitHub Flow som arbetsmetodik när du arbetar med Git. Uppgiften kommer inte godkännas om denna metodik inte följs.
- Inlämning ska följa kodstandarder:

1. För JavaScript:
   [ ] http://airbnb.io/projects/javascript/
2. För CSS:
   [ ] https://github.com/airbnb/css
3. Följ denna guide för konfiguration: https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6

---

## User Personas

Notis: Nedan ser hittar ni exempel på användarprofiler som kan tänkas nyttja webbplatsen. Det behövs endast tre för denna sektion men om ni lägger till funktionalitet eller ökar scope (och komplexitet) i er inlämning kan ni behöva fler personas.
Nedan följer en mall för era personas

Personas

## User Stories

Notis: Denna sektion är den översta nivån av user stories och de som listas här är väldigt övergripande (kallas ofta för Epics), Poängen med dessa är att webbplatsen måste kunna stödja dessa user stories när den första releasen anses färdig. Kom ihåg, ett vanligt format att skriva dessa stories är: As a , I want so that .

### Exempel på user stories

#### Website Users

> As a Website User, I am busy and have little time to find information about movies. I want to be able to find information about movies quickly and painlessly. Ideally with as few clicks as possible. So that I can spend get the information easily.


> As a Website User, finding the correct movie is vital. I want to see different results of movies in a clear and concise manner so that I can easily know which movies I should watch, or learn more about.

#### Website Registered Users

> As a Registered Website User, I am concerned with keeping track of what movies I want to watch, what movies I’m reviewing, have reviewed or am planning to review. So that I can have the possibility to manage several lists of movies I want to watch, as well as movies I am currently reviewing or have planned to review.

Skapa egna user stories för olika typer av användare för att täcka upp önskad funktionalitet

## Icke-funktionella krav

- The application backend must provide a RESTful API (i.e. should be able to be used with any other frontend)
- The application must work in all modern browsers
- The application must be responsive (work well and be functional good on all screen sizes)

## Funktionella krav

Dessa krav måste uppfyllas

- A user must be able to register an account
- A user must be able to login to their account
- A user must be able to search in the application
- An administrative user must be able to log in to a basic dashboard an create/update/delete users

Dessa krav är frivilliga men meriterar högre betyg

- An administrative user should be able to set permissions based on user roles
- An administrative user should be able to create/read/update/delete user roles
- An administrative user should be able to send out emails from the admin dashboard

## Sitemap

När dina user stories är definierade borde det finnas en grundidé för vilka vyer er applikation kommer behöva innehålla. Ett bra sätt att dokumentera detta är via en så kallad sitemap
En bra sitemap innehåller följande:

- En omfattande lista av alla sidor eller vyer. Detta inkluderar allt från vyer som innehåller detaljinformation till enklare “om oss” sidor. Spendera lite tid på att få fram samtliga vyer och att dessa finns med i din applikation.
- Hierarkin mellan dessa sidor är illustrerad . Om du har en uppfattning om sidorna relaterar sig till varandra kan det vara bra att illustrera hur de förhåller sig hierarkiskt till varandra, i sitemapen. Detta kan underlätta när du ska skapa/designa er navigation

Exempel på verktyg: https://www.writemaps.com/

## Routes

De routes som behöver finnas i applikationen

## Wireframes

Notis: Nedan ska två det listas wireframes av webbplatsen.

En är dina första utkast på hur sidan är tänkt att se ut och fungera, med detta i åtanke kan utvecklingen börja så smått. För mer detalj gör man sedan vyer i valfritt verktyg (Balsamiq) är ett vanligt alternativ.

Det viktiga här är att man täcker upp den grundläggande funktionaliteten som ska finnas i varje vy.
Wireframes: Valfritt Prototypverktyg
Era wireframes från prototypverktyg här
