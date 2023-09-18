Rails.application.routes.draw do
  
  resources :appointments, only: [:destroy, :show] 

  resources :patients do 
    resources :appointments, only: [:create, :index, :update]
  end
  
  resources :users, only: [:index, :update, :destroy]

  post '/signup', to: 'users#create'

  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/contact', to: 'contacts#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end




#--------------------------------------

## Live Coding Challenge 1: 
# Users with invoices over n. Create a custom route that takes a parameter of a number. Look at the Invoices and find all invoices that have a cost greater than that number. If that turns up any invoices, render back an array of all the users for all those invoices. If no invoices are found, render a json message that says so including the number that was included in the search. 

# '/me' route: # this route checks to see if session has user id. Just reading info from our sessions hash. Grabs a single user if user is logged in...so will send to users controller and go to show action since we already have a method that finds a user for us.

# shallow true builds the 2 nested routes - index & create, as well as the non-nested routes - :update, :destroy, :show 

# get '/me', to users:show 
  # this route checks to see if session has user id. Just reading info from our sessions hash. Grabs a single user if user is logged in...so will send to users controller and go to show action since we already have a method that finds a user for us.
