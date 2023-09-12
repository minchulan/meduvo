class PatientsController < ApplicationController
  before_action :authorize_user
  before_action :find_patient, only: [:show, :update, :destroy]
  before_action :is_authorized?, only: [:create]
  
  def index #get '/patients'
    render json: Patient.all, status: :ok 
    # render json: Patient.all.to_json(include: :appointment)
  end

  def create #post '/patients'
    patient = Patient.create!(patient_params) 
    render json: patient, status: :created 
  end

  def show #get '/patients/:id'
    render json: @patient, serializer: PatientSerializer, status: :ok 
  end

  def update #patch '/patients/:id'
    @patient.update!(patient_params)
    render json: @patient, status: :accepted 
  end

  def destroy #delete '/patients/:id'
    @patient.destroy 
    head :no_content
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :viewed_notice_of_privacy_practices, :created_at)
  end 

  def find_patient
    @patient = Patient.find(params[:id])
  end 

  def is_authorized? 
    permitted = @current_user.admin?
    render json: { errors: {User: "does not have admin permissions."}}, status: :forbidden unless permitted 
  end 
end 

# ~ patients#show ~
# `find_patient` method retrieves the patient based on the `params[:id]`. If the patient is not found, it does not handle the error directly because it raises an `ActiveRecord::RecordNotFound` exception. 

# if `current_user` is authorized in ApplicationController, and `find_patient` method successfully retrieves patient, the `show` action will render patient info as JSON. 

# ActiveRecord::RecordNotFound -> if patient or user with specific ID is not found, `render_not_found` method in ApplicationController will handle it and return a JSON response with a "not found" status. 

# `before_action` filter called `authorize_user` inherited from ApplicationController ensures user is logged in before any action is executed. If user is not logged in (i.e., `current_user` is `nil`), it will return "Not Authorized" response with a status of `:unauthorized`. 