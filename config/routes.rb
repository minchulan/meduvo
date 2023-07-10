# == Route Map
#

Rails.application.routes.draw do
  
  # Patients
  resources :patients, only: [:index, :show, :create, :update, :destroy]

  # Appointments
  resources :appointments, only: [:index, :show, :create, :update, :destroy]

  # Users 
  resources :users, only: [:update, :destroy]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # Sessions
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end


# ----------------------------------------------

## nested routes 
# resources :patients do 
  #   # resources :appointments, only: [:index, :create]
  #   resources :appointments, shallow: true 
  # end 

# line 15: we use a POST request because we're sending user data, sending information to create a new session. Created endpoint '/login' 
