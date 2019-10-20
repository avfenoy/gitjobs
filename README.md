This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run the app

First download or clone this repository. To run this app, you will need to have Node.js and npm on your machine. If you don't, you can install them using [NVM](https://github.com/nvm-sh/nvm).
Before running the app for the first time, you will need to install the required packages. In order to do this, go to the root folder of the project and run `npm install`.
Once you have installed the dependencies, you can run the app by running `npm start`. This will start a proxy server on localhost:3001 and will load the React app on localhost:3000.
When the start scripts have finished, you may visit localhost:3000 in a web browser to see the app.

## About the app

This app is a simple website created to interact with the [GitHub Jobs API](https://jobs.github.com/api). You can search for a job position using a form with three fields: description, location, and whether the jobs must be full time only. When you search, the results are displayed in a table. If there are more than fifty results for your search, a pagination controller will show up at the bottom of the page.

The connection with the API is established through the proxy server running in localhost:3001 to avoid CORS issues. Since fetching results from the API may be a little slow depending on your connection, a five minutes cache is enabled to ease navigation within already visited table pages.

## Considerations

For this project, I have decided to keep the visuals simple in order to focus on the functionality. I would have liked to make the app more visually appealing, but developing the table behaviour took most of the time. Still, I have tried to keep the design clean and nice, adding some little touches (like the table header hovering behaviour) to give a pleasant user experience.

The GitHub Jobs API is very shallow and I have had to make some workarounds to enable pagination, due to the fact that the API only gives you 50 results but does not inform you about the total number. Also, the documentation is not up to date and there are a couple of things that I have had to adapt to make it work.

In my app, you can sort the results in the table using any of the fields (except for the _type_ field), but they are only sorted for the current page. That would not be very useful in a real web site, but the API does not provide a way to get the results already sorted, and to request all the results from the beginning in packs of 50 would hurt performance a lot.

The requests to the API are sometimes a bit slow, so I have added a small progress animation during requests to alleviate the wait.

I tried from the beginning to make the app responsive, but adapting the table for mobile devices would require some adaptations to the design that would take a bit of time, and I did not have enough time to do it. Anyway, it should look good on desktop and tablets.

For what I have been able to test, the app works flawlessly and everything renders consistently in different browsers (Chrome, Firefox). I have minimized the chances of error by url-encoding the inputs (they must be in string format), adding a try-catch block with an alert message when a request fails, and preventing that the user navigates to a different page when the requested page has not loaded yet. The sorting behaviour also works good, and there are no other means of user interaction, so (its simplicity aside) I would say it is a robust app overall.
