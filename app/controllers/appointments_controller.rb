class AppointmentsController < ApplicationController 
    
    # GET '/appointments'
    def index
        appointments = @current_user.appointments
        render json: appointments, status: :ok 
    end 

    # POST '/appointments'
    def create 
        appointment = @current_user.appointments.new(appointment_params)
        if appointment.save
            render json: appointment, status: :created 
        else  
            render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    # GET '/appointments/:id'
    def show 
        render json: appointment, status: :ok 
    end 

    # PATCH '/appointments/:id'
    def update 
        if appointment.update(appointment_params)
            render json: appointment, status: :ok 
        else  
            render json: { error: @appointment.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    # DELETE '/appointments/:id'
    def destroy 
        appointment.destroy 
        head :no_content
    end 

    private 

    def appointment_params
        params.require(:appointment).permit(:patient_id, :user_id, :category, :name, :location, :description)
    end 
end


#------------------------------
# Let's walk through the code:

# 1. `AppointmentsController` is a controller responsible for handling CRUD operations related to appointments.

# 2. The `index` action handles the GET request to `/appointments`. It retrieves the appointments associated with the current user (`@current_user.appointments`) and assigns them to the `appointments` variable. Then, it renders the appointments in JSON format with a status of 200 (OK).

# 3. The `create` action handles the POST request to `/appointments`. It creates a new appointment object with the parameters received (`@current_user.appointments.new(appointment_params)`). If the appointment saves successfully, it renders the created appointment in JSON format with a status of 201 (Created). If the appointment fails to save, it renders a JSON response with the appointment's error messages and a status of 422 (Unprocessable Entity).

# 4. The `show` action handles the GET request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It renders the appointment in JSON format with a status of 200 (OK).

# 5. The `update` action handles the PATCH request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It attempts to update the appointment using the parameters received (`appointment.update(appointment_params)`). If the update is successful, it renders the updated appointment in JSON format with a status of 200 (OK). If the update fails, it renders a JSON response with the appointment's error messages and a status of 422 (Unprocessable Entity).

# 6. The `destroy` action handles the DELETE request to `/appointments/:id`, where `:id` represents the ID of a specific appointment. It deletes the appointment (`appointment.destroy`). Then, it returns an empty response with a status of 204 (No Content) to indicate a successful deletion.

# 7. The `appointment_params` method is a private method that defines the permitted parameters for creating and updating an appointment. It uses `params.require(:appointment).permit(...)` to specify which parameters are allowed.

# In summary, the `AppointmentsController` handles various CRUD operations for appointments. It allows fetching appointments, creating new appointments, retrieving specific appointments, updating appointments, and deleting appointments. The actions return JSON responses with appropriate status codes to communicate the results of the operations.