# Business Logic Sheets

There are 2 operations sheets from which data is pulled

1. The Staff Tracker Sheet which is based off of the CG 2.0 database: https://docs.google.com/spreadsheets/d/12eBkgtVelc3xXvVMI1NPG7JvC2eK5tfHPba9coP_xb4/edit#gid=878369239
2. The Calendly Sheet which is created by Calendly:
   https://docs.google.com/spreadsheets/d/1zNa5qmjJ8iVG0iZpQNmZIVGjOpvULMkbkb6TiInrw88/edit?ts=5e6b0f52#gid=971663080

## Entry Point

The entry point of this module is index.js.

## Logical Flow

1. First the module gets the Message Tracker Data to see what messages have been sent to the Message Queue and which haven't
2. staffTracker uses the message tracker data along with data obtained from the staff tracker to see which messages need
   to be sent
3. calendly uses the message tracker data, staffTracker data and calendly data to see which videoCall Messages need to be sent
