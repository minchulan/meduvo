class PatientsController < ApplicationController
    before_action :is_authorized?, only: [:create]

    # GET '/patients'
    def index
        patients = @current_user.patients
        render json: patients, each_serializer: PatientSerializer
    end 

    # POST '/patients'
    def create 
        patient = @current_user.patients.create(patient_params)
        if patient.valid?
            render json: patient, status: :created 
        else  
            render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
        end 
    end 

    # GET '/patients/:id'
    def show 
        patient = @current_user.patients.find_by_id(params[:id])
        if patient
            render json: patient 
        else  
            render json: { error: "Not Found"}, status: :unauthorized
        end 
    end 

    # PATCH '/patients/:id'
    def update 
        patient = @current_user.patients.find_by_id(params[:id])
        if patient.update(patient_params)
            render json: patient 
        else  
            render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity 
        end 
    end 

    # DELETE '/patients/:id'
    def destroy 
        patient.destroy 
        head :no_content 
    end 
    
    private 

    def patient_params
        params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :language_preferences, :allergies, :viewed_notice_of_privacy_practices )
    end 

end

#----------------------------
# each_serializer method used to pass each instance to the serializer. to serialize a collection. 

# Let's walk through the code:

# 1. `PatientsController` is a controller responsible for handling CRUD operations related to patients.

# 2. The `index` action handles the GET request to `/patients`. It retrieves all the patients from the database using `Patient.all` and assigns them to the `patients` variable. Then, it renders the patients in JSON format.

# 3. The `create` action handles the POST request to `/patients`. It creates a new patient with the parameters received (`Patient.new(patient_params)`). If the patient is valid and successfully saved, it renders a JSON response with the created patient and a status of 201 (Created). If the patient is invalid and fails to save, it renders a JSON response with the patient's error messages and a status of 422 (Unprocessable Entity).

# 4. The `show` action handles the GET request to `/patients/:id`. It retrieves the patient with the specified ID and renders it in JSON format.

# 5. The `update` action handles the PATCH request to `/patients/:id`. It retrieves the patient with the specified ID, updates its attributes based on the parameters received (`@patient.update(patient_params)`), and saves the changes. If the update is successful, it renders the updated patient in JSON format. If the update fails, it renders a JSON response with the patient's error messages and a status of 422 (Unprocessable Entity).

# 6. The `destroy` action handles the DELETE request to `/patients/:id`. It retrieves the patient with the specified ID, deletes it from the database (`@patient.destroy`), and sends a head response with a status of 204 (No Content).

# 7. The `patient_params` method is a private method that defines the permitted parameters for creating and updating a patient. It uses `params.require(:patient).permit(...)` to specify which parameters are allowed.

# In summary, the `PatientsController` handles the patient retrieval, creation, updating, and deletion operations. It allows fetching all patients, creating a new patient, retrieving a specific patient, updating a patient's information, and deleting a patient. The actions return JSON responses with appropriate status codes to communicate the results of the operations.
