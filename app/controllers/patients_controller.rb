class PatientsController < ApplicationController
  before_action :authorize_user
  before_action :find_patient, only: [:show, :update, :destroy]
  before_action :is_authorized?, only: [:create]
  
  def index #get '/patients'
    render json: Patient.all, status: :ok 
    # render json: Patient.all.to_json(include: :appointment)
  end

  def create #post '/patients'
    patient = Patient.create!(patient_params) # creating an instance of Patient Class 
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
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :language_preferences, :viewed_notice_of_privacy_practices, :created_at)
  end 

  def find_patient
    @patient = Patient.find(params[:id])
  end 

  def is_authorized? 
    permitted = @current_user.admin?
    render json: { errors: {User: "does not have admin permissions."}}, status: :forbidden unless permitted 
  end 
end 


# see everyones patients, and in my own profile see only my patients 
# methods that invoke our validations: `save`, `create`, `valid?`
# `create` is two in one => new and save 

# `.find` raises an exception rescued by ActiveRecord::RecordNotFound

# extracted repetitive code where we find the patient by id, and made an instance variable bc instance variables are accessible to us in that instance of that controller. Before these actions (`before_action`), let's go ahead and run the `find_patient`, and create that instance variable. This will only happen for show, update, and destroy because we're going to have that id in the params.

  # Then, we can create a new method called `is_owner?`
  # def is_owner? 
  #   permitted = @patient.user_id == current_user.id 
  #   render json: {errors: {User: "does not own this"}}, status: :forbidden 
  # end 