Rails.application.routes.draw do

  resources :appointments, only: [:destroy, :show] 

  resources :patients do 
    resources :appointments, only: [:create, :index, :update]
  end
  
  resources :users, only: [:index, :update, :destroy]

  get '/patient_appts/:n', to: 'patients#patient_appts'

  post '/signup', to: 'users#create'

  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/contact', to: 'contacts#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
