# == Route Map
#

Rails.application.routes.draw do

  resources :appointments, only: [:index] # perhaps admin users can see all appointments? 

  resources :patients do
    resources :appointments, shallow: true 
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


# shallow true builds the 2 nested routes - index & create, as well as the non-nested routes - :update, :destroy, :show 
