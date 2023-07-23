class PatientsController < ApplicationController
    # GET '/patients'
    def index
        patient = current_user.patients.build(patient_params)

        if patient.save
            render json: patient, status: :created 
        else  
            render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    # POST '/patients'
    def create 
        if @current_user.nil?
        render json: { error: 'User not authenticated' }, status: :unauthorized
        return
        end

        patient = @current_user.patients.build(patient_params)

        if patient.save
        render json: patient, status: :created 
        else  
        render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    # GET '/patients/:id'
    def show 
        patient = @current_user.patients.find_by_id(params[:id])
        if patient
            render json: patient, status: :ok 
        else  
            render json: { error: "Not Found"}, status: :unauthorized
        end 
    end 

    # PATCH '/patients/:id'
    def update
        patient = @current_user.patients.find_by_id(params[:id])
        if patient  
            if patient.update(patient_params)
                render json: patients, status: :ok 
            else  
                render json: { error: "Faled to update the patient "}, status: :unprocessable_entity
            end 
        else  
            render json: { error: "Patient not found" }, status: :not_found
        end 
    end 

    # DELETE '/patients/:id'
    def destroy 
        patient = @current_user.patients.find_by_id(params[:id])
        if patient 
            patient.destroy
            head :no_content
        else 
            render json: { error: "Patient not found" }, status: :not_found
        end 
    end 

    private 

    def patient_params
        params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes)
    end 

end


#----------------------------

    # before_action :is_authorized?, only: [:create]

        # def create 
    #     patient = @current_user.patients.create(patient_params)
    #     if patient.valid?
    #         render json: patient, status: :created 
    #     else  
    #         render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
    #     end 
    # end 

    # update action: 
        # error handling for the case when the patient is not found or the update fails

# The error is likely occurring because `@current_user` is `nil`, and you are attempting to call the `patients` method on a `nil` object. 
# In the `create` action of the `PatientsController`, you are using `@current_user.patients.create(patient_params)` to create a new patient associated with the current user. However, if `@current_user` is `nil`, it means that there is no authenticated user, and therefore calling `patients` on `nil` will result in the `NoMethodError` you encountered.

# To fix this error, you need to ensure that `@current_user` is properly set before calling the `create` method. Make sure that the user is authenticated and that `@current_user` is assigned the appropriate user object. You can check if `@current_user` is `nil` before attempting to create the patient and handle the case where there is no authenticated user accordingly, such as returning an error response or redirecting to a login page.



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


# # GET '/patients/:id'
# def show 
#     patient = @current_user.patients.find_by_id(params[:id])
#     if patient
#         render json: patient, methods: [:full_name], status: ok 
#     else  
#         render json: { error: "Not Found"}, status: :unauthorized
#     end 
# end
# ```

# 1. The `show` action is defined to handle the GET request for retrieving a specific patient's information. The route for this action is defined as `GET '/patients/:id'`, where `:id` is the placeholder for the patient's ID.

# 2. Inside the action, it begins by finding the patient with the given ID (`params[:id]`) that belongs to the current user (`@current_user`). The `find_by_id` method is used to search for the patient with the specified ID within the collection of patients associated with the current user.

# 3. If a patient is found (i.e., `patient` is not `nil`), it proceeds to render the patient's information in JSON format. The `render` method is called with the `json` option, which serializes the `patient` object into JSON. The `methods: [:full_name]` option includes an additional method called `full_name` in the serialized JSON output. This `full_name` method is defined in the Patient model and returns the patient's full name.

# 4. The response status is set to `ok` (200) using the `status` option. This indicates a successful request.

# 5. If no patient is found (i.e., `patient` is `nil`), it renders a JSON response with an error message. The `render` method is called with the `json` option, passing a hash with an `error` key and the corresponding error message. The response status is set to `:unauthorized` (401) using the `status` option.

# That's an overview of the code in your Patients controller's `show` action. It fetches a specific patient belonging to the current user and returns the patient's information in JSON format if found, or an error message if not found.
