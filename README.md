# whatsapp-onboarding-system

This was a very old project I worked on in university that automated 10's of thousands of whatsapp messages for a health care company.

This was created before the Whatsapp API existed. The script opened up the whatsapp web portal, searched for a contact and sent a templated message configured on a whatsapp business account.

A google sheet was used to track all the users that needed to onboarded. There was a 5 step onboarding process

1. User signs up on the website where they submit their ID and certifications
2. A welcome message is sent to the user along with a message to schedule their interview on calendly
3. Once the interview is scheduled, a google sheet is updated which is used to trigger a confirmation message
4. 1 hour before the interview, a reminder message is sent to the user
5. Once the user completes the interview, a final confirmation message is sent and the onboarding is completed

This codebase does not reflect any semblance of competence, it's simply an artefact of the past.
