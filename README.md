Weather App

Backend:

- I used db-migrate to create the weather info table.
- Backend checks for requested city info, if the database has data from 10 minutes ago, it shows that and if not, it requests
  data from openweather and saves it to the database.
- If there's an error, the error-handler middleware handles it.
- Requests and errors are logged using the logger function in middlewares.
- server is run with npm run dev command

Frontend:

- A simple javascript frontend with a form for the city input.
- Some light Bootstrap.
- While typing in the city a list of suggestions show up from given cities.
- On button click the app uses fetch to get data from the database or openweather.
- If the search was successful, a card shows up with the city info and if not, an alert box.
- You can change the language to English or Hungarian.
