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
# Thie config.ru file is used to define the routing configuration for the application, specifying how incoming HTTP requests should be mapped to controller actions.

# With these routes, you have the following URL patterns:

# For patient-related routes:
# /patients: List of patients (index)
# /patients/:id: View a specific patient (show)
# /patients: Create a new patient (create)
# /patients/:id: Update a specific patient (update)
# /patients/:id: Delete a specific patient (destroy)
# For appointment-related routes (nested under patients):
# /patients/:patient_id/appointments: List of appointments for a specific patient (index)
# /appointments/:id: View a specific appointment (show)
# /appointments/:id: Update a specific appointment (update)
# /appointments/:id: Delete a specific appointment (destroy)
# For appointment-related routes (not nested under patients):
# /appointments/:id: View a specific appointment (show)
# /appointments/:id: Update a specific appointment (update)
# /appointments/:id: Delete a specific appointment (destroy)



# Based on your Rails routes, it seems you have set up routes for patients, appointments, users, sessions, and a contact form. Let's go through each part of the routes:

# 1. **Patients**: You have defined the CRUD routes for patients:

#    - `GET /patients`: Index route to get all patients.
#    - `GET /patients/:id`: Show route to get a specific patient.
#    - `POST /patients`: Create route to create a new patient.
#    - `PATCH /patients/:id`: Update route to update a specific patient.
#    - `DELETE /patients/:id`: Destroy route to delete a specific patient.

#    Additionally, I have nested the `appointments` resources under `patients` using `shallow: true`, which means the `appointments` routes will not include the patient ID in the URL:

#    - `GET /patients/:patient_id/appointments`: Index route to get all appointments for a specific patient.
#    - `POST /patients/:patient_id/appointments`: Create route to create a new appointment for a specific patient.

# 2. **Appointments**: You have defined the CRUD routes for appointments:

#    - `GET /appointments/:id`: Show route to get a specific appointment.
#    - `PATCH /appointments/:id`: Update route to update a specific appointment.
#    - `DELETE /appointments/:id`: Destroy route to delete a specific appointment.

# 3. **Users**: You have defined routes for user management:

#    - `PATCH /users/:id`: Update route to update a specific user.
#    - `DELETE /users/:id`: Destroy route to delete a specific user.
#    - `POST /signup`: Route to create a new user (sign up).
#    - `GET /me`: Route to get the current user details.

# 4. **Sessions**: You have defined routes for user sessions (login and logout):

#    - `POST /login`: Route to create a new user session (login).
#    - `DELETE /logout`: Route to destroy the user session (logout).

# 5. **Contact Form**: You have defined a route to handle contact form submissions:

#    - `POST /contact`: Route to handle contact form submissions.

# 6. **Fallback Route**: You have set up a catch-all fallback route that will be used for any other paths (URLs) that don't match the defined routes. This is especially useful for single-page applications (SPAs) built with React, as it allows React Router to handle client-side routing for paths that are not recognized by the server.

# Overall, your routes look well-structured, and they provide a RESTful API for handling patients, appointments, users, and sessions. 


# ---------------------------------------------------

## nested routes 
# resources :patients do 
  #   # resources :appointments, only: [:index, :create]
  #   resources :appointments, shallow: true 
  # end 

# line 15: we use a POST request because we're sending user data, sending information to create a new session. Created endpoint '/login' 
