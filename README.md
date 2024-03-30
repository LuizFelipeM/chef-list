<h1 align="center">
    <img
        width="35"
        alt="bowl food solid"
        title="bowl food solid"
        src="https://raw.githubusercontent.com/LuizFelipeM/chef-root/master/src/assets/bowl-food-solid.svg"
    />
    Chef Search - Single-SPA Application
</h1>

This project was created to learn a set of [techonologies](#technologies). They are implemented just for fun in a recipes search website called Chef.

This repository is the Single-SPA Application responsible for providing a search page showing the search results that was previusly inputed in the [Search Bar Application](https://github.com/LuizFelipeM/chef-searchbar). It uses the utility functions provided by the [Utility Application](https://github.com/LuizFelipeM/chef-utility) and enables a quick view of plenty of recipes.

## Demo

If you want to see this and the other 7 applications in action access Chef [here](https://link-to-chef).

## Development process

You can see the whole development process documented on my [medium post](https://medium.com/).

## Applications

The microfrontend architechture let each application be updated and deployed independently without affecting others.

- [Chef-root](https://github.com/LuizFelipeM/chef-root) - Root Config Application
- [Chef-home](https://github.com/LuizFelipeM/chef-home) - React Application
- **(This Repo)**[Chef-search](https://github.com/LuizFelipeM/chef-search) - React Application
- [Chef-recipe](https://github.com/LuizFelipeM/chef-recipe) - Angular Application
- [Chef-carousel](https://github.com/LuizFelipeM/chef-carousel) - Svelte Application
- [Chef-searchbar](https://github.com/LuizFelipeM/chef-searchbar) - Vue Application
- [Chef-styleguide](https://github.com/LuizFelipeM/chef-styleguide) - Vanilla JS/Mustache Application
- [Chef-utility](https://github.com/LuizFelipeM/chef-utility) - Typescript Application

## Technologies

For the management of the applications I used [Single-SPA](https://single-spa.js.org/) that has proven to be a powerful tool for microfrontend development and has plenty of features right out of the box. For styling I choose to use [Bulma](https://bulma.io/) CSS framework since it's easy to use, easy to setup, and they just released the v1.0 that catch my attention of its capabilities. And last but not least [Font Awesome](https://fontawesome.com/) to get incredible icons.

All data was provided by the [Spoonacular API](https://spoonacular.com/food-api) and the [News API](https://newsapi.org/) that helped tremendously to focus only in the implementation and not in the data.

## Running locally

To run the whole application locally clone this repository and the other 7 repositories in the [applications](#applications) section.

Run the install command:
```bash
npm install
# or
yarn install
```

Run it locally using the start command:
```bash
npm serve
# or
yarn serve
```

Do the process of [Running locally](#running-locally) described in each of the [applications](#applications) and you'll have the full application up and running.

## Building for production

To ship this application to production environment first need to build it using the following command
```bash
npm run build:webpack
# or
yarn build:webpack
```
it will produce the webpack build files in the `/dist` folder.