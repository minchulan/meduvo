class AppointmentsController < ApplicationController 
    
    # patient_appointments -- GET '/patients/:patient_id/appointments', to: "appoointments#index"
    def index
        appointments = current_user.appointments
        render json: appointments, status: :ok 
    end 

    # POST '/patients/:patient_id/appointments', to: "appointments#create"
    def create
        patient = current_user.patients.find(params[:patient_id]) # Fetch the patient based on the provided patient_id
        appointment = patient.appointments.build(appointment_params) # Associate the appointment with the patient

        if appointment.save
            render json: appointment, status: :created
        else
            render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end


    # appointment -- GET '/appointments/:id', to: "appointments#show"
    def show 
        appointment = current_user.appointments.find(params[:id])
        render json: appointment, status: :ok 
    end 


    # appointment -- PATCH '/appointments/:id', to: "appointments#update"
    def update 
        appointment = current_user.appointments.find(params[:id])
        if appointment.update(appointment_params)
            render json: appointment, status: :ok 
        else  
            render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    # appointment -- DELETE '/appointments/:id', to: "appointments#destroy"
    def destroy 
        appointment = current_user.appointments.find(params[:id])
        appointment.destroy 
        head :no_content
    end 

    private 

    def appointment_params
        params.require(:appointment).permit(
            :name,
            :date,
            :location,
            :category,
            :description
        )
    end

end


#------------------------------

## SHOW ACTION: 
# @current_user.appointments: This line uses the has_many association between User and Appointment models. It fetches appointments associated with the currently logged-in user.

# .find(params[:id]): Once we have the appointments associated with the user, we use the find method to retrieve the specific appointment with the given id. This ensures that the appointment belongs to the current user and has the specified id.



# Let's walk through the code:

# 1. `AppointmentsController` is a controller responsible for handling CRUD operations related to appointments.

# 2. The `index` action handles the GET request to `/appointments`. It retrieves the appointments associated with the current user (`@current_user.appointments`) and assigns them to the `appointments` variable. Then, it renders the appointments in JSON format with a status of 200 (OK).

# 3. The `create` action handles the POST request to `/appointments`. It creates a new appointment object with the parameters received (`@current_user.appointments.new(appointment_params)`). If the appointment saves successfully, it renders the created appointment in JSON format with a status of 201 (Created). If the appointment fails to save, it renders a JSON response with the appointment's error messages and a status of 422 (Unprocessable Entity).

# 4. The `show` action handles the GET request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It renders the appointment in JSON format with a status of 200 (OK).

# 5. The `update` action handles the PATCH request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It attempts to update the appointment using the parameters received (`appointment.update(appointment_params)`). If the update is successful, it renders the updated appointment in JSON format with a status of 200 (OK). If the update fails, it renders a JSON response with the appointment's error messages and a status of 422 (Unprocessable Entity).

# 6. The `destroy` action handles the DELETE request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It deletes the appointment (`appointment.destroy`). Then, it returns an empty response with a status of 204 (No Content) to indicate a successful deletion.

# 7. The `appointment_params` method is a private method that defines the permitted parameters for creating and updating an appointment. It uses `params.require(:appointment).permit(...)` to specify which parameters are allowed.

# In summary, the `AppointmentsController` handles various CRUD operations for appointments. It allows fetching appointments, creating new appointments, retrieving specific appointments, updating appointments, and deleting appointments. The actions return JSON responses with appropriate status codes to communicate the results of the operations.