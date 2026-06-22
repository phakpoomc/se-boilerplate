# คู่มือนักศึกษา: สร้างโปรเจกต์ด้วย Student Project Boilerplate

คู่มือนี้อธิบายตั้งแต่การเตรียมเครื่อง Windows การเปิดโปรเจกต์ครั้งแรก การเปลี่ยน
boilerplate ให้เป็นโปรเจกต์ของตนเอง ไปจนถึงการเขียน prompt ให้ AI coding agent
ทำงานได้ตรงจุดโดยไม่ต้องเดามากเกินไป

> คำสั่งในคู่มือนี้ใช้ **PowerShell** และควรรันจากโฟลเดอร์หลักของโปรเจกต์
> ซึ่งเป็นตำแหน่งเดียวกับไฟล์ `package.json`

## 1. Boilerplate นี้มีอะไรให้แล้ว

โปรเจกต์นี้เป็น full-stack TypeScript แบบ modular monolith ประกอบด้วย:

- เว็บ: React, Vite, TanStack Router, TanStack Query, Tailwind CSS และ shadcn/ui
- API: Express และ Zod
- ฐานข้อมูล: Prisma และ SQLite
- ไฟล์แนบ: เก็บในเครื่องพร้อมตรวจชนิดไฟล์จริง
- ตัวอย่าง `showcase-items`: ตัวอย่าง CRUD ครบทั้งหน้าเว็บ API ฐานข้อมูล และไฟล์แนบ
- คำแนะนำสำหรับ AI: อยู่ใน `AGENTS.md` และ `docs/ai`

ตัวอย่าง `showcase-items` มีไว้ให้ศึกษาและแทนที่ ไม่ใช่ส่วนที่ต้องเก็บไว้ในทุกโปรเจกต์

## 2. โปรแกรมที่ต้องติดตั้งบน Windows

ติดตั้งโปรแกรมต่อไปนี้ก่อนเริ่มงาน

### 2.1 โปรแกรมที่จำเป็น

1. **Node.js 22 LTS**

   ดาวน์โหลดจาก [nodejs.org](https://nodejs.org/en/download)

   โปรเจกต์รองรับ Node.js ตั้งแต่เวอร์ชัน 22 แต่ต่ำกว่า 25 แนะนำให้ใช้ Node.js 22 LTS
   เพื่อให้ทุกคนในชั้นเรียนใช้สภาพแวดล้อมใกล้เคียงกัน

2. **Git for Windows**

   ดาวน์โหลดจาก [git-scm.com](https://git-scm.com/download/win)

   ระหว่างติดตั้งสามารถใช้ค่ามาตรฐานได้ และควรเลือกให้ Git ใช้งานได้จาก command line

3. **Visual Studio Code**

   ดาวน์โหลดจาก [code.visualstudio.com](https://code.visualstudio.com/download)

4. **เว็บเบราว์เซอร์สมัยใหม่**

   แนะนำ Microsoft Edge หรือ Google Chrome เพราะมี Developer Tools สำหรับตรวจ Network,
   Console และหน้าจอ responsive

### 2.2 โปรแกรมเสริมที่แนะนำ

- GitHub Desktop สำหรับผู้ที่ยังไม่ถนัดคำสั่ง Git
- ส่วนขยาย VS Code:
  - ESLint
  - Tailwind CSS IntelliSense
  - Prisma
  - GitHub Pull Requests and Issues หากใช้ GitHub
- AI coding agent ที่อาจารย์กำหนด เช่น Codex หรือเครื่องมือที่อ่าน `AGENTS.md` ได้

ไม่ต้องติดตั้ง SQLite แยก และไม่ต้องติดตั้ง Docker สำหรับ boilerplate นี้

## 3. ตรวจสอบว่าติดตั้งสำเร็จ

เปิด PowerShell ใหม่หลังติดตั้งโปรแกรม แล้วรัน:

```powershell
node --version
git --version
corepack --version
```

ผลลัพธ์ `node --version` ควรขึ้นต้นด้วย `v22`.

เปิดใช้งาน Corepack เพื่อให้โปรเจกต์ใช้ pnpm เวอร์ชันที่กำหนดไว้:

```powershell
corepack enable
pnpm --version
```

หาก `corepack enable` แจ้งว่าไม่มีสิทธิ์ ให้เปิด PowerShell แบบ **Run as administrator**
เพียงครั้งเดียวเพื่อรันคำสั่งนี้ แล้วกลับมาใช้ PowerShell ปกติ

## 4. ดาวน์โหลดและเปิดโปรเจกต์

เลือกโฟลเดอร์ทำงานที่ชื่อสั้น อ่านง่าย และไม่อยู่ในโฟลเดอร์ระบบ เช่น:

```text
C:\projects
```

หลีกเลี่ยงการเก็บโปรเจกต์ใน `Program Files` และหาก OneDrive ทำให้ไฟล์ sync หรือ lock
บ่อย ควรใช้โฟลเดอร์นอก OneDrive

### 4.1 Clone ด้วย Git

```powershell
cd C:\projects
git clone <URL-ของ-repository>
cd <ชื่อโฟลเดอร์โปรเจกต์>
code .
```

แทน `<URL-ของ-repository>` และ `<ชื่อโฟลเดอร์โปรเจกต์>` ด้วยค่าจริง

### 4.2 ตั้งค่า Git ครั้งแรก

ทำครั้งเดียวต่อเครื่อง:

```powershell
git config --global user.name "ชื่อ นามสกุล"
git config --global user.email "อีเมลที่ใช้กับ GitHub"
```

## 5. ติดตั้งและเปิดระบบครั้งแรก

จากโฟลเดอร์หลักของโปรเจกต์ รัน:

```powershell
pnpm install
pnpm run setup
pnpm dev
```

เมื่อระบบเริ่มสำเร็จ:

- หน้าเว็บ: <http://localhost:5173>
- API: <http://localhost:4100>
- Health check: <http://localhost:4100/health>

เปิดหน้าเว็บด้วย `Ctrl` + คลิกลิงก์ใน terminal หรือพิมพ์ URL ในเบราว์เซอร์

หยุดระบบด้วย `Ctrl+C`

### ไฟล์ environment ที่ setup สร้างให้

- `apps/api/.env`: port ของ API, URL ของเว็บ, database และขนาดไฟล์สูงสุด
- `apps/web/.env`: URL ที่หน้าเว็บใช้เรียก API

ค่าปกติคือ:

```env
# apps/api/.env
PORT=4100
CLIENT_URL=http://localhost:5173
```

```env
# apps/web/.env
VITE_API_URL=http://localhost:4100
```

หากเปลี่ยน port ต้องแก้ค่าที่เกี่ยวข้องให้ตรงกัน แล้วหยุดและเปิด `pnpm dev` ใหม่

ห้าม commit ไฟล์ `.env` ที่มีข้อมูลลับ ใช้ `.env.example` เพื่อบอกว่าต้องตั้งค่าอะไรแทน

## 6. โครงสร้างโปรเจกต์ที่ควรรู้

```text
apps/
  api/
    src/modules/             API แยกตาม feature
    public/uploads/          ไฟล์ที่ผู้ใช้อัปโหลดในเครื่อง
  web/
    src/features/            หน้า component hook และ service แยกตาม feature
    src/components/ui/       component จาก shadcn/ui
packages/
  db/prisma/                 schema, migration, seed และไฟล์ SQLite
  shared/src/                type และ Zod schema ที่ API กับเว็บใช้ร่วมกัน
docs/
  ai/                        กฎ architecture, security และ workflow สำหรับ AI
```

เส้นทางข้อมูลหลักคือ:

```text
React page
  -> TanStack Query
  -> API service
  -> Express route
  -> controller
  -> service
  -> repository
  -> Prisma / SQLite
```

### 6.1 Repository นี้เป็น monorepo

คำว่า **repository** หรือ **repo** คือโฟลเดอร์โปรเจกต์ที่ Git ติดตาม

โปรเจกต์นี้เป็น **monorepo** หมายถึง repository เดียวมีหลาย package ที่ทำงานร่วมกัน:

| Package | ชื่อ package | หน้าที่ |
|---|---|---|
| `apps/web` | `@starter/web` | หน้าเว็บที่ทำงานใน browser |
| `apps/api` | `@starter/api` | HTTP API ที่ทำงานด้วย Node.js |
| `packages/db` | `@starter/db` | Prisma Client และการจัดการฐานข้อมูล |
| `packages/shared` | `@starter/shared` | type และ validation ที่หลาย package ใช้ร่วมกัน |

ไฟล์ `pnpm-workspace.yaml` บอก pnpm ว่า `apps/*` และ `packages/*` เป็นสมาชิกของ workspace
จึงติดตั้ง dependency และสั่ง build หลาย package จาก root ได้

ตัวอย่างเช่น `apps/api` เขียน dependency แบบนี้:

```json
"@starter/db": "workspace:*"
```

แปลว่าให้ใช้ package `@starter/db` จาก repository นี้ ไม่ต้องดาวน์โหลด package ชื่อนี้จาก npm

### 6.2 npm, pnpm และ `package.json` ต่างกันอย่างไร

- **npm registry** คือแหล่งเก็บ package JavaScript เช่น React, Express และ Zod
- **npm** และ **pnpm** เป็น package manager ที่ดาวน์โหลด package และรัน script
- โปรเจกต์นี้เลือกใช้ **pnpm** จึงควรใช้ `pnpm` ตลอด ไม่สลับกับ `npm install`
- `package.json` บอกชื่อ package, dependency, Node.js ที่รองรับ และคำสั่ง script
- `pnpm-lock.yaml` ล็อก dependency version เพื่อให้ทุกเครื่องติดตั้งของเหมือนกัน ควร commit ไฟล์นี้

หากต้องการทราบว่า repo มีคำสั่งอะไร ให้เปิด `package.json` ที่ root แล้วดูส่วน `scripts`:

```json
"scripts": {
  "setup": "...",
  "dev": "...",
  "build": "...",
  "typecheck": "...",
  "test": "..."
}
```

คำสั่ง:

```powershell
pnpm dev
```

คือการรัน script ชื่อ `dev` จาก `package.json` ไม่ใช่คำสั่งลึกลับที่ Node.js รู้จักเอง

repo นี้มี `package.json` หลายไฟล์:

- `package.json` ที่ root: คำสั่งระดับทั้งระบบ ควรเริ่มค้นหาจากไฟล์นี้
- `apps/web/package.json`: dependency และคำสั่งเฉพาะหน้าเว็บ
- `apps/api/package.json`: dependency และคำสั่งเฉพาะ API
- `packages/db/package.json`: คำสั่ง Prisma
- `packages/shared/package.json`: build shared contract

ตัวอย่างรันคำสั่งเฉพาะ package:

```powershell
pnpm --filter @starter/web typecheck
pnpm --filter @starter/api test
```

`--filter` แปลว่าเลือกรันเฉพาะ package ที่ระบุ เหมาะเมื่อต้องการตรวจงานเร็วระหว่างพัฒนา
ส่วนคำสั่งจาก root เช่น `pnpm typecheck` จะตรวจทั้งระบบตามลำดับที่กำหนดไว้

ไม่ควรแก้ script โดยไม่เข้าใจว่ามันถูกเรียกจาก root หรือ package ใด เพราะ path และ environment
อาจต่างกัน

### 6.3 Vite คืออะไร

**Vite** เป็น development server และ build tool ของหน้าเว็บ

เมื่อรัน `pnpm dev`, Vite:

- เปิดหน้าเว็บที่ `http://localhost:5173`
- แปลง TypeScript/TSX ให้ browser ใช้งานได้
- refresh หน้าเว็บอย่างรวดเร็วเมื่อแก้ code หรือที่เรียกว่า Hot Module Replacement
- รวมและลดขนาดไฟล์เมื่อรัน `pnpm build`

ไฟล์สำคัญ:

- `apps/web/index.html`: HTML เริ่มต้น มี `<div id="root">` ให้ React ใช้
- `apps/web/vite.config.ts`: port, plugin, alias และ development proxy
- `apps/web/src/main.tsx`: จุดเริ่มต้นของ React application
- `apps/web/dist`: production build ที่ถูกสร้างขึ้น ห้ามแก้ด้วยมือ

ใน `vite.config.ts` มี alias:

```ts
"@": path.resolve(__dirname, "src")
```

จึง import แบบนี้ได้:

```ts
import { Button } from "@/components/ui/button";
```

แทน path ยาว เช่น `../../../components/ui/button`

Vite เปิดเผย environment variable ให้ browser เฉพาะชื่อที่ขึ้นต้นด้วย `VITE_`
เพราะค่าที่ frontend อ่านได้จะถูกผู้ใช้มองเห็นได้ด้วย ห้ามใส่ secret ในตัวแปร `VITE_`

หน้าเว็บนี้สร้าง URL ของ API ที่:

```text
apps/web/src/features/showcase/services/api-url.ts
```

โดยอ่าน `VITE_API_URL` จาก `apps/web/.env` แล้วนำไปต่อกับ path เช่น
`/api/showcase-items` ในการพัฒนาปกติ browser จึงเรียก `http://localhost:4100` โดยตรง

`vite.config.ts` ยังมี development proxy สำหรับ `/api`, `/health` และ `/uploads`
เพื่อรองรับการเรียกแบบ same-origin เมื่อไม่ได้กำหนด API base URL แต่ไม่ควรมีหลายวิธีปะปนกัน
ใน feature เดียว ให้ใช้ helper กลางสำหรับสร้าง URL

### 6.4 React เริ่มทำงานจากที่ใด

เมื่อ browser โหลด `apps/web/index.html`, Vite โหลด `apps/web/src/main.tsx`

`main.tsx` นำ React ไปวางใน element ที่มี id `root` และติดตั้ง provider หลัก:

- `ThemeProvider`: จัดการ light/dark theme
- `QueryClientProvider`: ทำให้ component ใช้ TanStack Query ได้
- `RouterProvider`: ทำให้ URL เลือก page ที่ต้องแสดงได้
- `Toaster`: พื้นที่แสดงข้อความ success/error ชั่วคราว

ถ้าหน้าเว็บว่างทั้งระบบ ให้เริ่มตรวจ:

1. terminal ของ Vite
2. browser Console
3. `apps/web/src/main.tsx`
4. `apps/web/src/router.tsx`

ถ้าพังเพียง feature เดียว ให้เริ่มที่ไฟล์ใน `apps/web/src/features/<feature>` แทน

### 6.5 TanStack Router ทำงานอย่างไร

**Router** จับคู่ URL กับ React component ที่ต้องแสดง

router ของ repo อยู่ที่:

```text
apps/web/src/router.tsx
```

ปัจจุบัน URL `/` แสดง `ShowcasePage`:

```ts
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ShowcasePage
});
```

ถ้าต้องการเพิ่มหน้า `/equipment` แนวคิดคือ:

```ts
const equipmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/equipment",
  component: EquipmentPage
});
```

จากนั้นต้องเพิ่ม route เข้า `routeTree` ด้วย มิฉะนั้นสร้างตัวแปรไว้แล้วแต่ URL ยังเข้าไม่ได้

หน้า route ควรทำหน้าที่เลือกและประกอบ page ไม่ควรใส่ business logic จำนวนมากใน router
วาง page จริงใน:

```text
apps/web/src/features/<feature>/pages/
```

ถ้าคลิกลิงก์แล้วขึ้นหน้าว่างหรือ URL เข้าไม่ได้ ให้ตรวจ:

- path สะกดตรงหรือไม่
- route ถูกเพิ่มเข้า `routeTree` หรือยัง
- import page ถูกไฟล์หรือไม่
- Console มี error ตอน render component หรือไม่

### 6.6 TanStack Query ทำหน้าที่อะไร

**TanStack Query** จัดการข้อมูลที่มาจาก server หรือ **server state** เช่น:

- โหลดรายการจาก API
- เก็บ cache เพื่อลด request ที่ไม่จำเป็น
- บอกสถานะ loading, error และ success
- ส่ง create/update/delete request ด้วย mutation
- โหลดข้อมูลใหม่หลังแก้สำเร็จ

ตัวอย่างอยู่ที่:

```text
apps/web/src/features/showcase/hooks/use-showcase-items.ts
```

ส่วนสำคัญ:

- `useQuery`: อ่านข้อมูล
- `useMutation`: เปลี่ยนข้อมูล
- `queryKey`: ชื่อ cache เช่น `["showcase-items"]`
- `invalidateQueries`: บอกให้ข้อมูล cache ชุดนั้นโหลดใหม่

แยกหน้าที่ frontend แบบนี้:

```text
pages/       จัด layout และประกอบหน้าจอ
components/  UI ย่อยที่นำกลับมาใช้ได้
hooks/       เชื่อม React กับ server state หรือ feature logic
services/    เรียก HTTP API ด้วย fetch
```

อย่าเขียน `fetch` ซ้ำในหลาย component ควรรวม API function ไว้ใน `services`
และให้ component ใช้ผ่าน hook เพื่อให้ loading, error และ refresh ทำงานสม่ำเสมอ

### 6.7 Tailwind CSS และ shadcn/ui คืออะไร

**Tailwind CSS** ให้ utility class เช่น:

```tsx
<div className="flex gap-4 rounded-lg p-4">
```

แต่ละ class อธิบาย style ขนาดเล็ก ทำให้ style อยู่ใกล้ component ที่ใช้

style และสีหลักของระบบอยู่ที่:

```text
apps/web/src/styles/globals.css
docs/ai/DESIGN_SYSTEM.md
```

ควรใช้ semantic token เช่น:

```text
bg-background
text-foreground
text-muted-foreground
border-border
```

แทนการใส่สีคงที่ทุกจุด เพราะ token รองรับ theme และทำให้เปลี่ยน design ภายหลังง่ายกว่า

**shadcn/ui** ใน repo นี้ไม่ใช่ package component ที่ซ่อน code ไว้ทั้งหมด แต่เป็น source code
ที่อยู่ใน:

```text
apps/web/src/components/ui
```

จึงสามารถอ่านและปรับ component ได้ แต่ควรใช้ component ที่มีอยู่ก่อนสร้าง button, dialog,
form field หรือ alert ใหม่เอง

เพิ่ม official component จากโฟลเดอร์ `apps/web`:

```powershell
cd apps\web
pnpm dlx shadcn@latest add <ชื่อ-component>
cd ..\..
```

### 6.8 Express API เริ่มทำงานอย่างไร

API มีจุดเริ่มต้นสองไฟล์:

- `apps/api/src/index.ts`: สร้าง app และเปิด port
- `apps/api/src/app.ts`: ตั้งค่า Express middleware และ mount route

`app.ts` เตรียม:

- Helmet: HTTP security headers
- CORS: อนุญาต frontend origin ที่กำหนด
- Compression: บีบอัด response
- JSON parser: อ่าน JSON request body
- Rate limit: จำกัด request
- Static files: ให้เปิดไฟล์จาก `/uploads`
- Error handler: เปลี่ยน error เป็น response รูปแบบเดียวกัน

เมื่อเพิ่ม API module แล้ว ต้อง mount router ใน `app.ts` เช่น:

```ts
app.use("/api/equipment", equipmentRouter);
```

ถ้าสร้างไฟล์ route แล้วลืม mount, request จะตอบ `Cannot GET /api/equipment`
หรือ 404 แม้ code ใน module จะถูกต้อง

`apps/api/src/common` ใช้สำหรับ infrastructure ที่หลาย module ใช้ร่วมกัน เช่น:

- environment config
- validation middleware
- error handler
- response helper

business feature ควรอยู่ใน `apps/api/src/modules/<feature>` ไม่ควรวางทุกอย่างรวมใน `common`

### 6.9 Route, controller, service และ repository ต่างกันอย่างไร

API ใช้ลำดับ:

```text
route -> validation/middleware -> controller -> service -> repository -> database
```

แต่ละชั้นมีหน้าที่:

| ชั้น | หน้าที่ | ไม่ควรทำ |
|---|---|---|
| Route | กำหนด HTTP method/path และ middleware | เขียน business logic ยาว |
| Validation | ตรวจ params, query และ body | เชื่อว่าข้อมูลจาก browser ถูกต้อง |
| Controller | รับ request เรียก service และส่ง response | query database โดยตรง |
| Service | กฎธุรกิจและ workflow หลายขั้น | ผูกกับรายละเอียด HTTP โดยไม่จำเป็น |
| Repository | อ่านและเขียนฐานข้อมูลผ่าน Prisma | ตัดสินใจเรื่อง UI หรือ HTTP response |

ตัวอย่างการตาม request `GET /api/showcase-items`:

1. `apps/api/src/app.ts` ส่ง path `/api/showcase-items` เข้า router
2. `showcase-items.routes.ts` จับ `GET /`
3. `showcase-items.controller.ts` รับ request
4. `showcase-items.service.ts` เรียก workflow ของ feature
5. `showcase-items.repository.ts` query Prisma
6. Express ส่ง JSON response กลับ frontend

วิธีแบ่งชั้นนี้อาจดูมีไฟล์มากกว่าการเขียนทุกอย่างใน route แต่ช่วยให้ test, แก้ bug
และเปลี่ยน requirement ได้ง่ายเมื่อโปรเจกต์โตขึ้น

### 6.10 Zod และ shared contracts ช่วยอะไร

**Zod** ใช้ประกาศรูปแบบข้อมูลและตรวจข้อมูลขณะโปรแกรมทำงาน

ไฟล์ที่ API และ frontend ใช้ร่วมกันอยู่ใน:

```text
packages/shared/src
```

ตัวอย่าง contract สามารถกำหนดว่า title:

- ต้องเป็น string
- ตัดช่องว่างหัวท้าย
- ห้ามว่าง
- ยาวไม่เกินจำนวนที่กำหนด

ข้อดีของ shared contract:

- API และ frontend ใช้กฎเดียวกัน
- TypeScript รู้ shape ของข้อมูล
- ลดกรณี frontend ส่ง field ชื่อหนึ่ง แต่ API รออีกชื่อหนึ่ง

ถ้าจะเปลี่ยน request/response ที่ทั้ง API และเว็บใช้ ให้เริ่มแก้ `packages/shared` ก่อน
จากนั้นแก้ API และ frontend ตาม type error ที่ TypeScript ช่วยชี้

TypeScript type เพียงอย่างเดียวไม่สามารถป้องกัน request จากผู้ใช้ภายนอกได้
API จึงยังต้องตรวจข้อมูลจริงด้วย Zod

### 6.11 Prisma และ SQLite ทำงานอย่างไร

**SQLite** คือฐานข้อมูลที่เก็บในไฟล์ เหมาะกับโปรเจกต์ห้องเรียนและ server เดียว
ไม่ต้องติดตั้ง database server แยก

**Prisma** เป็นเครื่องมือที่ช่วย:

- ประกาศ model ใน schema
- สร้าง migration
- generate Prisma Client
- query database ด้วย TypeScript

ตำแหน่งสำคัญ:

| ตำแหน่ง | หน้าที่ |
|---|---|
| `packages/db/prisma/schema.prisma` | model และ datasource |
| `packages/db/prisma/migrations/` | ประวัติการเปลี่ยนโครงสร้างฐานข้อมูล |
| `packages/db/prisma/seed.ts` | ข้อมูลตัวอย่างเริ่มต้น |
| `packages/db/src/index.ts` | Prisma Client ที่ API ใช้ร่วมกัน |
| `packages/db/prisma/dev.db` | database local; ไม่ commit |

เมื่อแก้ model:

```powershell
pnpm db:migrate -- --name add-equipment
pnpm db:validate
```

ชื่อ migration ควรบอกว่าทำอะไร และไม่ควรแก้ migration เก่าที่ใช้งานไปแล้ว

API module ต้อง import Prisma ผ่าน `@starter/db` และ query ใน repository
ไม่สร้าง `new PrismaClient()` กระจายตาม feature เพราะจะจัดการ connection และ test ยากขึ้น

### 6.12 Environment variables และ `.env`

Environment variable คือค่าที่เปลี่ยนตามเครื่องหรือสภาพแวดล้อมโดยไม่ hard-code ใน source

ไฟล์ local:

| ไฟล์ | ผู้อ่าน | ตัวอย่างค่า |
|---|---|---|
| `apps/api/.env` | Express/Node.js | `PORT`, `DATABASE_URL`, `MAX_UPLOAD_BYTES` |
| `apps/web/.env` | Vite/frontend | `VITE_API_URL` |

ไฟล์ตัวอย่าง:

- `apps/api/.env.example`
- `apps/web/.env.example`

เมื่อเพิ่ม environment variable:

1. เพิ่มใน `.env.example` พร้อมค่าตัวอย่างที่ปลอดภัย
2. เพิ่มใน `.env` local ของตนเอง
3. ฝั่ง API ต้องเพิ่ม validation ที่ `apps/api/src/common/config/env.ts`
4. อัปเดต setup/README หากผู้ใช้จำเป็นต้องตั้งค่า
5. restart `pnpm dev`

กฎสำคัญ:

- `.env` ไม่ควร commit
- `.env.example` ควร commit
- ค่า `VITE_` ไม่ใช่ secret เพราะถูกรวมเข้า JavaScript ที่ browser ดาวน์โหลด
- อย่าอ่าน `process.env` กระจายทั่ว API ให้ผ่าน config module
- ถ้าค่าไม่เปลี่ยนหลังแก้ `.env`, restart server ก่อนหาสาเหตุอื่น

### 6.13 TypeScript และไฟล์ config

ไฟล์ `.ts` คือ TypeScript และ `.tsx` คือ TypeScript ที่เขียน React JSX ได้

TypeScript ช่วยตรวจ:

- ชนิดข้อมูล
- ชื่อ property
- argument และ return value
- import ที่ไม่ตรง
- กรณีค่าอาจเป็น `undefined`

config กลางอยู่ที่ `tsconfig.base.json` และแต่ละ package มี `tsconfig.json` ของตนเอง
repo เปิด strict checking จึงอาจเตือนมากกว่าโปรเจกต์ตัวอย่างง่าย ๆ แต่ช่วยจับ bug ก่อนเปิดระบบ

ใช้:

```powershell
pnpm typecheck
```

เพื่อดู type error โดยไม่ต้องรอให้เจอใน browser

อย่าแก้ด้วย `any` ทันทีเพียงเพื่อให้ error หาย ควรหาว่าข้อมูลจริงมี shape อย่างไร

### 6.14 ไฟล์ config สำคัญและควรหาอะไรที่ไหน

| ต้องการทำอะไร | เริ่มดูที่ |
|---|---|
| ดูคำสั่งทั้งหมด | `package.json` ที่ root |
| ดู dependency ของ frontend | `apps/web/package.json` |
| ดู dependency ของ API | `apps/api/package.json` |
| เปลี่ยน frontend/API port | `apps/web/.env`, `apps/api/.env` |
| เพิ่มตัวแปร API | `apps/api/.env.example`, `apps/api/src/common/config/env.ts` |
| เพิ่มตัวแปร frontend | `apps/web/.env.example` โดยใช้ชื่อ `VITE_...` |
| เพิ่มหน้า URL ใหม่ | `apps/web/src/router.tsx` |
| เปลี่ยนจุดเริ่ม React/provider | `apps/web/src/main.tsx` |
| ตั้งค่า Vite, alias หรือ proxy | `apps/web/vite.config.ts` |
| เปลี่ยน theme/global style | `apps/web/src/styles/globals.css` |
| กำหนดแนวทาง design | `docs/ai/DESIGN_SYSTEM.md` |
| เพิ่ม API route | `apps/api/src/modules/<feature>` และ `apps/api/src/app.ts` |
| เปลี่ยน database model | `packages/db/prisma/schema.prisma` |
| เปลี่ยนข้อมูล seed | `packages/db/prisma/seed.ts` |
| เปลี่ยน type ที่ใช้ทั้ง web/API | `packages/shared/src` |
| ดูไฟล์ upload local | `apps/api/public/uploads` |
| ดูกฎ coding/architecture | `AGENTS.md`, `docs/ai` |
| ดูไฟล์ที่ Git ไม่ติดตาม | `.gitignore` |

### 6.15 ถ้าจะเพิ่ม feature ใหม่ ควรสร้างไฟล์ที่ไหน

ตัวอย่าง feature `equipment`:

```text
packages/shared/src/equipment.ts

apps/api/src/modules/equipment/
  equipment.routes.ts
  equipment.controller.ts
  equipment.service.ts
  equipment.repository.ts

apps/web/src/features/equipment/
  pages/equipment-page.tsx
  components/equipment-card.tsx
  hooks/use-equipment.ts
  services/equipment.api.ts
```

จากนั้น:

- export shared contract จาก `packages/shared/src/index.ts`
- mount API router ใน `apps/api/src/app.ts`
- เพิ่ม page route ใน `apps/web/src/router.tsx`
- เพิ่ม Prisma model/migration หากต้องเก็บข้อมูล
- เพิ่ม test ในส่วนที่เกี่ยวข้อง

ไม่จำเป็นต้องสร้างทุกไฟล์หาก feature เล็กมาก แต่ควรรักษาทิศทางความรับผิดชอบของแต่ละชั้น

### 6.16 วิธีตาม bug ข้ามทั้งระบบ

เมื่อข้อมูลไม่ขึ้น อย่าแก้แบบสุ่ม ให้ตามเส้นทางทีละจุด:

1. **UI** — หน้าแสดง loading/error/empty หรือไม่
2. **Browser Network** — URL, method, status และ response คืออะไร
3. **Frontend service** — เรียก path และส่ง body ถูกหรือไม่
4. **Environment** — `VITE_API_URL` ตรงกับ API port หรือไม่
5. **Express app** — router ถูก mount หรือไม่
6. **Route/validation** — method, path, params และ body ผ่านหรือไม่
7. **Controller/service** — error เกิดใน workflow ขั้นใด
8. **Repository/Prisma** — query และชื่อ field ตรง schema หรือไม่
9. **SQLite** — migration ถูก apply และมีข้อมูลหรือไม่

ตัวอย่างการแปล status code:

- `400`: request ไม่ผ่าน validation
- `404`: path หรือ record ไม่พบ
- `413`: ไฟล์ใหญ่เกินกำหนด
- `415`: ชนิดไฟล์ไม่รองรับ
- `500`: server มี error ที่ไม่ได้จัดการ ควรดู API terminal

ถ้า response เป็น HTML ที่มี `Cannot GET ...` แทน JSON มักหมายถึง path ไม่ถูก mount,
method ไม่ตรง หรือ request ไปผิด server

### 6.17 ไฟล์ใดแก้ได้ และไฟล์ใดไม่ควรแก้

โดยทั่วไปแก้ได้:

- source ใน `apps/*/src`
- source ใน `packages/*/src`
- `schema.prisma`, seed และ migration ใหม่
- `.env.example`, config และ documentation

ไม่ควรแก้ด้วยมือ:

- `node_modules`: dependency ที่ติดตั้งใหม่ได้
- `dist`: output จาก build
- `pnpm-lock.yaml` แบบสุ่ม; ให้ pnpm อัปเดตเมื่อเปลี่ยน dependency
- `dev.db` ด้วย text editor
- migration เก่าที่ถูกใช้งานแล้ว
- source component โดยไม่ตรวจว่ามาจาก shadcn และมีผู้ใช้อื่นหรือไม่

ถ้าไม่แน่ใจว่าไฟล์ถูก generate หรือไม่ ให้ค้นชื่อไฟล์ใน `package.json`, script หรือ README
ก่อนแก้

เมื่อสร้าง feature ใหม่ ให้สร้าง backend module และ frontend feature ที่ชื่อสอดคล้องกัน
ถ้า API และเว็บใช้ข้อมูลรูปแบบเดียวกัน ให้ประกาศ contract ใน `packages/shared` ก่อน

## 7. เปลี่ยน boilerplate ให้เป็นโปรเจกต์ของตนเอง

อย่าเริ่มด้วยการสั่ง AI ว่า “ทำทั้งโปรเจกต์ให้เสร็จ” ควรทำเป็นช่วงเล็ก ๆ ที่ตรวจสอบได้

### ขั้นที่ 1: เขียนขอบเขตโปรเจกต์

ตอบคำถามเหล่านี้ให้ได้ก่อน:

- ผู้ใช้คือใคร
- ปัญหาที่ต้องการแก้คืออะไร
- ผู้ใช้ต้องทำงานหลักอะไรได้บ้าง
- ข้อมูลหลักที่ต้องเก็บมีอะไร
- อะไรอยู่ในขอบเขต และอะไรยังไม่ทำ
- ต้องส่งงานเมื่อใด

ตัวอย่าง:

```text
ระบบยืมอุปกรณ์สำหรับห้องปฏิบัติการ
ผู้ใช้หลักคือนักศึกษาและเจ้าหน้าที่
นักศึกษาดูรายการอุปกรณ์ ส่งคำขอยืม และดูสถานะได้
เจ้าหน้าที่เพิ่มอุปกรณ์และอนุมัติหรือปฏิเสธคำขอได้
ระยะแรกยังไม่ทำระบบชำระเงินและการแจ้งเตือนอีเมล
```

### ขั้นที่ 2: กำหนดหน้าตา

แก้ `docs/ai/DESIGN_SYSTEM.md` ก่อนสร้างหลายหน้า โดยระบุ:

- กลุ่มผู้ใช้และภาษาหลัก
- สีและบรรยากาศ
- ตัวอักษรและความหนาแน่นของข้อมูล
- desktop/mobile ที่ต้องรองรับ
- เว็บไซต์ตัวอย่างที่ชอบหรือไม่ชอบ
- หลัก accessibility ที่ต้องรักษา

### ขั้นที่ 3: วางข้อมูลและ feature

เขียนรายการ entity แบบง่าย เช่น:

```text
Equipment: ชื่อ, หมวดหมู่, จำนวนคงเหลือ, สถานะ, รูปภาพ
BorrowRequest: ผู้ยืม, อุปกรณ์, วันที่ยืม, วันที่คืน, สถานะ
```

จากนั้นทำทีละ feature เช่น:

1. รายการอุปกรณ์
2. เพิ่มและแก้ไขอุปกรณ์
3. ส่งคำขอยืม
4. อนุมัติคำขอ
5. dashboard สรุป

### ขั้นที่ 4: ทำหนึ่ง feature ให้ครบแนวตั้ง

feature หนึ่งควรครบตั้งแต่ contract, database, API, UI ไปจนถึง test
ก่อนเริ่ม feature ถัดไป วิธีนี้ทำให้หาจุดผิดง่ายกว่าและมีของที่ใช้งานได้ตลอดเวลา

### ขั้นที่ 5: แทนที่ showcase อย่างระมัดระวัง

ศึกษา `showcase-items` เป็นตัวอย่างก่อน ไม่จำเป็นต้องลบทันที เมื่อ feature จริงทำงานแล้ว
จึงค่อยลบ route, frontend feature, database model และ seed ที่ไม่ใช้ พร้อมสร้าง migration
ที่ถูกต้อง

## 8. วิธีเขียน prompt ที่ดี

prompt ที่ดีไม่จำเป็นต้องยาว แต่ควรลดสิ่งที่ AI ต้องเดา

โครงสร้างที่ใช้ได้บ่อย:

```text
เป้าหมาย:
บริบท:
ขอบเขตที่ให้แก้:
พฤติกรรมที่ต้องการ:
ข้อจำกัด:
เกณฑ์ว่างานเสร็จ:
การตรวจสอบ:
```

ส่วนสำคัญที่สุดคือ:

1. **เป้าหมายชัด** — ต้องการสร้าง แก้ ตรวจสอบ หรืออธิบายอะไร
2. **บริบทพอใช้** — ผู้ใช้คือใคร ปัญหาเกิดที่ไหน และพฤติกรรมปัจจุบันเป็นอย่างไร
3. **ขอบเขตชัด** — ระบุ feature, route หรือไฟล์ที่เกี่ยวข้องเมื่อทราบ
4. **ผลลัพธ์ตรวจได้** — บอก acceptance criteria ที่เห็นหรือทดสอบได้
5. **ข้อจำกัดสำคัญ** — เช่น ห้ามเพิ่ม dependency, ต้องรองรับมือถือ, ต้องใช้ภาษาไทย
6. **ขอให้ตรวจสอบ** — ให้รัน test, typecheck และ build ที่เกี่ยวข้อง

ไม่ต้องใส่ข้อมูลที่ AI หาได้จาก repository อยู่แล้ว เช่น คัดลอก source code ทั้งไฟล์
ถ้าเพียงระบุ path ก็เพียงพอ และไม่ต้องย้ำคำสั่งเดิมหลายครั้ง

## 9. ตัวอย่าง prompt: จากกำกวมเป็นชัดเจน

### 9.1 สร้าง feature

ไม่ชัด:

```text
ช่วยทำระบบยืมของให้หน่อย
```

ชัดกว่า:

```text
สร้าง feature รายการอุปกรณ์สำหรับระบบยืมห้องปฏิบัติการ

บริบท:
- นักศึกษาใช้หน้านี้เพื่อดูว่าอุปกรณ์ใดพร้อมยืม
- โปรเจกต์ใช้ architecture และกฎใน AGENTS.md กับ docs/ai

พฤติกรรม:
- แสดงชื่อ หมวดหมู่ จำนวนคงเหลือ และสถานะ
- ค้นหาด้วยชื่อและกรองตามหมวดหมู่ได้
- มี loading, empty และ error state
- รองรับหน้าจอมือถือ

ข้อมูล:
- Equipment มี id, name, category, availableQuantity และ status

ขอบเขต:
- เพิ่ม shared contract, Prisma model/migration, Express module และ React feature
- ยังไม่ต้องทำ authentication หรือหน้าสำหรับยืม

เกณฑ์เสร็จ:
- GET /api/equipment คืนข้อมูลตาม shared response shape
- หน้าเว็บอ่านข้อมูลจริงจาก API ไม่ใช้ mock data
- เพิ่ม test ที่จำเป็น และรัน db:validate, typecheck, test และ build
```

### 9.2 แก้ bug

ไม่ชัด:

```text
อัปโหลดไฟล์พัง ช่วยแก้
```

ชัดกว่า:

```text
วิเคราะห์และแก้ bug การอัปโหลดไฟล์ใน showcase

อาการ:
- เลือกไฟล์ชื่อ "ใบสมัครนักศึกษา.pdf"
- upload สำเร็จ แต่ชื่อที่หน้าเว็บแสดงเป็นตัวอักษรเพี้ยน
- เนื้อหาไฟล์ยังเปิดได้ตามปกติ

คาดหวัง:
- ชื่อภาษาไทยแสดงตรงกับชื่อเดิม
- ยังต้องใช้ UUID เป็นชื่อไฟล์ที่เก็บจริง
- ห้ามลดการตรวจ magic bytes, ขนาดไฟล์ หรือ path safety

กรุณาหาสาเหตุ แก้เฉพาะส่วนที่เกี่ยวข้อง เพิ่ม regression test ด้วยชื่อไฟล์ภาษาไทย
แล้วรัน test และ typecheck
```

### 9.3 ออกแบบหน้าเว็บ

ไม่ชัด:

```text
ทำหน้า dashboard ให้สวย
```

ชัดกว่า:

```text
ออกแบบและสร้าง dashboard สำหรับเจ้าหน้าที่ห้องปฏิบัติการ

ผู้ใช้ต้องเห็น:
- จำนวนอุปกรณ์ทั้งหมด
- จำนวนที่กำลังถูกยืม
- คำขอที่รออนุมัติ
- รายการคืนล่าช้า 5 รายการล่าสุด

แนวทางภาพ:
- ใช้ภาษาไทย
- สะอาด อ่านง่าย สีหลักน้ำเงินเข้มกับฟ้า
- ไม่ใช้ gradient และไม่ใช้ animation ที่ไม่จำเป็น
- desktop เป็น 4 summary cards และ mobile เรียงหนึ่งคอลัมน์
- ใช้ shadcn/ui ที่ติดตั้งแล้วและ semantic theme tokens

ขอบเขต:
- เริ่มจากข้อมูล mock ภายใน feature นี้
- ยังไม่ต้องเพิ่ม API หรือแก้ database

เกณฑ์เสร็จ:
- ไม่มี horizontal scroll ที่ความกว้าง 375px
- มี accessible headings และข้อความไม่ใช้สีอย่างเดียวเพื่อสื่อสถานะ
- ตรวจหน้า desktop และ mobile พร้อมรัน typecheck และ build
```

### 9.4 เปลี่ยนฐานข้อมูล

```text
เพิ่ม dueDate และ returnedAt ให้ BorrowRequest

บริบท:
- dueDate ต้องมีทุกคำขอ
- returnedAt เป็น null จนกว่าจะคืนอุปกรณ์

งานที่ต้องทำ:
- แก้ Prisma schema และสร้าง migration ชื่อ add-borrow-return-dates
- อัปเดต shared contract, API validation และ seed data
- ห้ามแก้ migration เก่าที่ถูกใช้ไปแล้ว
- ตรวจว่าการสร้างคำขอที่ไม่มี dueDate ตอบ 400
- เพิ่ม test สำหรับ valid date, missing date และ returnedAt
- รัน db:validate, typecheck, test และ build
```

### 9.5 ขอให้ AI วางแผนก่อนเมื่อขอบเขตยังไม่ชัด

```text
ฉันต้องการทำระบบจองห้องเรียน แต่ยังไม่แน่ใจเรื่อง data model

ข้อมูลที่ทราบ:
- นักศึกษาดูตารางว่างและส่งคำขอจองได้
- เจ้าหน้าที่อนุมัติหรือปฏิเสธได้
- ห้องหนึ่งห้ามมีเวลาจองซ้อนกัน
- ระยะแรกยังไม่มี login จริง ให้ใช้ผู้ใช้ตัวอย่าง

ก่อนแก้ code ช่วย:
1. เสนอ entity และความสัมพันธ์แบบเล็กที่สุดที่รองรับ requirement
2. ระบุคำถามที่มีผลต่อ architecture จริง ๆ ไม่เกิน 5 ข้อ
3. แบ่งงานเป็น feature แนวตั้งที่ทดสอบได้

ยังไม่ต้อง implement จนกว่าจะตกลงแผน
```

## 10. Prompt template แบบสั้นเพื่อประหยัด token

คัดลอก template นี้แล้วลบบรรทัดที่ไม่เกี่ยวข้อง:

```text
งาน: [สร้าง/แก้/ตรวจ] ...

บริบท:
- ...

พฤติกรรมที่ต้องการ:
- ...

ขอบเขต:
- แก้เฉพาะ ...
- ยังไม่ต้อง ...

ข้อจำกัด:
- ใช้กฎใน AGENTS.md และ docs/ai
- ห้ามเพิ่ม dependency ถ้าไม่จำเป็น

เสร็จเมื่อ:
- ...
- รัน test/typecheck/build ที่เกี่ยวข้อง
```

เทคนิคประหยัด token โดยไม่ลดคุณภาพ:

- อ้าง path แทนการวาง code ยาว เช่น `apps/web/src/features/equipment`
- ให้ error message แบบเต็มเพียงครั้งเดียว
- บอกขั้นตอนที่ทำให้เกิดปัญหาและผลที่คาดหวัง
- รวม acceptance criteria ที่เกี่ยวข้องไว้ใน prompt เดียว
- แยก feature ใหญ่เป็นช่วง ไม่สั่งหลายระบบที่ไม่เกี่ยวกันพร้อมกัน
- หากต้องการเพียงวิเคราะห์ ให้เขียนว่า “ยังไม่ต้องแก้ code”
- หากต้องการให้ทำงานจริง ให้เขียนว่า “แก้และตรวจสอบให้เสร็จ”

## 11. วิธีทำงานร่วมกับ AI อย่างปลอดภัย

AI ช่วยเร่งงานได้ แต่ผู้ส่งงานยังต้องเข้าใจและรับผิดชอบ code

ก่อนให้ AI ทำงาน:

- commit งานปัจจุบัน เพื่อย้อนกลับได้ง่าย
- บอก requirement และขอบเขต
- อย่าวาง password, API key, token หรือข้อมูลส่วนบุคคลลงใน prompt

หลัง AI ทำงาน:

1. อ่านสรุปและดูไฟล์ที่เปลี่ยน:

   ```powershell
   git status
   git diff
   ```

2. เปิดหน้าเว็บและทดลอง flow จริง
3. ตรวจข้อมูลในฐานข้อมูลและไฟล์แนบเมื่อเกี่ยวข้อง
4. รันชุดตรวจสอบ:

   ```powershell
   pnpm db:validate
   pnpm typecheck
   pnpm test
   pnpm build
   ```

5. ถาม AI ให้อธิบายส่วนที่ตนเองไม่เข้าใจก่อน commit

อย่าแก้หลาย feature ที่ไม่เกี่ยวข้องใน prompt เดียว เพราะตรวจ diff และหาสาเหตุเมื่อพังได้ยาก

## 12. Git workflow แบบง่าย

ก่อนเริ่ม feature:

```powershell
git pull
git switch -c feature/equipment-list
```

ตรวจการเปลี่ยนแปลง:

```powershell
git status
git diff
```

บันทึกงาน:

```powershell
git add .
git commit -m "feat: add equipment list"
git push -u origin feature/equipment-list
```

ควร commit เมื่อ feature ย่อยทำงานได้ ไม่ควรรอจนจบทั้งโปรเจกต์

ข้อความ commit ที่พบบ่อย:

- `feat:` เพิ่มความสามารถ
- `fix:` แก้ bug
- `docs:` แก้เอกสาร
- `test:` เพิ่มหรือแก้ test
- `refactor:` ปรับโครงสร้างโดยพฤติกรรมเดิม

ก่อน `git add .` ให้ดู `git status` เสมอ เพื่อป้องกันการส่ง `.env`, database,
ไฟล์ upload หรือไฟล์ชั่วคราว แม้ `.gitignore` จะช่วยป้องกันอยู่แล้ว

## 13. คำสั่งที่ใช้บ่อย

```powershell
# เปิดระบบสำหรับพัฒนา
pnpm dev

# เตรียม environment, database และ seed อีกครั้ง
pnpm run setup

# ตรวจ Prisma schema
pnpm db:validate

# สร้าง migration หลังแก้ schema
pnpm db:migrate

# เติมข้อมูลตัวอย่าง
pnpm db:seed

# ตรวจ TypeScript
pnpm typecheck

# รัน test
pnpm test

# ทดสอบ production build
pnpm build
```

## 14. การแก้ปัญหาที่พบบ่อย

### PowerShell ไม่ยอมรัน pnpm

ถ้าเห็นข้อความเกี่ยวกับ execution policy ให้เปิด PowerShell แบบ Run as administrator แล้วรัน:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

อ่านคำเตือนและยืนยันเฉพาะเมื่อเป็นเครื่องของตนเอง จากนั้นปิดและเปิด PowerShell ใหม่

### `pnpm` หรือ `corepack` ไม่พบ

ตรวจ Node.js:

```powershell
node --version
where.exe node
```

หากไม่พบ ให้ติดตั้ง Node.js 22 LTS ใหม่และเปิด terminal ใหม่

### Port ถูกใช้งาน

อาการเช่น:

```text
port 5173 is already in use
Could not start the Starter API because port 4100 is already in use
```

ปิด terminal ที่เปิด server เดิม หรือดู process ที่ใช้ port:

```powershell
Get-NetTCPConnection -LocalPort 4100
Get-Process -Id <PID>
```

หากจำเป็นต้องเปลี่ยน API port ให้แก้ทั้ง:

```env
# apps/api/.env
PORT=4200
```

```env
# apps/web/.env
VITE_API_URL=http://localhost:4200
```

แล้วเปิด `pnpm dev` ใหม่

### หน้าเว็บขึ้น `Cannot GET /api/...`

ตรวจว่า API terminal เริ่มสำเร็จ และเปิด:

```text
http://localhost:4100/health
```

ตรวจ `VITE_API_URL` ใน `apps/web/.env` ว่าตรงกับ `PORT` ใน `apps/api/.env`
แล้ว restart `pnpm dev`

### เปลี่ยน `.env` แล้วค่าไม่เปลี่ยน

หยุด server ด้วย `Ctrl+C` แล้วรัน `pnpm dev` ใหม่ เพราะ environment variables
ถูกอ่านตอนเริ่ม process

### Database error หลังแก้ Prisma schema

อย่าแก้ไฟล์ migration เก่าที่ใช้งานแล้ว ให้สร้าง migration ใหม่:

```powershell
pnpm db:migrate
pnpm db:validate
```

ก่อนลบ database เพื่อเริ่มใหม่ ต้องแน่ใจว่าไม่มีข้อมูลที่ต้องเก็บ

### หน้าเว็บโหลดค้างหรือ Console ไม่มี error

เปิด Developer Tools ด้วย `F12` แล้วตรวจ:

- **Network**: request ไป URL ใด status code เท่าไร และ response เป็น JSON หรือ HTML
- **Console**: มี runtime error หรือ CORS error หรือไม่
- terminal ของ API: มี error จาก server หรือ database หรือไม่

เวลาขอ AI ช่วย ให้ส่ง URL, method, status code, response และขั้นตอนที่ทำให้เกิดปัญหา
แทนการส่งเพียงภาพว่า “มันไม่ทำงาน”

## 15. Security และข้อมูลสำคัญ

- ไฟล์ใน `apps/api/public/uploads` เปิดผ่าน URL สาธารณะ ห้ามใช้เก็บเอกสารลับ
- starter นี้ยังไม่มี authentication/authorization อย่าเก็บข้อมูลส่วนบุคคลจริง
- ตรวจ request ด้วย Zod ทั้ง API และ form ที่เกี่ยวข้อง
- ตรวจชนิดไฟล์จากเนื้อหา ไม่เชื่อ extension หรือ MIME จาก browser อย่างเดียว
- ห้ามประกอบ raw SQL จากข้อความผู้ใช้
- ห้าม commit `.env`, API key, database จริง, uploaded files หรือ backup
- หากจะ deploy ต้องใช้ HTTPS, persistent storage, production environment และ backup

## 16. Backup และการส่งงาน

ข้อมูล local อยู่หลัก ๆ ที่:

- `packages/db/prisma/dev.db`
- `apps/api/public/uploads`

หากต้อง backup ให้หยุด server ก่อนและเก็บสองตำแหน่งนี้พร้อมกันไว้นอกโฟลเดอร์โปรเจกต์
อย่า commit backup เข้า Git

ก่อนส่งงาน:

- clone หรือเปิดโปรเจกต์จากสภาพสะอาดแล้วทำตาม README ได้
- `.env.example` มีตัวแปรที่จำเป็นครบ แต่ไม่มี secret
- migration และ seed ใช้งานได้
- `pnpm run setup` รันซ้ำได้
- `pnpm db:validate`, `pnpm typecheck`, `pnpm test` และ `pnpm build` ผ่าน
- ไม่มีข้อมูลส่วนบุคคลหรือ credential อยู่ใน Git history
- README อธิบายชื่อโปรเจกต์ ผู้ใช้ วิธีติดตั้ง และ feature หลัก
- ผู้ส่งงานสามารถอธิบาย architecture และ code สำคัญของตนเองได้

## 17. Checklist เริ่มต้นแบบสั้น

- [ ] ติดตั้ง Node.js 22 LTS, Git และ VS Code
- [ ] รัน `corepack enable`
- [ ] clone repository
- [ ] รัน `pnpm install`
- [ ] รัน `pnpm run setup`
- [ ] รัน `pnpm dev`
- [ ] เปิดเว็บและทดลอง showcase
- [ ] เขียน project scope
- [ ] ปรับ `docs/ai/DESIGN_SYSTEM.md`
- [ ] แบ่งงานเป็น feature เล็กที่ทดสอบได้
- [ ] commit ก่อนและหลังการเปลี่ยนแปลงสำคัญ
- [ ] ตรวจ diff และรัน test ทุกครั้ง

จุดประสงค์ของ boilerplate ไม่ใช่ทำให้ AI เขียนทุกอย่างแทน แต่ช่วยให้นักศึกษาเริ่มจาก
โครงสร้างที่ดี ทดลองได้เร็ว และใช้เวลาไปกับการเข้าใจปัญหา ออกแบบระบบ และตรวจสอบคุณภาพงาน
