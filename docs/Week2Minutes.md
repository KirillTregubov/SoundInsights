## Meeting held on 2022-09-21, notes by Kirill Tregubov

## Agenda

### Decisions we need to make today:

1. Discuss workloads, schedules, educational goals, available hardware (est 10 mins.)
1. Agree on which dataset to use for the project. (est 10 mins.)
1. Do the following for each step in part (2) of “Before the meeting”. (est 45 mins.)
   1. Discuss various alternatives for tech that can help us succeed.
   1. Agree on which tech stack and toolchain to use.
      - Discuss our levels of expertise with this tech
   1. Write down why what we picked are good technologies (ex. Good for the task, familiarity).
   1. Write down the risks associated with using that technology (ex. Time consuming, new ecosystem, etc.).
1. Write up a project plan (consult A1 document). (est 30 mins.)
   3-4 milestones. 1. For each milestone, specific tasks that need to be done. - Assign who will be responsible for what - responsible doesn’t mean you have to do it alone, just be the leader on that particular task - We should have 2-3 immediate next actions each of us will take to achieve milestone #1 or more.

### After the meeting:

1. Work on the next actions we decided. We’ll say this is due next Wednesday before our next meeting. This way we can use the next meeting to report our progress and have time to run through the project to prepare for the next week’s worth of work.

### Minutes:

We started by talking about the dataset we want to use.

- Eddie brought up Spotify-based dataset https://www.kaggle.com/datasets/dhruvildave/spotify-charts and an official Spotify API https://developer.spotify.com/documentation/web-api/
- Kirill brought up we can do music analysis, music recommendation, historic stats, patterns and trends.
- Burt brought up Instagram, analyzing comments and posts and interactions using Graph Theory

Technologies we are ok working with

- Kirill is comfortable with SQL and can set up the databases
- Burt said he is most comfortable with Python
- Eddie said he is comfortable with Python, JS, Java, Kotlin
- Kirill said he is comfortable with JS, TS, Python, Java

Next we tackled workloads, schedules, educational goals, available hardware

- Eddie and Kirill can take the bulk of the work
- Burt has 6 courses
- All three of us do our best work at night
- Members with the most other commitments should be tasked with the non time-critical tasks like documentation, automation, testing, deployment
- Eddie wants something to show for and be proud of
- We all want a good grade in the course
- Kirill really wants to build a typesafe application
- Eddie is on Windows, Android
- Kirill is on Windows and Mac (Intel), Android and iOS, Raspberry Pi
- Burt is on Mac (Intel), iOS
- We will revisit the chosen dataset next week once we have explored alternatives

Next we are talking about technologies

- First up is Python: really good data analysis tooling and manipulation libraries
  - Burt is familiar with it
  - Python is used heavily in industry, specifically in data science uses
  - Has flask and django for web/api work
    - Only Burt has used flask but in general our opinion is that these frameworks are in a rough spot and need to do a lot of weird compatibility things to interoperate with the main web platform which is HTML/JS
    - In the end all it sends to the user is HTML and the server has to do a lot of processing when it comes to interactivity
  - Has Kivy for native cross-platform python apps
- Next is JS: native language of the web
  - Kirill and Eddie are familiar and most comfortable in it
  - Has TypeScript if we want typing / type enforcement for better runtime predictability
  - Has way too many libraries to choose from: React, Vue, Angular, Qwik, Fresh, Astro, Svelte, Solid.js, Ember…
    - Each has their own pros/cons, features, ecosystems with supporting libraries and native app generation options
  - Allows us to do most of the processing / data analysis on the user’s device
  - Some devices include special cores that are optimized to run JS code
  - Burt is not super familiar with the language and would need some help along the way
  - Slower than Python when dealing with large datasets / expensive computations
- Last is Kotlin: Java but better
  - Only Eddie has experience with this
  - It compiles to the same bytecode as Java (runs on JVM)
  - Really good for writing Android code
  - There is cross platform opportunities but none of us have heard or used them
  - Not made for web (mobile in mind), would be ran on a dedicated server
  - Not run natively (except for mobile)

Next we discussed container solutions

- AWS Lambda: serverless delivery solutions
  - Kirill has used it before
  - There are various third parties that make using them easy: Vercel, Netlify, Fly.io, Heroku, Digital Ocean
  - Downside: Amazon documentation is really hard to read / understand
  - We aren’t sure how our database storage will work with this solution since serverless isn’t suitable for constant uptime services
- Docker: the enterprise solution
  - Hard to scaffold, reliable once everything is configured
  - Eddie thinks it’s over-engineered
  - Can be adapted to host both our app and database

We have decided the technology we are using is TypeScript

- We want type safety and autocomplete that Typescript provides while staying within the JavaScript ecosystem
- Python does a bit too much on the server / in the Python runtime that we want to avoid
- TypeScript will run the same code that the client will run
- We have all seen and used React once
- Kirill and Eddie both build most of their projects in React
- React is a very un-opinionated framework which allows us lots of flexibility on routing, state management, deployment
  - Gives us flexibility and we can help Burt if he gets stuck (where the documentation doesn’t)
- React is THE dominant Javascript framework, ¼ of the top 100k websites use React, there are many blogs/writeups on how to write good React code / scale React code / deploy React code at scale
- We will use Vite as our build tool (simple) as it is more performant than Create React - App and made by the creator of Vue
- Since we chose Vite we will use Vitest to test our frontend code

Risks associated with what we chose

- We want to pursue native applications where React will struggle and be worse than native languages like Swift / C++ / Java
- A lot of bad / outdated / poorly documented or maintained npm packages that we might innocently choose which will overcomplicate / cause future problems
- In general npm has a pretty bad track record with vulnerabilities / timely patches
- React is pretty heavy and there are lighter modern alternatives but the reason we didn’t choose them is that they lack the ecosystem / community support / haven’t been proven in production

Last we talked about the project plan

- Since we are not concrete on what we want to do we decided to finalize the milestones next week
- Draft milestone 1: A potential user should be able to access the service that authenticates them and shows (historical) data and trends, on any internet-connected device of their choosing, available on-demand
  - Tasks: (will be formatted as “Task name: Person in charge”)
    - Setup repository: Kirill - for next week
    - Initialize the frontend: Kirill - for next week
    - Figure out what we want to analyze: Burt - for next week
    - Identify the data we will need: Burt - for next week
    - Determine how we will display it: Burt - for next week
    - Integrate Spotify authentication: Kirill
    - Figure out code / algorithms for analyzing the data: Burt
    - Write components for displaying the analyses: Burt
    - Interface with Spotify API: Kirill
    - Deploy frontend: Kirill
- Draft milestone 2: There should be an option to try out all the features of the service/app without authenticating / providing personal info, similar to a demo of a SaaS
  - Tasks:
    - Figure out which dummy data to use: Burt
    - Integrating that with the existing analysis and display code: Burt
- Draft milestone 3: Configure database, establish schema (verify lossless joins, prevent redundancy) and integrate it with the frontend code
  - Tasks:
    - Figure out what tech we will use for storing data: Eddie - for next week
    - Decide how it the db will be deployed: Eddie - for next week
    - Figure out how the frontend will communicate with the db: Eddie - for next week
    - Configure and initialize database: Eddie
    - Start defining the tables / schema: Eddie
    - Integrate it with frontend: Kirill
- Draft milestone 4: Ensure all code is typesafe, linted and styled, and substantially tested for relevant use cases / edge cases.
  - Tasks:
    - Setup typechecker: Kirill - for next week
    - Linter and code formatter: Kirill - for next week
    - Configure tester: Kirill - for next week
    - Figure out how we want to approach testing: Burt
    - Write unit tests: Burt
    - Integration tests: Unassigned for now

We decided that for now we are sticking with the Spotify / music listening dataset but we are not concrete and can change this before our submission

- Eddie brought up Icebergify, a website that is a very simple example of what we want to accomplish

We set up the git repository with everyone in the meeting so that we wouldn’t have to do this later

We decided that Burt will be leading the next meeting, Eddie will be taking notes and Kirill will be resting and we will alternate to continue the pattern

### Things to follow up on for next meeting

- Assigned tasks
- Figuring out deployment / container for database
- Finalize milestones
