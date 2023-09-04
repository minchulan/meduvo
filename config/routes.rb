Rails.application.routes.draw do

  resources :appointments, only: [:index, :destroy, :show] # perhaps admin users can see all appointments? 

  resources :patients do 
    resources :appointments, only: [:create, :index, :update]
  end
  
  resources :users, only: [:index, :update, :destroy]
  post '/signup', to: 'users#create'

  get '/me', to: 'users#show' # this route checks to see if session has user id. Just reading info from our sessions hash. Grabs a single user if user is logged in...so will send to users controller and go to show action since we already have a method that finds a user for us.

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/contact', to: 'contacts#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end


# shallow true builds the 2 nested routes - index & create, as well as the non-nested routes - :update, :destroy, :show 

# get '/me', to users:show 
  # this route checks to see if session has user id. Just reading info from our sessions hash. Grabs a single user if user is logged in...so will send to users controller and go to show action since we already have a method that finds a user for us.
