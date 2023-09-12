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