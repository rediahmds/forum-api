# Forum API

Dicoding Backend Expert Submission

## ✨ Forum API V1 Feature

- CRUD Thread
- Comments

## Langkah langkah

Buat test scenario dan run test di tiap langkahnya yaa...

1. Membuat Custom Error beserta test scenario di `/src/Commons/exceptions/<customerror>`
2. Membuat entities dan repository berturut turut di `/src/Domains/<object_name>/entities/` dan `/src/Domains/<object_name>/<repository_name>`
3. Membuat use case dan/atau security iface* berturut turut di `/src/Applications/use_case/` dan/atau `/src/Applications/security/`
4. Membuat repository di `/src/Infrastructures/repository/`
5. Membuat http server dan functional test berturut turut di `/src/Infrastructures/http/createServer.js` dan `/src/Interfaces/http/api/<endpoint>`
6. Menerjemahkan domain error ke http error di `/src/Commons/exceptions/`
7. Jalankan http server
