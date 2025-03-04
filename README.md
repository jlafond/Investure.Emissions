# Global Emissions

  This is a React+Typescript Vite application, used to visualize global emissions over time.

  Please find below details regarding design decisions, build dependencies, and future concepts and improvements.

## Design

  To settle the ask for a modern looking dynamically responsive website, React+Typescipt Vite was use for construction and SCSS was used for the styling. This was chosen due to familiarity with the stack and in the interest of time could achieve the best possible result to resolve "primary focus of this web application should be to present a great modern-looking working user experience." and "As users adjust the filters, the application should dynamically update".

  Also in the interest of time, some widely used popular prebuilt NPM components were used. This allowed for better flexibility and limited acrued tech debt as these components are fairly stable and easy to use in the cases presented here.

## Local Runtime

  To run locally, please clone repository.

  Please ensure download of NPM, current build is with version: 10.9.2

  From local folder run the following command from command line/terminal
  > npm install
  
  To download necessary dependencies.

  Then run command:
  > npm run dev
    
  At which point should build dependencies and run on given localhost port.

## Build Dependencies

  As given in the current dependencies in the package.json:
      <code>
      @radix-ui/react-slider: ^1.2.3,
      @reduxjs/toolkit: ^2.6.0,
      echarts-for-react: ^3.0.2,
      react: ^19.0.0,
      react-dom: ^19.0.0,
      react-icons: ^5.5.0,
      react-redux: ^9.2.0,
      react-select: ^5.10.0,
      react-switch: ^7.1.0,
      redux: ^5.0.1
      </code>

  As explained in the Design section. These were used out of their stability, ease of use, and interest of time.

  Trade-off: echarts-for-react was ultimately selected for the charts and graphs, there were others that had been considered (including chartjs) but ultimately settled on echarts as I believe it had the better graphs and designs I was looking for.

## Future concepts and improvements
  Please find below some ideas and concepts I had considered. Ultimately in the interest of time and resolving the MVP ask requirements. A trade off was made to not include as part of the initial rollout.

  * Ability to forecast and project future emissions
	  * Based on trends projecting 5,10+ years out per country
		  * Perhaps can incorporate different projection models
			  * ai, internal calculations and algorithms, user input
			    * User input can be something like "country X anticipates Y% increase/decrease in emissions over Z years"

  * Incorporate different data points
	  * Current data set is fairly limited and does not tell the full story. Including more relevant data points can provide a better picture
		  * ~~Consider population size, including population can give a better picture as far as emissions per capita.~~
			  * ~~As it may be a bit unfair to compare China to France based solely on sum total given the population of china is >20x larger~~
	
		  * Possibly land mass can be a point of interest.
			  * Consider countries Brazil and Indonesia, which have potentially negligeble population size differences but an over 4x land mass difference.
				  * A graph or chart displaying the emissions per square mile can add an interesting wrinkle to the data

  * Incorporate more countries
    * Adding more countries can expand and cascade into several other features, including but not limited to:
      * Grouping of countries in analysis.
        * Potentially can group by regions (Asia Pacific, Europe, North/South America) to display for all/some countries selected region
        * Can give emissions by region as opposed to country. Values would be given in aggregated sum by all countries for each region
    * *RISK* as country sets expand, will need to monitor how this impacts overall performance. Given current architecture pulls for all countries on dashboard page load and stores in redux. If expanded to global, will need to check the total size of the full data set and time to load globally.

  * Better styling and responsiveness for mobile
    * currently optimized for desktop and tablet
	  * functionality works on mobile screensizes but some styling work can be done