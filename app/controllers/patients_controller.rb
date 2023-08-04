class PatientsController < ApplicationController

  # patients -- GET '/patients', to: "patients#index"
  def index
    patients = current_user.patients
    render json: patients
  end

  # patients -- POST '/patients', to: "patients#create"
  def create #post "/patients/new"
    patient = current_user.patients.create(patient_params)
    if patient.valid?
      render json: patient 
    else  
      render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
    end 
  end 

  # patient -- GET '/patients/:id', to: "patients#show"
  def show
    patient = current_user.patients.find_by_id(params[:id])
    if patient 
      render json: patient, status: :ok 
    else  
      render json: { error: "Not Found" }, status: :unauthorized
    end 
  end

  # patient -- PATCH '/patients/:id', to: "patients#update"
  def update
    patient = current_user.patients.find_by_id(params[:id])
    patient.update(patient_params)
    render json: patient, status: :accepted
  end

  # patient -- DELETE '/patients/:id', to: "patients#destroy" 
  def destroy
    patient = current_user.patients.find_by_id(params[:id])
    if patient
      patient.destroy
      head :no_content
    else
      render json: { error: 'Patient not found' }, status: :not_found
    end
  end


  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :language_preferences, :viewed_notice_of_privacy_practices, :created_at, :updated_at)
  end

end






#----------------------------

# The `PatientsController` is a Rails controller responsible for handling requests related to patients. Here's a breakdown of each action and what it does:

# 1. `index`: This action handles a GET request to '/patients', which is used to retrieve a list of patients belonging to the current user. It fetches the patients associated with the current user and renders them as JSON in the response.

# 2. `create`: This action handles a POST request to '/patients', which is used to create a new patient for the current user. It creates a new patient record in the database using the `patient_params` (strong parameters) extracted from the request payload. If the patient is successfully saved to the database, it is rendered as JSON in the response with a status of 200 (OK). If there are validation errors, the controller returns a JSON object containing the error messages with a status of 422 (unprocessable entity).

# 3. `show`: This action handles a GET request to '/patients/:id', where `:id` is the ID of the patient to retrieve. It finds the patient with the given ID and checks if it belongs to the current user. If the patient is found and belongs to the user, it is rendered as JSON in the response with a status of 200 (OK). If the patient is not found or does not belong to the user, the controller returns a JSON object with an error message and a status of 401 (unauthorized).

# 4. `update`: This action handles a PATCH request to '/patients/:id', where `:id` is the ID of the patient to update. It finds the patient with the given ID and checks if it belongs to the current user. If the patient is found and belongs to the user, it updates the patient record with the new information from the request payload. The updated patient is then rendered as JSON in the response with a status of 202 (accepted).

# 5. `destroy`: This action handles a DELETE request to '/patients/:id', where `:id` is the ID of the patient to delete. It finds the patient with the given ID and checks if it belongs to the current user. If the patient is found and belongs to the user, it is deleted from the database, and the response has a status of 204 (no content) to indicate successful deletion. If the patient is not found or does not belong to the user, the controller returns a JSON object with an error message and a status of 404 (not found).

# The `private` section contains the `patient_params` method, which is a strong parameter method used to ensure that only specific parameters related to patients are allowed to be passed into the controller actions. It helps prevent mass assignment vulnerabilities.

  # before_action :find_patient, only: [:show, :update, :destroy]
  # before_action :is_owner?, only: [:update, :destroy]

  # def find_patient
  #   @patient = Patient.find(params[:id])
  # end 

  # def is_owner?
  #   permitted = @patient.user_id == current_user.id 
  #   render json: {errors: {User: "does not own this"}}, status: :forbidden unless permitted 
  # end 


# For patients#show: 
  # When searching for a specific patient, we want to look through the current_user's patients only. Why would we look through the Patient model? params[:id] is in the URL, user_id is in the session hash.
  # Look through this user's patients and find the one that has that ID. 
  # find_by returns nil 
  # status is unauthorized because if it's not in mine and somehow i was trying to get it, i wasnt authorized to see it..it's someone else's. If you had done Patient.find_by()...you might have found it. However, we only want to look inside the current user's patients b/c that's all they have access to!

    # def show
    #   patient = current_user.patients.find_by_id(params[:id])
    #   if patient 
    #     render json: patient 
    #   else 
    #     render json: { error: "Not Found" }, status: :unauthorized
    #   end 
    # end 


# For patients#create:
  # def create 
  #   patient = current_user.patients.create(patient_params)

  #   if patient.valid?
  #     render json: patient 
  #   else  
  #     render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
  #   end 
  # end 

# To optimize your controllers and minimize hitting the database multiple times, you can make use of eager loading and ActiveRecord query optimizations. Here's an example of how you can optimize your PatientsController:

# # line 16: In the provided code, the return statement is used after rendering an unauthorized response when the @current_user is nil.

# In the index and show actions, we use includes(:appointments) to eager load the associated appointments for each patient. This avoids the N+1 query problem when fetching patients and their appointments separately.

# Additionally, in the find_patient method, we use includes(:appointments).find_by_id(params[:id]) to fetch the patient with associated appointments in a single query.

# These optimizations help minimize the number of database queries and improve the performance of your controllers. Remember to adjust the associations and includes according to your actual model relationships.

# It first checks if @current_user is nil to determine if the user is authenticated. If the user is not authenticated, it renders a JSON response with an error message of "User not authenticated" and a status of :unauthorized (401).
# After rendering the unauthorized response, the return statement is used to exit the create action early. This prevents the execution of the rest of the code in the create action if the user is not authenticated.
# If the user is authenticated, the code proceeds to create a new patient object belonging to the current user (@current_user.patients.build(patient_params)).
# If the patient is successfully saved, it renders a JSON response with the newly created patient object and a status of :created (201).
# If there are validation errors and the patient cannot be saved, it renders a JSON response with the errors in the patient.errors.full_messages array and a status of :unprocessable_entity (422).
# The return statement is used here to control the flow of execution and prevent further processing if the user is not authenticated.

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

# `.build` and `.save` versus `.create` and `.valid?` are different methods used to create and save records in ActiveRecord.

# ------------------------------------
# VALIDATIONS: 
# 1. `.build` and `.save`:
#    - `.build`: The `.build` method is used to instantiate a new object in memory (a new record) without persisting it to the database. It sets up the object with the given attributes but doesn't save it yet. For example: `patient = current_user.patients.build(patient_params)`.
#    - `.save`: The `.save` method is used to save a new or existing object to the database. It attempts to save the record, and if the validations pass, the record will be saved successfully. For example: `patient.save`.

#    Example:
#    ```
#    patient = current_user.patients.build(patient_params)
#    if patient.save
#      # Record saved successfully
#    else
#      # Validation failed, handle the errors
#    end
#    ```

# 2. `.create` and `.valid?`:
#    - `.create`: The `.create` method creates a new record in the database and saves it immediately without the need for a separate `.save` call. It initializes the object and then saves it to the database in one step. For example: `patient = current_user.patients.create(patient_params)`.
#    - `.valid?`: The `.valid?` method is used to check if the object's attributes are valid according to the model's validation rules. It returns `true` if the record passes all validations and `false` if any validation fails. However, it does not save the record to the database.

#    Example:
#    ```
#    patient = current_user.patients.create(patient_params)
#    if patient.valid?
#      # Record is valid, it was saved successfully
#    else
#      # Validation failed, handle the errors
#    end
#    ```

# When to use `.build` and `.save`:
# - Use `.build` and `.save` when you want more control over the record creation process. This is useful when you need to perform additional operations on the record before saving it to the database or when you want to handle potential validation errors manually.

# When to use `.create` and `.valid?`:
# - Use `.create` and `.valid?` when you want a more concise way to create and save records without explicitly calling `.save`. This is convenient when you don't need to perform additional operations before saving the record and want a one-liner to create and save it. Additionally, using `.valid?` allows you to check if the record is valid before saving it to the database.
