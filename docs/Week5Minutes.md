## Week 5 Meeting Minutes

- Misc:
  - We decided to use git merge instead of git rebase since it is less work.

- Goals:
  - Everyone is content with dataset & techs.
  - Everyone is comfortable with assigned tasks.
  - Everyone is fine with meeting schedule & format.
  - Docker works fine on Windows/Mac, haven't tried on Linux yet.
  - Project clearly builds in one step.
  - Our tests cover entire project and run in one step.
  - We plan to create a "summary" file of our development process, with links to the minutes files where necessary.
- We didn't miss any of our goals.
- No need to change our plans based on remaining time and project scope.
- We changed our dataset since we still do not have access to our primary dataset. We also need to incorporate Anaconda into Docker.

- We can definitely automate CI/CD. Testing and building are already automated. We are also considering automating integration tests.
- Consider dependencies when prioritizing tasks. Favor tasks that other tasks depend on. Prioritize tasks directly related to the milestone marking scheme.
- A code subtask is marked as complete if it compiles, integrates with the codebase, and passes at least one meaningful test. Each successful code subtask requires an open PR with approval from someone else also familiar with that section of the codebase. All code should be linted and styled, and frontend should be type-checked.
- A research subtask should be verifiably correct and an external citization or doc should be provided.
- A successful integration subtask is demonstrable and reproducable (ex. GitHub Actions workflow on every commit).

- We decided we want to tackle multiple milestones at once (2, 3 and 4). We plan to implement a subset of the components for each in parallel.
- Milestonee 2:
  - Implement CI.
  - Implement CD.
  - Weekly check-in to make sure every component/function has an accompanying task.
- Milestone 3:
  - We plan on communicating between Python and Flask using Json. 
  - Testing can be completed before completion of the algorithm with hardcoded Json input/output.
- Milestone 4:
  - Implement the component that takes in user inputs (3 seperate arguments).
  - Decide on the website layout (pages, etc.).

- Tasks for next week:

- Eddie
  - Specify how to interface with the Python script (i.e. what am I sending the Python script and what do I want back from the Python script).
  - Implement function that sends POST requests.

- Kirill
  - Configure Docker network and integrate backend and frontend comms.
  - Decide on the website layout (pages, etc.).
  - Add tailwind and create mockup.

- Burt
  - Check to make sure all code is tested on Tuesday.
  - Implement components that take in the user query.

- Roger
  - Think up of a class of suitable questions to ask about the dataset. One using ML and one using basic DB stuff.
  - Research models to actually compute this stuff.

- Our VCS structure involves creating a new branch for each feature. Once the feature is complete open up a pull request and delete the branch after.
