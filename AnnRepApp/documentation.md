# React on Rails

Followed this tutorial:
- https://github.com/shakacode/react_on_rails/blob/master/docs/tutorial.md

Very basic, it even has details on how to deplay to heroku, that'll be good in the future when we get this application fully developed.

Foreman is new, here are the deets here. TLDR: basically all the process required to run an application are ran through `foreman` and outputted to stdout. I guess similar to nodemon.
- http://blog.daviddollar.org/2011/05/06/introducing-foreman.html

The hello_world application is successfully up and running. It was pretty straight-forward. The good thing about this version of react on rails is that is uses webpack and doesn't depend on jQuery. Also, we'll be able to use Redux, React Router, and webpack optimisation.

Questions to ask:
- Can I create a `/user/:id/<react_component>` route with the react_component representing reports?

# Description of Req/Res Flow of React on Rails

Will only describe what is an addition to rails.

1) Route to any controller and action. Neither of these require code from the react_on_rails gem for the react front end to work. When the react_on_rails gem is installed into a rails project it will put the following line of code into `controllers/hello_world.rb`:

`layout "hello_world"`

The only reason this is in the hello_world controller is because it is pointing to `layouts/hello_world.html.erb`. In this file the webpack is inserted`<%= javascript_pack_tag 'webpack-bundle' %>`. However, this can just be put into the head of `application.html.erb`. Note: This solved the problem we had with having to refresh from `/hello_world` to get other components to render and the problem we had with the component not rendering on first visit.

2) Controller can perform any calls to model and assign the returned value to an instance variable that can be sent to the view.

3) The response is directs view folder specified in the previous controller and the appropriate page as per the action.

Following the previous examples, it'd be: `hello_world/index.html.erb`

It is here the react component is rendered:

`<%= react_component("<name of react file to render>", props: <name of props sent into component from controller>, prerender: <a boolean value as to whether this is server rendered or not>) %>`

Such as: `<%= react_component("HelloWorld", props: @hello_world_props, prerender: false) %>`

`react_component()` is a helper from the react_on_rails gem.

4) All the react code is stored in the `client` folder. The

## Use of styled-components

Github: https://github.com/styled-components/styled-components

A fundamental issue that we had was figuring out how to change the CSS code when the user changes the styling of the page to suit their organisation look. In building out the functionality we created blocks of CSS code with fixed class names that'd we'd use to test whether a react_on_rails function would work or not. However, this was not sustainable in the long run as it wouldn't be scalable because if we wanted to add more styling we'd have to add more code to the CSS. It also limited the selection of styling options available to the user to what particular styles we put together within a chunk of CSS code. This limitation was solved with `styled-components`.

`styled-components` gave us the ability to directly change the value of a CSS property. This avoids the hassle of creating CSS blocks within which the properties are set to values that we predefine. This way the user is actually directly changing the values of each CSS attribute. All we have to do is select what attributes we want in a component, and find a user friendly way for these attributes to be changed. We are able to do this thanks to `react_on_rails` which allows us to create a state value for the CSS attribute. This is how a `styled-components` attribute is changed. The user changes the state through the `react_on_rails` component and that state changes the value of the `styled-components` CSS attribute which then changes the style of the component.

##ISSUES

### Using an object for state

CONTEXT - From rails `reports/new.html` I send `reportProps` in as props to the `ReportIndex.jsx` component. `reportProps` contains a `report` object inside of which are the attributes of the report object ( `id: nil, title: "This is default title", header_colour: "blue", footer_colour: "red", footer_date: date, footer_company: "This is default company", user_id: user`) which are based off of `reports` from the rails schema. Inside `ReportIndex.jsx` the `report` is used as props to set the default state for the component. The values determine the styling for a default annual report template.

PROBLEM - I'm using `onChange={(e) => this.setState({ report: { footer_company: e.target.value }})}` to change the state of the report object. This is used to change the state of the report object when the value of the input box changes. Whenever, I use the input box to change the state of a particular attribute it changes value of the particular attribute assigned to the input box, but it also changes the value of all the other attributes to `undefined`.

WORK AROUND - change the these to individual state attributes outside the object, instead of inside an object.

## SOLVED ISSUES

### Loading /hello_world

For the first time after signing in and the react component for this page doesn't load. The page loads upone refreshing and loads when we go into the page again through the link after refreshing. Not sure why it doesn't load. However, it does load when entering the URL straight into the browser.

TESTED but not working:
- Uncommenting this `<%= javascript_pack_tag 'main' %>` in `application.html.erb`.

FIX
- Removing `<%= javascript_pack_tag 'webpack-bundle' %>` from `layouts/hello_world.html.erb` to `application.html.erb`.

WHY?
- This, I'm assuming, is because the entry point for all the files necessary for react_on_rails to run is through the webpack-bundle which was in the hello_world file. Thus, it has to be load through that file first. To make it more applicable through-out rails it's easily to put that script in `application.html.erb` so it'll be loaded with any view instead of having to go through a particular view to load it.

### API json request from React to rails

When we nested the reports resources in the user routes and tried to call a resource through it we'd get an undefined method error in the default code for `_report.json.jbuilder`. We had to change the route that was called from this to represent the nested routing of the rails application. It was changed from `json.url report_url(report, format: :json)` to `json.url user_report_url(report, format: :json)`. However, this gave an error of:

`No route matches {:action=>"show", :controller=>"reports", :format=>:json, :user_id=>#<Report id: 1,
title: "", header_colour: "", footer_colour: "Orange", user_id: nil, created_at: "2017-06-27 00:13:31", updated_at: "2017-06-27 00:27:33">} missing re
quired keys: [:id]`

This error was given because the route required the user id for it to know which route to go to. We added the `current_user` helper from devise to know which user to call when activating that route. Like so: `json.url user_report_url(current_user, report, format: :json)`
