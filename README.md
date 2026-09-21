<div align="center">

# 📚 Beginning MERN Stack

### A class companion README for *Beginning MERN Stack* by Greg Lim

*A chapter-by-chapter specification of the Movie Reviews app — from MongoDB Atlas provisioning through Express routes, React components, reviews CRUD, pagination, and cloud deployment on Heroku + Netlify.*

<br />

![Book](https://img.shields.io/badge/book-Beginning_MERN_Stack-6366f1?style=for-the-badge&labelColor=090D16)
![Author](https://img.shields.io/badge/author-Greg_Lim-f59e0b?style=for-the-badge&labelColor=090D16)
![Stack](https://img.shields.io/badge/stack-MERN-22c55e?style=for-the-badge&labelColor=090D16)

![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React_17-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js_14-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

> **Project:** `movie-reviews` · **Primary Actor:** Learner / Reader · **Trigger:** Open the book and start coding
> **Deliverable:** A deployed full-stack Movies review SPA — backend on Heroku, frontend on Netlify

---

## 📖 Contents

1. [Executive Summary](#1--executive-summary)
2. [Actors & Roles](#2--actors--roles)
3. [Preconditions](#3--preconditions)
4. [Main Success Scenario](#4--main-success-scenario)
5. [Postconditions](#5--postconditions)
6. [Exception & Alternative Flows](#6--exception--alternative-flows)
7. [Sequence Diagrams](#7--sequence-diagrams)
8. [State Machine](#8--state-machine)
9. [Business Rules](#9--business-rules)
10. [Data Contract](#10--data-contract)
11. [UI Reference](#11--ui-reference)
12. [Security & Configuration](#12--security--configuration)
13. [Observability & Feedback Surface](#13--observability--feedback-surface)
14. [Test Scenarios](#14--test-scenarios)
15. [Success Metrics](#15--success-metrics)
16. [User Guide](#16--user-guide)
17. [Technical Design](#17--technical-design)
18. [Chapter Index](#18--chapter-index)
19. [Roadmap & Known Risks](#19--roadmap--known-risks)

---

## 1 · Executive Summary

> **Beginning MERN Stack** is a hands-on, bite-sized journey through the four pillars of the MERN stack — MongoDB, Express, React, and Node.js — culminating in a deployed Movies review application.

The learner builds **one coherent app** across 26 chapters: a Movies review SPA where users can browse, search, filter, and review films sourced from MongoDB's `sample_mflix` dataset. Every chapter is a small, self-contained step, and each one compiles onto the previous so that by the end the reader has a **full-stack, cloud-deployed application**.

- **The backend** is Node + Express exposing a `/api/v1/movies` REST API backed by MongoDB Atlas via the native `mongodb` driver.
- **The frontend** is a React SPA built with Create React App, using `react-router-dom@5` for routing and `react-bootstrap` for UI.
- **Reviews** are a separate CRUD flow — post, edit, delete — with ownership enforced by `user_id` on both the controller and the DAO.
- **Pagination** is supported end-to-end: the DAO's `skip` + `limit` pair, the controller's `page` + `entries_per_page`, and the UI's "Get next 20 results" button.
- **Deployment** is covered twice: Heroku for the Node backend, Netlify for the React frontend.

The book targets a **hands-on learner who codes along** — the pace is deliberately fast, and every concept is introduced just in time to be used.

### 🔑 Key Characteristics

| 🧩 One App | 📚 26 Chapters | 🌐 Full Deployment | 🔁 Real CRUD |
|:---:|:---:|:---:|:---:|
| Every chapter builds the same Movie Reviews app | Backend (Ch. 1–12), Frontend (Ch. 13–24), Deploy (Ch. 25–26) | Heroku + Netlify + MongoDB Atlas | Create · Read · Update · Delete reviews |

---

## 2 · Actors & Roles

| Actor | Type | Responsibility |
|---|---|---|
| 👤 **Learner** | Primary | Reads the chapter, types the code, runs the app, tests with Insomnia. |
| 🧑‍🏫 **Instructor** | Primary | Walks the class through chapters; demonstrates deployment. |
| 🖥️ **React Frontend** | Supporting | SPA that consumes the API; runs on `localhost:3000` in dev, Netlify in prod. |
| ⚙️ **Express Backend** | Supporting | Exposes `/api/v1/movies`; runs on `localhost:5000` in dev, Heroku in prod. |
| 🗄️ **MongoDB Atlas** | External | Hosts `sample_mflix` + auto-created `reviews` collections. |
| 🧪 **Insomnia** | Tooling | Manual API testing (Chapter 9 onwards). |
| 🚀 **Heroku CLI** | Tooling | Deployment target for the backend (Chapter 25). |
| 🌐 **Netlify** | Tooling | Static hosting for the built React app (Chapter 26). |

---

## 3 · Preconditions

| ✓ | Invariant | Verification |
|:---:|---|---|
| ✅ | **Node.js 14.x installed** | `node -v` shows a version; book uses LTS at time of writing. |
| ✅ | **VS Code** (or preferred editor) available | Referenced in Chapter 5. |
| ✅ | **MongoDB Atlas account created** | Chapter 3 walks through sign-up + free M0 cluster. |
| ✅ | **M0 cluster provisioned** | Chapter 3 — takes 7–10 minutes on AWS. |
| ✅ | **Database user created** | Chapter 3 — "Read and write to any database". |
| ✅ | **IP whitelist set to `0.0.0.0/0`** | Chapter 3 — allow access from anywhere. |
| ✅ | **Sample dataset loaded** | Chapter 4 — loads `sample_mflix` (and others). |
| ✅ | **`sample_mflix` text index on `title`** | Chapter 9 — required for `$text` search. |
| ✅ | **Internet access** | For Atlas, Heroku, Netlify, and CDN assets. |

---

## 4 · Main Success Scenario

| # | Actor | Action |
|:---:|---|---|
| **1** | Learner | Signs up for MongoDB Atlas and provisions an M0 cluster (Ch. 3). |
| **2** | Learner | Loads the sample dataset — `sample_mflix.movies` is now populated (Ch. 4). |
| **3** | Learner | Initializes `movie-reviews/backend` with `npm init` and installs `express`, `cors`, `mongodb`, `dotenv` (Ch. 5). |
| **4** | Learner | Creates `.env` with `MOVIEREVIEWS_DB_URI`, `MOVIEREVIEWS_NS`, and `PORT` (Ch. 6). |
| **5** | Learner | Writes `server.js`, `index.js`, and the first route in `movies.route.js` (Ch. 6). |
| **6** | Learner | Verifies `localhost:5000/api/v1/movies` returns "hello world" (Ch. 6). |
| **7** | Learner | Implements `MoviesDAO` with `injectDB` and `getMovies` (Ch. 7). |
| **8** | Learner | Implements `MoviesController.apiGetMovies` (Ch. 8). |
| **9** | Learner | Tests `/api/v1/movies`, `/api/v1/movies?rated=G`, and `/api/v1/movies?title=Seven` in the browser + Insomnia (Ch. 9). |
| **10** | Learner | Adds review routes + `ReviewsController` + `ReviewsDAO` (Ch. 10). |
| **11** | Learner | Tests POST/PUT/DELETE on `/api/v1/movies/review` via Insomnia (Ch. 11). |
| **12** | Learner | Adds `getMovieById` (with `$lookup` for reviews) and `getRatings` (Ch. 12). |
| **13** | Learner | Boots the React app with `npx create-react-app frontend` (Ch. 13). |
| **14** | Learner | Installs `react-bootstrap`, `bootstrap`, `react-router-dom@5.2.0`, `axios`, `moment` (Ch. 13, 16, 19). |
| **15** | Learner | Builds the navbar, routes, login stub, and a working `MoviesList` (Ch. 14–17). |
| **16** | Learner | Implements `Movie` component with review listing + `$lookup`-powered data (Ch. 18–19). |
| **17** | Learner | Wires up `AddReview` for both create and edit (Ch. 21). |
| **18** | Learner | Wires up delete with ownership check (Ch. 22). |
| **19** | Learner | Adds "Get next 20 results" pagination to `getAll` and `find` modes (Ch. 23–24). |
| **20** | Learner | Deploys backend to Heroku with `Procfile`, `engines.node`, and `git push heroku master` (Ch. 25). |
| **21** | Learner | Replaces `localhost:5000` with the Heroku URL in `services/movies.js` (Ch. 25). |
| **22** | Learner | Builds the frontend with `npm run build` and drags `build/` into Netlify (Ch. 26). |

> **🎬 Outcome:** A live, cloud-deployed MERN application. The learner has touched every layer of the stack, understands how data flows from Atlas → Express → React, and has a working reference implementation for their own projects.

---

## 5 · Postconditions

| | State Change | Detail |
|:---:|---|---|
| 🗄️ | **`reviews` collection exists** | Auto-created by MongoDB on the first `insertOne` (Ch. 10). |
| 🌐 | **`/api/v1/movies` returns JSON** | With `movies`, `page`, `filters`, `entries_per_page`, `total_results`. |
| 🔎 | **Search works for title + rated** | Requires the text index created in Ch. 9. |
| ✍️ | **Authenticated-ish reviews** | `user_id` recorded on create, enforced on update/delete. |
| 📄 | **Pagination functional** | `skip` + `limit` in DAO; `currentPage` in React state. |
| 🚀 | **Backend live on Heroku** | Public URL serves the API over HTTPS. |
| 🌍 | **Frontend live on Netlify** | Static React build served from a generated subdomain. |
| 🔗 | **Frontend calls the Heroku URL** | `MovieDataService` uses `https://<heroku-app>.herokuapp.com/...`. |

---

## 6 · Exception & Alternative Flows

| Code | Condition | System Response |
|:---:|---|---|
| `A1` | Wrong password in `MOVIEREVIEWS_DB_URI` | `client.connect()` rejects; `console.error(e)`; process exits. |
| `A2` | Forgot to whitelist IP in Atlas | Connection times out; error surfaces in the terminal. |
| `A3` | Missing `sample_mflix` dataset | Queries return empty arrays; UI shows no movies. |
| `A4` | Missing text index on `title` | `$text` query throws in MongoDB; controller returns `500`. |
| `A5` | `movie_id` not a valid ObjectId | Mongo throws `Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`. |
| `A6` | User tries to edit someone else's review | `updateOne` filters by `user_id`; `modifiedCount === 0`; controller throws `unable to update review. User may not be original poster`. |
| `A7` | User tries to delete someone else's review | `deleteOne` filters by `user_id`; `deletedCount === 0`; silently succeeds on the wire (no-op). |
| `A8` | `user_id` prop missing (not logged in) | AddReview is only rendered when `props.user` is truthy; the route guard prevents the crash. |
| `A9` | Rating dropdown set to "All Ratings" | `findByRating` calls `retrieveMovies()` instead of `find()`. |
| `A10` | `page` query string absent | Controller defaults `page` to `0`. |
| `A11` | `moviesPerPage` absent | Controller defaults `moviesPerPage` to `20`. |
| `A12` | `reviews` array empty on a fresh movie | UI renders the reviews heading but no `Media` items. |
| `A13` | A movie has no `poster` | `<Card.Img>` renders nothing; the card body still renders. |
| `A14` | Heroku rejects the push | Ensure `Procfile` (capital P) and `engines.node` are set (Ch. 25). |
| `A15` | CORS error in the browser | `app.use(cors())` must be registered **before** any route. |

---

## 7 · Sequence Diagrams

### 7.1 · Backend Bootstrap

```mermaid
sequenceDiagram
    autonumber
    actor L as Learner
    participant N as nodemon server
    participant IDX as index.js
    participant ENV as dotenv
    participant DB as MongoDB Atlas
    participant APP as server.js

    L->>N: nodemon server
    N->>IDX: main()
    IDX->>ENV: dotenv.config()
    ENV-->>IDX: process.env populated
    IDX->>DB: client.connect()
    DB-->>IDX: connection OK
    IDX->>IDX: MoviesDAO.injectDB(client)
    IDX->>IDX: ReviewsDAO.injectDB(client)
    IDX->>APP: app.listen(5000)
    APP-->>L: server is running on port:5000
```


### 7.2 · Get Movies with Filters

```mermaid
sequenceDiagram
    autonumber
    actor L as Learner
    participant B as Browser or Insomnia
    participant R as movies.route.js
    participant C as MoviesController
    participant D as MoviesDAO
    participant DB as MongoDB

    L->>B: GET /api/v1/movies?rated=G&page=1
    B->>R: HTTP request
    R->>C: apiGetMovies(req, res)
    C->>C: parse rated, page, moviesPerPage
    C->>D: getMovies with filters, page, moviesPerPage
    D->>DB: movies.find query limit 20 skip 20
    DB-->>D: cursor
    D->>DB: countDocuments query
    DB-->>D: total
    D-->>C: moviesList and totalNumMovies
    C-->>B: 200 JSON with movies, page, filters, entries_per_page, total_results
```


### 7.3 · Add a Review (with ownership)

```mermaid
sequenceDiagram
    autonumber
    actor L as Learner
    participant FE as AddReview React
    participant MS as MovieDataService
    participant RC as ReviewsController
    participant RD as ReviewsDAO
    participant DB as MongoDB

    L->>FE: fill review text and click Submit
    FE->>FE: build data with review, name, user_id, movie_id
    FE->>MS: createReview(data)
    MS->>RC: POST /api/v1/movies/review
    RC->>RC: read req.body fields
    RC->>RD: addReview with movieId, userInfo, review, date
    RD->>DB: reviews.insertOne(reviewDoc)
    DB-->>RD: acknowledged and insertedId
    RD-->>RC: insert result
    RC-->>FE: status success
    FE->>FE: setSubmitted(true)
```


### 7.4 · Deploy to Heroku

```mermaid
sequenceDiagram
    autonumber
    actor L as Learner
    participant GIT as git
    participant CLI as heroku CLI
    participant HRK as Heroku
    participant ATL as MongoDB Atlas

    L->>GIT: git init
    L->>GIT: git add .
    L->>GIT: git commit -m Initial commit
    L->>CLI: heroku login
    CLI-->>L: logged in as me@example.com
    L->>CLI: heroku create
    CLI->>HRK: create app and git remote
    HRK-->>L: https app url
    L->>GIT: git push heroku master
    GIT->>HRK: push and build
    HRK->>ATL: connect using MOVIEREVIEWS_DB_URI
    ATL-->>HRK: OK
    HRK-->>L: deployed
```


---

## 8 · State Machine

```mermaid
stateDiagram-v2
    [*] --> Setup

    Setup --> BackendReady: server.js and index.js running
    BackendReady --> MoviesAPI: MoviesDAO injected
    MoviesAPI --> ReviewsAPI: ReviewsDAO injected
    ReviewsAPI --> BackendDone: getMovieById and getRatings live

    BackendDone --> ReactInit: create-react-app
    ReactInit --> Navbar: routes wired
    Navbar --> MoviesList: getAll and getRatings
    MoviesList --> MovieView: click View Reviews
    MovieView --> AddReview: click Add Review
    AddReview --> MovieView: submit and back
    MovieView --> MovieView: edit or delete review
    MovieView --> MoviesList: back to list
    MoviesList --> MoviesList: page N plus 1 via Get next

    MoviesList --> DeployBackend: Procfile and engines.node
    DeployBackend --> DeployFrontend: Heroku URL baked into service
    DeployFrontend --> [*]: live on Heroku and Netlify
```


| **State** | **Description** | **Deliverable** |
| --- | --- | --- |
| ------------------------------- | ---------------------------------------------- | ----------------------- |
| **Setup**                       | Folder structure + Atlas cluster + sample data | `movie-reviews/`        |
| **BackendReady**                | Express listening on `5000`, DB connected      | `server.js`, `index.js` |
| **MoviesAPI**                   | `/api/v1/movies` returns data                  | DAO + Controller        |
| **ReviewsAPI**                  | `/review` handles POST/PUT/DELETE              | ReviewsDAO + Controller |
| **BackendDone**                 | `/id/:id` and `/ratings` added                 | Full backend            |
| **ReactInit**                   | CRA scaffold + Bootstrap + Router              | `frontend/`             |
| **Navbar**                      | Link routing + conditional Login/Logout        | `App.js`                |
| **MoviesList**                  | Search + cards grid                            | `movies-list.js`        |
| **MovieView**                   | Single movie + reviews                         | `movie.js`              |
| **AddReview**                   | Create + edit modes                            | `add-review.js`         |
| **DeployBackend**               | Heroku live URL                                | `Procfile`              |
| **DeployFrontend**              | Netlify static site                            | `build/`                |

---

## 9 · Business Rules

| **Rule** | **Specification** |
| --- | --- |
| --------------------- | ------------------------------------------------------------------------------------------ |
| **BR-01**             | The API base path is `/api/v1/movies`.                                                     |
| **BR-02**             | `moviesPerPage` defaults to **20**; `page` defaults to **0**.                              |
| **BR-03**             | The `title` filter uses MongoDB `$text` search — requires a `text` index on `title`.       |
| **BR-04**             | The `rated` filter uses exact equality against the `rated` field.                          |
| **BR-05**             | `filters` in the response echoes the applied filters (or `{}`).                            |
| **BR-06**             | `page` and `entries_per_page` are echoed so the frontend can paginate.                     |
| **BR-07**             | `total_results` is the total count of documents matching the query (not just the page).    |
| **BR-08**             | Reviews are stored with a `movie_id` cast to `ObjectId`.                                   |
| **BR-09**             | `updateOne` and `deleteOne` **must** filter by `user_id` — reviews are owner-scoped.       |
| **BR-10**             | `apiUpdateReview` throws if `modifiedCount === 0` — the client sees a `500`.               |
| **BR-11**             | `getMovieById` uses an aggregation with `$match` + `$lookup` on `reviews`.                 |
| **BR-12**             | `getRatings` uses `distinct("rated")` on `movies`.                                         |
| **BR-13**             | The frontend prepends `"All Ratings"` to the ratings dropdown array.                       |
| **BR-14**             | `useEffect` in `MoviesList` fires once on mount with an empty dep array.                   |
| **BR-15**             | `useEffect` in `Movie` re-fires when `props.match.params.id` changes.                      |
| **BR-16**             | `currentSearchMode` resets `currentPage` to `0` when it changes.                           |
| **BR-17**             | Search by title uses `"title"`; search by rating uses `"rated"`.                           |
| **BR-18**             | An `AddReview` submission sets `submitted = true` and shows a "Back to Movie" link.        |
| **BR-19**             | Edit mode is entered only when `props.location.state.currentReview` exists.                |
| **BR-20**             | Only the review's owner sees the Edit/Delete buttons (`props.user.id === review.user_id`). |
| **BR-21**             | Deployment requires a `Procfile` with `web: node index.js`.                                |
| **BR-22**             | `package.json` must declare `engines.node` for Heroku.                                     |
| **BR-23**             | The Heroku URL **must** use `https://`, not `http://`.                                     |

> [!NOTE]
> **BR-09 + BR-10 + BR-20** form the ownership chain. The UI hides buttons the user can't use, the controller passes `user_id` to the DAO, and the DAO filters on it. If any layer is skipped, anyone can edit anyone's review.

---

## 10 · Data Contract

### Collections

```mermaid
erDiagram
    MOVIES ||--o{ REVIEWS : receives

    MOVIES {
        ObjectId _id PK
        string title
        string plot
        string fullplot
        string poster
        string rated
        int year
        int runtime
        array genres
        array cast
        array directors
        object awards
        object imdb
        object tomatoes
    }
    REVIEWS {
        ObjectId _id PK
        ObjectId movie_id FK
        string user_id
        string name
        string review
        date date
    }
```


### Movie Document (from `sample_mflix.movies`)

ts

```
{
  _id: ObjectId,
  title: string,
  plot: string,
  fullplot: string,
  poster?: string,
  rated: string,
  year: number,
  runtime: number,
  genres: string[],
  cast: string[],
  directors: string[],
  countries: string[],
  released: Date,
  awards: { wins: number, nominations: number, text: string },
  imdb: { rating: number, votes: number, id: number },
  tomatoes: { viewer: {}, critic: {} },
  type: "movie"
}
```


### Review Document (in `reviews` collection)

ts

```
{
  _id: ObjectId,
  movie_id: ObjectId,
  user_id: string,
  name: string,
  review: string,
  date: Date
}
```


### API Endpoints

| **Method** | **Path** | **Controller** | **Purpose** |
| --- | --- | --- | --- |
| ------------------------------- | ------------------------ | ----------------- | ------------------------------------------------------------------- |
| GET                             | `/api/v1/movies`         | `apiGetMovies`    | List movies with optional `title`, `rated`, `page`, `moviesPerPage` |
| GET                             | `/api/v1/movies/id/:id`  | `apiGetMovieById` | Single movie + its reviews (via `$lookup`)                          |
| GET                             | `/api/v1/movies/ratings` | `apiGetRatings`   | Distinct list of `rated` values                                     |
| POST                            | `/api/v1/movies/review`  | `apiPostReview`   | Create a review                                                     |
| PUT                             | `/api/v1/movies/review`  | `apiUpdateReview` | Update a review (owner only)                                        |
| DELETE                          | `/api/v1/movies/review`  | `apiDeleteReview` | Delete a review (owner only)                                        |

### Response Shape for `GET /api/v1/movies`

ts

```
{
  movies: Movie[],
  page: number,
  filters: { title?: string, rated?: string },
  entries_per_page: number,
  total_results: number
}
```


---

## 11 · UI Reference

### Home / Movies List (Ch. 17)

text

```
+------------------------------------------------------------------------------+
|  Movie Reviews        Movies    Login                                        |
+----------------------------------+-------------------------------------------+
|  [ Search by title          ]    |  [ All Ratings  v ]                       |
|  [ Search ]                      |  [ Search ]                               |
+----------------------------------+-------------------------------------------+
|  +---------+  +---------+  +---------+  +---------+                          |
|  | poster  |  | poster  |  | poster  |  | poster  |                          |
|  +---------+  +---------+  +---------+  +---------+                          |
|  | Air Bud |  | Air Frc |  | Train   |  | Casa    |                          |
|  | PG      |  | APPROVED|  | UNRATED |  | PG      |                          |
|  | View R. |  | View R. |  | View R. |  | View R. |                          |
|  +---------+  +---------+  +---------+  +---------+                          |
+------------------------------------------------------------------------------+
|  Showing page: 0.   Get next 20 results                                      |
+------------------------------------------------------------------------------+
```


### Movie Page with Reviews (Ch. 18–19)

text

```
+------------------------------------------------------------------------------+
|  Movie Reviews        Movies    Logout User                                  |
+----------------------+-------------------------------------------------------+
|                      |  +-----------------------------------------------+    |
|                      |  | The Poor Little Rich Girl                     |    |
|      poster          |  | Gwen's family is rich, but her parents...     |    |
|                      |  | Add Review                                    |    |
|                      |  +-----------------------------------------------+    |
|                      |  Reviews                                              |
|                      |  john reviewed on 19th May 2021                       |
|                      |  great movie                                          |
|                      |  Edit          Delete                                 |
+----------------------+-------------------------------------------------------+
```


**Key UI affordances**

- **Navbar** switches between `Login` and `Logout User` based on `user` state.
- **Search fields** are double-bound — `value={searchTitle}` + `onChange={onChangeSearchTitle}`.
- **Ratings dropdown** is populated dynamically from `getRatings()` and prefixed with `All Ratings`.
- **Movie cards** use `react-bootstrap/Card` and hide gracefully when `poster` is missing.
- **Reviews** use `react-bootstrap/Media` and show Edit/Delete only when `props.user.id === review.user_id`.
- **Dates** are formatted with Moment.js (`Do MMM YYYY`).
- **Pagination** uses a `Button variant="link"` that increments `currentPage`.

---

## 12 · Security & Configuration

| **Concern** | **Current State** | **Recommended Hardening** |
| --- | --- | --- |
| --------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| **Auth**                                      | Fake login — any `{ name, id }` sets `user` | Real auth (Firebase Auth, OAuth, Auth0).                          |
| **Secrets**                                   | `.env` holds `MOVIEREVIEWS_DB_URI`          | Keep `.env` out of git; add to `.gitignore`.                      |
| **Password in URI**                           | Stored in plaintext in `.env` (server-only) | Use a dedicated app user with least-privilege role.               |
| **CORS**                                      | `app.use(cors())` allows all origins        | Restrict to the Netlify domain in prod.                           |
| **Review ownership**                          | Enforced via `user_id` filter in DAO        | Add a server-verified session instead of a client-sent `user_id`. |
| **Input validation**                          | None — the client sends whatever it wants   | Validate `review` length and `user_id` shape on the server.       |
| **Rate limiting**                             | None                                        | Add `express-rate-limit`.                                         |
| **Helmet**                                    | Not installed                               | `npm i helmet` and `app.use(helmet())`.                           |
| **HTTPS**                                     | Enforced by Heroku + Netlify                | None.                                                             |
| **IP Whitelist**                              | `0.0.0.0/0` in Atlas                        | Restrict to Heroku dynos or a NAT gateway IP.                     |

> [!IMPORTANT]
> The "login" implemented in Chapter 20 is **not real authentication**. It exists to demonstrate conditional rendering and prop drilling — the book explicitly says so. Do not treat it as a security boundary.

> [!WARNING]
> `updateOne` and `deleteOne` filter by `user_id` — but `user_id` is **supplied by the client**. A malicious user could pass someone else's `user_id` in the request body. In production, derive `user_id` from a verified session, not `req.body`.

---

## 13 · Observability & Feedback Surface

| **Event** | **Type** | **Surface** |
| --- | --- | --- |
| ------------------------- | ------------ | ----------------------------------------------------------------------- |
| Server started            | Text         | `server is running on port:5000`                                        |
| DB connection failed      | Text (error) | `console.error(e)` + process exits                                      |
| DAO failure               | Text (error) | `unable to connect in MoviesDAO: <error>`                               |
| Review post success       | JSON         | `{ status: "success" }`                                                 |
| Review post failure       | JSON         | `{ error: "<message>" }` with `500`                                     |
| Review update (non-owner) | JSON         | `{ error: "unable to update review. User may not be original poster" }` |
| Review delete (non-owner) | JSON         | `{ status: "success" }` (silent no-op)                                  |
| 404 route                 | JSON         | `{ "error": "not found" }`                                              |
| Movie by bad id           | JSON         | `{ error: "not found" }` with `404`                                     |
| Frontend fetch            | Log          | `console.log(response.data)` in every `.then`                           |
| Frontend fetch error      | Log          | `console.log(e)` in every `.catch`                                      |

---

## 14 · Test Scenarios

<details> <summary><b>TC-01 · Backend boots and connects</b></summary>

- **Given** a valid `.env` and Atlas IP whitelist
- **When** `nodemon server` runs
- **Then** the terminal prints `server is running on port:5000`

</details><details> <summary><b>TC-02 · Root route returns "hello world"</b></summary>

- **Given** the initial `movies.route.js`
- **When** the browser hits `http://localhost:5000/api/v1/movies`
- **Then** the page shows `hello world`

</details><details> <summary><b>TC-03 · Wildcard returns 404 JSON</b></summary>

- **Given** any unknown route
- **When** the browser hits `http://localhost:5000/anything`
- **Then** the response is `{"error":"not found"}` with status `404`

</details><details> <summary><b>TC-04 · Movies list returns 20 results</b></summary>

- **Given** the DAO + Controller are wired
- **When** Insomnia GETs `/api/v1/movies`
- **Then** `entries_per_page` is `20`, `page` is `0`, and `movies` has 20 items

</details><details> <summary><b>TC-05 · Filter by rating</b></summary>

- **Given** movies exist
- **When** `GET /api/v1/movies?rated=G`
- **Then** every returned movie has `rated === "G"` and `total_results` is nonzero

</details><details> <summary><b>TC-06 · Filter by title requires the text index</b></summary>

- **Given** no text index on `title`
- **When** `GET /api/v1/movies?title=Seven`
- **Then** MongoDB throws; the API returns `500`
- **And given** the text index is created in Atlas
- **When** the same request runs
- **Then** results containing `Seven` are returned

</details><details> <summary><b>TC-07 · Pagination</b></summary>

- **Given** more than 20 movies
- **When** `GET /api/v1/movies?page=1`
- **Then** the returned set is **different** from `page=0` and contains 20 items

</details><details> <summary><b>TC-08 · Post a review</b></summary>

- **Given** a valid `movie_id` in ObjectId format
- **When** a POST hits `/api/v1/movies/review` with `{ movie_id, review, user_id, name }`
- **Then** `{ status: "success" }` is returned and the review appears in Atlas

</details><details> <summary><b>TC-09 · Edit a review</b></summary>

- **Given** a review with `user_id = "1234"`
- **When** a PUT is sent with the same `user_id` and a new `review`
- **Then** `{ status: "success" }` is returned and Atlas reflects the change

</details><details> <summary><b>TC-10 · Edit is rejected for the wrong owner</b></summary>

- **Given** a review owned by `"1234"`
- **When** a PUT is sent with `user_id = "9999"`
- **Then** `modifiedCount` is `0` and the API returns `{ error: "unable to update review. User may not be original poster" }`

</details><details> <summary><b>TC-11 · Delete a review</b></summary>

- **Given** a review owned by `"1234"`
- **When** DELETE is sent with `{ review_id, user_id: "1234" }`
- **Then** `{ status: "success" }` is returned and the review is gone from Atlas

</details><details> <summary><b>TC-12 · Get one movie with reviews</b></summary>

- **Given** a movie has at least one review
- **When** `GET /api/v1/movies/id/<movieId>`
- **Then** the response includes a `reviews` array populated by `$lookup`

</details><details> <summary><b>TC-13 · Get distinct ratings</b></summary>

- **Given** the `movies` collection exists
- **When** `GET /api/v1/movies/ratings`
- **Then** the response is an array like `["AO", "APPROVED", "G", ...]`

</details><details> <summary><b>TC-14 · React app renders 20 movie cards</b></summary>

- **Given** the backend is running on `5000`
- **When** the React app loads `/movies`
- **Then** 20 `<Card>` components render with titles, ratings, and "View Reviews" links

</details><details> <summary><b>TC-15 · Login → Edit/Delete become visible</b></summary>

- **Given** a logged-in user whose `id` matches a review's `user_id`
- **When** they visit that movie's page
- **Then** the Edit and Delete controls appear next to their review

</details><details> <summary><b>TC-16 · Logout hides owner controls</b></summary>

- **Given** the user clicks Logout
- **When** they return to the same movie page
- **Then** no Edit/Delete controls render

</details><details> <summary><b>TC-17 · AddReview submits and returns</b></summary>

- **Given** a logged-in user on a movie page
- **When** they add a review and submit
- **Then** the UI shows "Review submitted successfully" with a "Back to Movie" link

</details><details> <summary><b>TC-18 · Edit mode prefills the existing review</b></summary>

- **Given** a click on "Edit" next to a review
- **When** AddReview mounts
- **Then** the header reads "Edit Review" and the field is prefilled with the review body

</details><details> <summary><b>TC-19 · Get next page</b></summary>

- **Given** the user is on page 0
- **When** they click "Get next 20 results"
- **Then** `currentPage` increments and the list refreshes with page 1 data

</details><details> <summary><b>TC-20 · Search resets pagination</b></summary>

- **Given** the user is on page 3
- **When** they type a title and press Search
- **Then** `currentSearchMode` changes, `currentPage` resets to `0`, and results reflect page 0 of the new query

</details><details> <summary><b>TC-21 · Heroku deploy succeeds</b></summary>

- **Given** `Procfile` and `engines.node` are set
- **When** `git push heroku master` runs
- **Then** the terminal shows `Verifying deploy... done` and the app URL works

</details><details> <summary><b>TC-22 · Netlify deploy succeeds</b></summary>

- **Given** the React app builds cleanly
- **When** the `build/` folder is dragged onto Netlify
- **Then** a `*.netlify.app` URL is generated and loads the app

</details>

---

## 15 · Success Metrics

| **Metric** | **Target** | **Why It Matters** |
| --- | --- | --- |
| ------------------------------ | --------------- | ---------------------------------------- |
| ⏱️ **First API response**      | `< 1 s`         | Node + Atlas, warm connection            |
| 🌐 **Movies query round trip** | `< 400 ms` p95  | After Atlas caches the collection        |
| 📄 **Page size honoured**      | `20` always     | `moviesPerPage` default must apply       |
| ✅ **CRUD coverage**            | 4/4 ops working | POST · GET · PUT · DELETE                |
| 🔐 **Ownership enforced**      | 100 %           | Every update/delete filters by `user_id` |
| 🚀 **Live deploy reachable**   | 2/2 URLs        | Heroku backend + Netlify frontend        |
| 📚 **Chapter completion**      | 26/26           | Every chapter produces a working state   |

---

## 16 · User Guide

> **Audience:** Learners going through *Beginning MERN Stack* in class.
> **Goal:** End up with a working, deployed MERN app and a mental model of the entire stack.

### 16.1 · Quick Start

bash

```
# 1. Clone/copy the sample dataset on Atlas (see Ch. 3–4)

# 2. Backend
mkdir movie-reviews && cd movie-reviews
mkdir backend && cd backend
npm init -y
npm install express cors mongodb dotenv
npm install -g nodemon

# 3. Create .env with:
#    MOVIEREVIEWS_DB_URI=mongodb+srv://user:pwd@cluster.mongodb.net/sample_mflix?retryWrites=true&w=majority
#    MOVIEREVIEWS_NS=sample_mflix
#    PORT=5000

# 4. Add "type": "module" and a "start": "node index.js" script to package.json

nodemon server        # should print: server is running on port:5000

# 5. Frontend (new terminal, from movie-reviews/)
npx create-react-app frontend
cd frontend
npm install react-bootstrap bootstrap react-router-dom@5.2.0 axios moment
npm start             # opens localhost:3000
```


### 16.2 · Project Structure

text

```
movie-reviews/
├── backend/
│   ├── api/
│   │   ├── movies.route.js
│   │   ├── movies.controller.js
│   │   ├── reviews.controller.js
│   │   └── dao/
│   │       ├── moviesDAO.js
│   │       └── reviewsDAO.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   ├── Procfile
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── add-review.js
    │   │   ├── login.js
    │   │   ├── movie.js
    │   │   └── movies-list.js
    │   ├── services/
    │   │   └── movies.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── build/
```


### 16.3 · Backend Routes

| **Method** | **URL** | **What it does** |
| --- | --- | --- |
| ------------------------- | ------------------------ | ------------------------------------- |
| GET                       | `/api/v1/movies`         | List movies (paginated, filterable)   |
| GET                       | `/api/v1/movies?title=X` | Filter by title (requires text index) |
| GET                       | `/api/v1/movies?rated=G` | Filter by rating                      |
| GET                       | `/api/v1/movies?page=N`  | Fetch page N                          |
| GET                       | `/api/v1/movies/id/:id`  | Single movie + reviews                |
| GET                       | `/api/v1/movies/ratings` | Distinct rating values                |
| POST                      | `/api/v1/movies/review`  | Create a review                       |
| PUT                       | `/api/v1/movies/review`  | Update a review                       |
| DELETE                    | `/api/v1/movies/review`  | Delete a review                       |

### 16.4 · Insomnia Recipes

**Get all movies**

text

```
GET  http://localhost:5000/api/v1/movies
```


**Get G-rated movies, page 2**

text

```
GET  http://localhost:5000/api/v1/movies?rated=G&page=2
```


**Post a review** (JSON body)

json

```
{
  "movie_id": "573a1390f29313caabcd4135",
  "review": "great movie",
  "user_id": "1234",
  "name": "john"
}
```


**Update a review** (JSON body)

json

```
{
  "review_id": "60987656387806c22051bb67",
  "review": "bad movie",
  "user_id": "1234",
  "name": "john"
}
```


**Delete a review** (JSON body)

json

```
{
  "review_id": "609879ea2c7565c289746500",
  "user_id": "1234"
}
```


### 16.5 · Troubleshooting

| **What you see** | **Likely reason** | **Fix** |
| --- | --- | --- |
| -------------------------------------------------------- | ------------------------------------ | ------------------------------------------------- |
| `server is running on port:5000` never prints            | `client.connect()` threw             | Check `.env` URI and Atlas IP whitelist           |
| Empty `movies: []`                                       | No sample data loaded                | Ch. 4 — Load Sample Dataset                       |
| `$text` query error                                      | No text index on `title`             | Ch. 9 — create index in Atlas                     |
| `Argument passed in must be a single String of 12 bytes` | `movie_id` isn't a valid ObjectId    | Copy a real `_id` from Atlas                      |
| CORS error in the browser                                | Middleware registered after routes   | Move `app.use(cors())` above all routes           |
| `Cannot GET /api/v1/movies/` in the browser              | Missing route                        | Check `movies.route.js` imports the controller    |
| Review isn't editable                                    | `user_id` doesn't match              | Log in with the same id used to create the review |
| Heroku build fails                                       | `Procfile` or `engines.node` missing | Add both (Ch. 25)                                 |
| Netlify site loads but API calls fail                    | Still pointing at `localhost`        | Replace with Heroku URL and rebuild               |

### 16.6 · Glossary

| **Term** | **Meaning** |
| --- | --- |
| ------------------------ | ---------------------------------------------------------------------- |
| **DAO**                  | Data Access Object — encapsulates all MongoDB operations.              |
| **Controller**           | Express handler that parses requests and delegates to the DAO.         |
| **Route file**           | Declares URLs and maps them to controller methods.                     |
| **Middleware**           | Function running between request and response (e.g. `express.json()`). |
| **Cursor**               | Lazy iterator over MongoDB query results.                              |
| **Aggregation pipeline** | Array of stages (`$match`, `$lookup`) executed by MongoDB.             |
| **`$lookup`**            | MongoDB's equivalent of a SQL JOIN.                                    |
| **ObjectId**             | MongoDB's 12-byte unique identifier.                                   |
| **Prop drilling**        | Passing data down through components via `props`.                      |
| **CRA**                  | Create React App — the scaffolding tool.                               |

---

## 17 · Technical Design

> **Purpose:** Bridge the chapters and the code. This section maps the architecture, the flow, and the reasoning behind each layer.

### 17.1 · Goals & Non-Goals

| **Goals** | **Non-Goals** |
| --- | --- |
| ------------------------------------------ | ----------------------------- |
| Teach every layer of MERN with real code   | Full authentication system    |
| Prioritise one vertical slice over breadth | Advanced MongoDB aggregations |
| Keep each chapter self-contained           | Automated testing framework   |
| Deploy to real, free cloud services        | Production hardening          |
| Show the full data flow end-to-end         | Microservices or TypeScript   |

### 17.2 · Architecture Overview

```mermaid
flowchart LR
    subgraph Client["Browser"]
        REACT["React SPA"]
        COMP["movies-list / movie / add-review / login"]
        SVC["MovieDataService (axios)"]
    end

    subgraph Server["Node + Express"]
        ROUTE["movies.route.js"]
        CTRL["movies.controller.js + reviews.controller.js"]
        DAO["moviesDAO.js + reviewsDAO.js"]
    end

    subgraph Cloud["Cloud"]
        ATLAS[("MongoDB Atlas sample_mflix")]
        HEROKU["Heroku Node dyno"]
        NETLIFY["Netlify static build"]
    end

    REACT --> COMP
    COMP --> SVC
    SVC --> ROUTE
    ROUTE --> CTRL
    CTRL --> DAO
    DAO --> ATLAS
    ROUTE -.deployed as.-> HEROKU
    REACT -.deployed as.-> NETLIFY
```


| **Layer** | **Technology** | **Responsibility** |
| --- | --- | --- |
| --------------------------------- | ---------------------------- | ----------------------------------------- |
| **Presentation**                  | React 17 + Bootstrap         | Renders the SPA, handles routing          |
| **Data fetching**                 | axios via `MovieDataService` | Sends REST calls to the backend           |
| **Web server**                    | Express 4                    | Routes, middleware, JSON responses        |
| **Business logic**                | Controllers                  | Parse requests, delegate, shape responses |
| **Data access**                   | DAOs                         | Encapsulate MongoDB queries               |
| **Persistence**                   | MongoDB Atlas                | Collections + `$lookup` aggregation       |
| **Deployment**                    | Heroku + Netlify             | Runtime hosting + static hosting          |

### 17.3 · Request Lifecycle

```mermaid
flowchart TD
    A[Component calls MovieDataService] --> B[axios GET / POST / PUT / DELETE]
    B --> C[movies.route.js matches URL]
    C --> D[Controller method invoked]
    D --> E{Query or body?}
    E -- GET --> F[req.query parsed]
    E -- POST/PUT/DELETE --> G[req.body parsed]
    F --> H[DAO method]
    G --> H
    H --> I[MongoDB driver query]
    I --> J[(Atlas)]
    J --> K[Result returned]
    K --> L[Controller shapes response]
    L --> M[res.json]
    M --> N[Component setState]
```


### 17.4 · Environment Variables

bash

```
# backend/.env
MOVIEREVIEWS_DB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/sample_mflix?retryWrites=true&w=majority
MOVIEREVIEWS_NS=sample_mflix
PORT=5000
```


- Loaded by `dotenv.config()` inside `main()` in `index.js`.
- **Never commit** `.env` — add it to `.gitignore`.
- On Heroku, set them via the dashboard or `heroku config:set`.

### 17.5 · Key Design Decisions & Trade-offs

| **#** | **Decision** | **Rationale** | **Trade-off** |
| --- | --- | --- | --- |
| ------------------------------- | ------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| **D1**                          | Native `mongodb` driver over Mongoose | Shows the raw driver API                   | No schema validation                          |
| **D2**                          | DAO pattern                           | Separates MongoDB logic from Express logic | One more file per collection                  |
| **D3**                          | ES module `import` syntax             | Modern JS                                  | Requires `"type": "module"` in `package.json` |
| **D4**                          | Fake login via React state            | Keeps the book focused                     | Not real authentication                       |
| **D5**                          | `$lookup` for reviews                 | One round trip instead of two              | Only works on MongoDB 3.2+                    |
| **D6**                          | Cursor + `skip`/`limit`               | Native pagination                          | Slow at high offsets                          |
| **D7**                          | `react-router-dom@5`                  | Simpler API than v6 for beginners          | Not current                                   |
| **D8**                          | Bootstrap via `react-bootstrap`       | Component-based styling                    | Bundle size                                   |
| **D9**                          | Insomnia for API testing              | GUI-first, visual                          | Postman is more common in industry            |
| **D10**                         | Heroku + Netlify                      | Free tier, git-based deploy                | Cold starts on Heroku free dynos              |

### 17.6 · Testing Strategy (suggested)

| **Level** | **Scope** | **Tools (suggested)** |
| --- | --- | --- |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| **Unit — DAO**                  | `getMovies`, `getMovieById`, `getRatings` with a mock driver      | Vitest / Jest                         |
| **Unit — Controller**           | Query/body parsing; default values for `page` and `moviesPerPage` | Jest + `supertest`                    |
| **Integration**                 | Full request → response against a test DB                         | `supertest` + `mongodb-memory-server` |
| **Component**                   | `MoviesList`, `Movie`, `AddReview`                                | React Testing Library                 |
| **E2E**                         | Login → browse → review → edit → delete                           | Playwright / Cypress                  |
| **Manual**                      | The 22 scenarios above                                            | Insomnia + the browser                |

### 17.7 · Performance Notes

- **Connection reuse** — a single `MongoClient` is created at boot and reused for all requests.
- **Cursor streaming** — the driver pulls results in batches, so `find()` never loads a whole collection into memory.
- **Indexes** — `_id` is indexed by default; the text index on `title` accelerates `$text`.
- **N+1 avoided** — `$lookup` in `getMovieById` fetches the movie and its reviews in a single aggregation.
- **Frontend bundle** — React 17 + Bootstrap + Moment; Netlify serves it as gzipped static assets.
- **Cold starts** — Heroku free dynos sleep after 30 minutes; the first request after a nap is slow.

---

## 18 · Chapter Index

| **Ch.** | **Title** | **Layer** | **Deliverable** |
| --- | --- | --- | --- |
| ---------------------------- | ----------------------------------- | --- | ------------------------------------- |
| 1                            | Introduction                        | —   | MERN overview + app preview           |
| 2                            | MongoDB Overview                    | DB  | Relational vs. NoSQL mental model     |
| 3                            | Setting Up MongoDB Atlas            | DB  | M0 cluster + user + IP whitelist      |
| 4                            | Adding Sample Data                  | DB  | `sample_mflix` loaded                 |
| 5                            | Setting Up Node.js, Express         | BE  | `backend/` scaffolded, deps installed |
| 6                            | Creating Our Backend Server         | BE  | `server.js`, `index.js`, first route  |
| 7                            | Movies Data Access Object           | BE  | `MoviesDAO.injectDB` + `getMovies`    |
| 8                            | Movies Controller                   | BE  | `apiGetMovies` + route wiring         |
| 9                            | Testing Our Backend API             | BE  | Insomnia + text index                 |
| 10                           | Leaving Movie Reviews               | BE  | `reviewsDAO` + `reviews.controller`   |
| 11                           | Testing the Reviews API             | BE  | POST/PUT/DELETE via Insomnia          |
| 12                           | Route to Get Single Movie + Ratings | BE  | `$lookup` aggregation + `distinct`    |
| 13                           | Introduction to React               | FE  | CRA scaffold + first component        |
| 14                           | Create Navigation Header Bar        | FE  | `Navbar` + user state                 |
| 15                           | Defining Our Routes                 | FE  | `Switch` + `Route` setup              |
| 16                           | MovieDataService                    | FE  | axios-based service layer             |
| 17                           | MoviesList Component                | FE  | Search + cards + pagination prep      |
| 18                           | Movie Component                     | FE  | Single movie page                     |
| 19                           | Listing Reviews                     | FE  | Reviews + moment.js formatting        |
| 20                           | Login Component                     | FE  | Fake login + prop drilling            |
| 21                           | Adding and Editing Reviews          | FE  | `AddReview` in two modes              |
| 22                           | Deleting a Review                   | FE  | Ownership-aware delete                |
| 23                           | Get Next Page's Results             | FE  | `currentPage` + useEffect             |
| 24                           | Next Page — Search Modes            | FE  | `currentSearchMode`                   |
| 25                           | Deploying Backend on Heroku         | Ops | `Procfile` + git push                 |
| 26                           | Hosting/Deploying React Frontend    | Ops | Netlify drag-and-drop                 |

---

## 19 · Roadmap & Known Risks

### 19.1 · Known Issues in the Book's Approach

| **ID** | **Issue** | **Impact** | **Mitigation** |
| --- | --- | --- | --- |
| --------------------------- | ------------------------------------------------ | -------------------------------- | ----------------------------------------------- |
| **R1**                      | Fake login uses `{ name, id }` from a text field | Any user can claim any `user_id` | Add real authentication (Firebase Auth, Auth0). |
| **R2**                      | `user_id` in the review body is trusted          | Ownership check can be spoofed   | Derive `user_id` from a session on the server.  |
| **R3**                      | `react-router-dom@5` is legacy                   | No future support                | Migrate to v6 (`useNavigate`, `<Routes>`).      |
| **R4**                      | No server-side input validation                  | Malformed reviews hit the DB     | Add `express-validator` or `zod`.               |
| **R5**                      | No rate limiting                                 | API is open to abuse             | Add `express-rate-limit`.                       |
| **R6**                      | No `helmet`                                      | Missing security headers         | `npm i helmet`, `app.use(helmet())`.            |
| **R7**                      | CORS is wide open                                | Any origin can call the API      | Restrict to the Netlify domain.                 |
| **R8**                      | IP whitelist is `0.0.0.0/0`                      | Anyone can hit Atlas             | Restrict to Heroku/NAT ranges.                  |
| **R9**                      | Heroku free dynos sleep                          | First request is slow            | Use a paid dyno or a keep-alive ping.           |
| **R10**                     | `moment` is in maintenance mode                  | No new features                  | Migrate to `date-fns` or `dayjs`.               |
| **R11**                     | No error boundary in React                       | One thrown error kills the page  | Add `ErrorBoundary` components.                 |
| **R12**                     | Search by title requires a manual Atlas index    | New clones will 500              | Script the index or use `$regex` as a fallback. |

### 19.2 · Roadmap

- [ ] **Implement real authentication** — Firebase Auth or Auth0 (R1, R2).
- [ ] **Add server-side validation** for review bodies (R4).
- [ ] **Add** **`helmet`** **+ rate limiting** (R5, R6).
- [ ] **Restrict CORS** to the deployed frontend origin (R7).
- [ ] **Add TypeScript** to both backend and frontend.
- [ ] **Migrate to** **`react-router-dom@6`** (R3).
- [ ] **Replace Moment with** **`date-fns`** (R10).
- [ ] **Add Jest + Supertest** for backend coverage.
- [ ] **Add React Testing Library** for frontend components.
- [ ] **Add Playwright** end-to-end tests.
- [ ] **Add pagination on the reviews list** (currently shows all reviews).
- [ ] **Add a real search bar with debouncing** instead of a button-triggered search.
- [ ] **Add poster fallbacks** using a placeholder image.
- [ ] **Add a Docker Compose** setup for one-command bootstrapping.

### 19.3 · Open Questions

- Should reviews be a **separate collection** or embedded in movies?
- Is `$text` the right tool for `title` search, or should it be `$regex` for substring matching?
- Should the `page` model use **offset** (skip/limit) or **keyset** pagination?
- Should the frontend cache movie lists to avoid re-fetching on every route change?
- Is it worth introducing a **state management library** (Redux, Zustand) for a project this size?
- Should the DAO return a `Result` type instead of throwing on error?

---

<div align="center">

### 🔗 Related Files

[`backend/server.js`](https://./backend/server.js) · [`backend/index.js`](https://./backend/index.js) · [`backend/api/movies.route.js`](https://./backend/api/movies.route.js) · [`backend/api/movies.controller.js`](https://./backend/api/movies.controller.js) · [`backend/api/reviews.controller.js`](https://./backend/api/reviews.controller.js) · [`backend/api/dao/moviesDAO.js`](https://./backend/api/dao/moviesDAO.js) · [`backend/api/dao/reviewsDAO.js`](https://./backend/api/dao/reviewsDAO.js) · [`frontend/src/components/movies-list.js`](https://./frontend/src/components/movies-list.js) · [`frontend/src/components/movie.js`](https://./frontend/src/components/movie.js) · [`frontend/src/components/add-review.js`](https://./frontend/src/components/add-review.js) · [`frontend/src/services/movies.js`](https://./frontend/src/services/movies.js)

**Beginning MERN Stack · A class companion README**

<sub>Reference · Greg Lim · [www.greglim.co/p/mern](https://www.greglim.co/p/mern)</sub>

<sub>⚡ MongoDB Atlas · Express 4 · React 17 · Node.js 14 · Heroku · Netlify</sub>

</div>
