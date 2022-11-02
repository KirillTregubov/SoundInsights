# Assignment 1 Blameless Postmortem

## What went well

- Backend successfully and reliably reads a sample of our dataset and runs an analysis on it
- Frontend works and shows Hello World + interactive button
- Docker was successfully setup
- Install and build scripts work some of the time on specific machines
- Both backend and frontend have their own isolated tests that run
- We had a meeting every week on-time

## What didn't go well

1. We decided to use Python with flask on our backend but didn't install + configure Flask
   - We talked about it in meeting but no one was assigned so the task was forgotten until after the submission
   - We didn't plan on implementing or testing communication between the frontend and backend so we didn't notice this functionality was missing
   - After Assignment 1 we started using GitHub Issues which helped alleviate some of the cause of this, but we are still leaving tasks in minutes and not being proactive with Issue creation and tracking
   - A subsequent action we are going to implement is add a third role to our rotation of people doing agenda and minutes that is responsible for defining and assigning tasks for the week
      - Order is 
        ```
        Agenda > Minutes > Tasks circular rotation
        Kirill
        Roger
        Burt
        Eddie
        ```

1. We were unsure about which technology we were using on our frontend 
    - Initially Kirill implemented a Vite+TS+React app, then we pivoted to Burt implementing a frontend Flask app, then we went back to the first stack
    - We didn't initally research the strengths and weaknesses of our chosen solutions well enough, we had a misunderstanding of what Flask is used for and did not realize we would need JavaScript for client-side interactivity anyways
    - We did not like the fact that a team member's work was effectively discarded and we found that we repeated this behaviour at least one other time since
    - The immediate solution is to be more dilligent in researching specifics about the tools and technologies we are using, not just picking them out of familiarity or popularity
    - A subsequent action we will try to implement is having a research reviewer similar to how we currently require one approval for each pull request.
      - The person in charge of the task to research the new tool/technology will be expected to tag a member of the team that they think are knowledgeable in the area or are available
      - Both the assignee and the "reviewer" will do research and report their findings / conclusions, if both are satisfied we can move on to integrating / implementing the thing

1. We were not super comfortable with the scripting languages and technologies used
    - Both Kirill and Eddie who were assigned to implement the scripts did not previously create shell scripts from scratch and rarely used Linux / didn't have a Linux VM installed
    - After A1 submission we did not have confidence that our scripts worked as intended and we did not test them on machines other than Windows using WSL and Mac using Intel
    - As a result of working on these tasks, both group members became more familiar with the scripting language and with some tweaks after the submission we have become fairly comfortable in the operation of these scripts
    - A subsequent action we have already implemented is that multiple group members installed VMs of operating systems we did not natively have access to. For future scripts that we have or will implement, it will be the responsibility of the script maker to test it on all platforms it is advertised to work on unless their computer does not support Virtualization in which case they will have to talk with the team and find a peer to assign the task of testing to.

## Immediate next steps

- Eddie will create a pinned issue that outlines the order and process of our rotation outlined as a subsequent action for the first point that didn't go well
