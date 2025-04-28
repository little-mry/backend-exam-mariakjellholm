# backend-exam-mariakjellholm

Glöm inte att köra npm run build före npm start


delete använder 204- därför får man inet meddelande (ska dock finnas ett i headers under X-message)

TODO: 
*lägg till buid-läge:
När du känner dig redo kan du stegvis lägga till build-steg:

Enkelt tsc --noEmit för att se typfel utan att generera filer.

Script i package.json för build (t.ex. "build": "tsc").

Uppdatera "main" till dist/server.js.