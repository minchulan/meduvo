Rails.application.routes.draw do

  resources :patients, only: [:index, :show, :create, :update, :destroy] do
    resources :appointments, only: [:index, :show, :create, :update, :destroy]
  end

  resources :appointments, only: [:index, :show]

  resources :users, only: [:update, :destroy]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/contact', to: 'contacts#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end