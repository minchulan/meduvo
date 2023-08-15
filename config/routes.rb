# == Route Map
#

Rails.application.routes.draw do

  # Patients
  resources :patients, only: [:index, :show, :create, :update, :destroy] do
    resources :appointments, only: [:index, :show, :create, :update, :destroy]
  end

  # # Appointments
  resources :appointments, only: [:index, :show]

  # Users
  resources :users, only: [:update, :destroy]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # Sessions
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Contact form
  post '/contact', to: 'contacts#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end



# ----------------------------------------------
# The config.ru file is used to define the routing configuration for the application, specifying how incoming HTTP requests should be mapped to controller actions.
# Patients:
# GET /patients
# GET /patients/:id
# POST /patients
# PATCH /patients/:id
# DELETE /patients/:id

# Appointments (nested under Patients):
# GET /patients/:patient_id/appointments
# GET /patients/:patient_id/appointments/:id
# POST /patients/:patient_id/appointments
# PATCH /patients/:patient_id/appointments/:id
# DELETE /patients/:patient_id/appointments/:id

# Appointments:
# GET /appointments
# GET /appointments/:id